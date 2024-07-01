"use strict";

const pool = require("../DBconnection");
const externalSource = require("../model/externalSource");
const UserModel = require("../model/users");
const OAuthClient = require("intuit-oauth");
const axios = require("axios");
const realmIdStorage = {};
const Plans = require('../model/Plans')
const ScenerioPlanData = require('../model/ScenerioPlanData')
const PlanKpi = require('../model/PlanKpi')
const Kpis = require('../model/Kpis')
const QuickBooks = require('node-quickbooks');
const BalancedScoreCard = require("../model/BalancedScoreCard");
const ScoreCardKpi = require("../model/ScoreCardKpi")
const Company = require('../model/Company')
const excelModel= require('../model/excelData')
require('dotenv').config();
const catchAsyncFunction = require("../middlewares/catchAsyncFun");

var oauthClient;

function myFunction(values) {
  oauthClient = new OAuthClient({
    clientId: values[0],
    clientSecret: values[1],
    environment: values[2],
    redirectUri: `${process.env.apiUrl}/quickbook/callback`,
  });
}

exports.addExternalSource = catchAsyncFunction(async (req, res) => {
  if (
    !(
      req.body.user_id &&
      req.body.company_id
    )
  ) {
    return res
      .status(401)
      .json({ success: false, error: "please fill all the credentials" });
  } else {

    realmIdStorage.user_id = req.body.user_id;
    realmIdStorage.company_id = req.body.company_id;

    var values = [process.env.clientId, process.env.clientSecret, process.env.environment];
    myFunction(values);
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
      state: "testState",
    });
    res.json(authUri);
    console.log(authUri);
  }

});

exports.callback = catchAsyncFunction(async (req, res) => {
  const parseRedirect = req.url;

  try {
    const authResponse = await oauthClient.createToken(parseRedirect);
    if (!oauthClient.isAccessTokenValid()) {
      throw new Error("Access token is invalid.");
    }

    const { access_token: token, refresh_token: refreshToken } = authResponse.getJson(); // Extract token and refresh token
    const realmId = req.query.realmId;
    realmIdStorage.realmId = realmId;
    const companyId = realmIdStorage.company_id;

    let existingCompany = await Company.findOne({ _id: companyId });

    if (!existingCompany) {
      return res.status(404).json({ error: "Company not found." });
    }

    if (existingCompany.account_id === realmId) {
      return res.redirect(`${process.env.frontendUrl}/thankyou/${token}?refresh_token=${refreshToken}`);
    }

    // Check if the realmId is already associated with another company
    let companyWithRealmId = await Company.findOne({ account_id: realmId });
    if (companyWithRealmId) {
      return res.status(400).json({ error: "Realm ID is already associated with another company." });
    }

    // Update start and end date here
    const { startMonth, endMonth } = await fetchAndUpdateFiscalYear(token, realmId);
   
    await Company.findByIdAndUpdate(companyId, {
      financialYearstart: startMonth,
      financialYearend: endMonth,
      account_id: realmId
    });

    // Send token and refresh token in the response
    return res.redirect(`${process.env.frontendUrl}/thankyou/${token}?refresh_token=${refreshToken}`);

  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "An error occurred during authentication." });
  }
});




async function fetchAndUpdateFiscalYear(token, realmId) {
  const endpoint = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query?query=select * from CompanyInfo&minorversion=70`;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  };

  try {
    const response = await axios.get(endpoint, axiosConfig);
    const companyInfo = response.data.QueryResponse.CompanyInfo[0];

    if (!companyInfo || !companyInfo.FiscalYearStartMonth) {
      console.error('Invalid or missing fiscal year data in response:', response.data);
      throw new Error('Invalid response structure');
    }

    const Month = companyInfo.FiscalYearStartMonth; // Assuming companyInfo.FiscalYearStartMonth is a string like "January"
    const startDate = new Date(`${Month} 1`); // Using template literals for string interpolation
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 11);

    const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
    const endMonth = endDate.toLocaleString('en-US', { month: 'long' });

    return { startMonth, endMonth };
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data && error.response.data.Fault) {
      const validationErrors = error.response.data.Fault.Error;
      console.error('Validation errors:');
      validationErrors.forEach(error => {
        console.error(`- ${error.Message}`);
      });
      if (validationErrors.some(error => error.Message === 'Unsupported Operation')) {
        console.error('The operation you are trying to perform is not supported by the API.');
        // Handle this specific error scenario accordingly
      }
    } else {
      console.error('Error:', error.message);
    }
    throw new Error('API call to fetch fiscal data failed');
  }
}

exports.getQuickbookData = catchAsyncFunction(async (req, res) => {

  try {

    const companyId = req.body.company_id;
    const token = req.body.token;
    const plan_id = req.body.plan_id;

    let existingCompany = await Company.findOne({ _id: companyId });

    if (!existingCompany) {
      return res.status(404).json({ error: "Company not found." });
    }
    else {
      let existingPlan = await Plans.findOne({ 'company_id': companyId });
      if (existingPlan) {
        setCookiesAndSendResponse(res, token, existingCompany.account_id, plan_id);
      }
      else {
        return res.status(400).json({ error: "plan is not associated with another company." });

      }
    }

  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "An error occurred during authentication." });
  }
});
exports.getKPIValuesAndPlans = catchAsyncFunction(async (req, res) => {

  try {
    const { token, scoreCardId } = req.body;
    const scoreCardKpis = await ScoreCardKpi.find({ 'scoreCardId': scoreCardId });
    const kpiTitles = [];
scoreCardKpis.forEach(element => {
        kpiTitles.push(element.kpi_title );

});



    // Fetch all plans associated with the user
    const BalancedScoreCardDetails = await BalancedScoreCard.findById(scoreCardId);
    const start = BalancedScoreCardDetails.startDate.toISOString().substring(0, 10);
    const end = BalancedScoreCardDetails.endDate.toISOString().substring(0, 10);
    let existingCompany = await Company.findOne({ _id: BalancedScoreCardDetails.company_id });
    const realmId = existingCompany.account_id;

    const kpiValues = [];
    // Check if there is existing data with type "actual" before deleting

    for (const kpiTitle of kpiTitles) {
      let value;


      if (kpiTitle === "Total Revenue") {


        const totalRevenue = await getTotalRevenueForQuarter(token, realmId, start, end);
        value = totalRevenue.toFixed(2);


      }

      if (kpiTitle === "Net Profit Ratio") {


        const netProfit = await getNetProfitForQuarter(token, realmId, start, end);
        const totalRevenue = await getTotalRevenueForQuarter(token, realmId, start, end);
        const netProfitRatio = (netProfit / totalRevenue) * 100;
        value = netProfitRatio.toFixed(2);

      }
      if (kpiTitle === "Gross Profit Ratio") {

        const grossProfit = await getGrossProfitForQuarter(token, realmId, start, end);
        const totalRevenue = await getTotalRevenueForQuarter(token, realmId, start, end);
        const grossProfitRatio = (grossProfit / totalRevenue) * 100;
        value = grossProfitRatio.toFixed(2);

      }

      if (kpiTitle === "Current Ratio") {

        const currentRatio = await getCurrentForQuarter(token, realmId, start, end);
        value = currentRatio.toFixed(2);

      }

      if (kpiTitle === "Days Sales Outstanding") {


        const totalReceivables = await getDSOForQuarter(token, realmId, start, end);
        const totalSales = await calculateTotalSales(token, realmId, start, end);
        const averageDSO = (totalReceivables / totalSales) * 365;
        value = averageDSO.toFixed(2);

      }

      if (kpiTitle === "Days Payable Outstanding") {


        const totalPayables = await getDPOForQuarter(token, realmId, start, end);

        const totalPurchases = await calculateTotalSales(token, realmId, start, end);

        const averageDPO = (totalPayables / totalPurchases) * 365;
        value = averageDPO.toFixed(2);

      }

      if (kpiTitle === "Inventory Turnover Ratio") {

        const ITR = await getITRForQuarter(token, realmId, start, end);
        value = ITR.toFixed(2);

      }

      if (kpiTitle === "Debt to Equity Ratio") {


        const DER = await getDERForQuarter(token, realmId, start, end);
        value = DER.toFixed(2);

      }

      if (kpiTitle === "Level of Return") {

        const LOR = await getLORForQuarter(token, realmId, start, end);
        value = LOR.toFixed(2);

      }


      if (kpiTitle === "Customer Retention") {


        const CR = await getCRForQuarter(token, realmId, start, end);
        value = CR.toFixed(2);

      }

      if (kpiTitle === "Customer Satisfaction") {

        const CS = await getCSForQuarter(token, realmId, start, end);
        value = CS.toFixed(2);

      }
      if (kpiTitle === "Employee Turnover Rate") {


        const ETR = await getETRForQuarter(token, realmId, start, end);
        value = ETR.toFixed(2);

      }
      if (kpiTitle === "Employee Satisfaction") {


        const ES = await getESForQuarter(token, realmId, start, end);
        value = ES.toFixed(2);

      }
      if (kpiTitle === "Revenue per Employee") {

        const RP = await getRPForQuarter(token, realmId, start, end);
        value = RP.toFixed(2);

      }

      if (kpiTitle === "Scrap Rate") {


        const SR = await getSRForQuarter(token, realmId, start, end);
        value = SR.toFixed(2);

      }

      if (kpiTitle === "Machine Downtime") {


        const MD = await getMDForQuarter(token, realmId, start, end);
        value = MD.toFixed(2);

      }

      kpiValues.push({ title: kpiTitle, value });
    }


    const array1=kpiValues;
   // Extract unique titles from array1
const titles = array1.map(item => item.title);

// Fetch data from Kpis collection for matching titles only
const kpis = await Kpis.aggregate([
    {
        $match: {
            title: { $in: titles } // Match documents with titles present in array1
        }
    },
    {
        $group: {
            _id: "$Kpi_type", // Group by the Kpi_type field
            kpis: { $push: "$$ROOT" } // Push the entire document into an array
        }
    }
]);

// Rename _id to type for better readability in the output
const formattedKpis = kpis.map(({ _id, kpis }) => ({ type: _id, kpis }));

// Now you can proceed with updating values similar to your existing code...
const array2 = formattedKpis;
// Fetch data from Kpis collection
console.log("array2:", array2); // Log the value of array2

// Check if array2 is defined before using it
if (Array.isArray(array2)) {
    // Iterate through array2
    array2.forEach(category => {
        // Check if category is defined before accessing its properties
        if (category && category.kpis && Array.isArray(category.kpis)) {
            // Iterate through KPIs in each category
            category.kpis.forEach(kpi => {
                // Find corresponding KPI in array1
                const matchingKPI = array1.find(item => item.title === kpi.title);

                // If a matching KPI is found, update the value in array2
                if (matchingKPI) {
                    kpi.value = matchingKPI.value;
                }
            });
        }
    });
} else {
    console.log("Error: array2 is undefined or not an array");
}

// Now array2 contains the updated values from array1
console.log(array2);

res.status(200).json({
    success: true,
    data: array2,
    message: "KPIs fetched successfully!"
});

    // return kpiValues;

    console.log('get actual data for all plans.');
  } catch (error) {
    console.error("Error getting actual data for plans:", error);
    throw error;
  }


});

exports.getDashboardValues = catchAsyncFunction(async (req, res) => {
  // Check if required parameters are present in the request
  if (!req.body.token || !req.body.company_id) {
    return res.status(400).json({
      success: false,
      error: 'Missing token or company_id in the request body'
    });
  }

  const { token, company_id } = req.body;

  try {
    // Fetch company account ID
    let existingCompany = await Company.findOne({ _id: company_id });
    const companyId = existingCompany.account_id;
    const checkData = await excelModel.find({ company_id: req.body.company_id });

    // Construct URL for QuickBooks API request
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyId}/query?query=select * from Account&minorversion=70`;

    // Fetch data from QuickBooks API
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Check the status code of the response
    if (response.status === 200) {
      // Extract relevant data from API response
      const responseData = response.data.QueryResponse.Account;
      const output = responseData.map(item => ({ title: item.Name, value: item.CurrentBalance }));

      // Send response with fetched data
      return res.status(200).json({
        success: true,
        data: {
         quickbook: output,
          exel:checkData
        }
      });
    }
  }  catch (error) {
    // Handle errors
    if (error.response && error.response.status === 401) {
      // If the response status is 401, token is not valid
      return res.status(401).json({
        success: false,
        error: 'Token is not valid'
      });
    } else {
      // Handle other errors or undefined status code
      return res.status(500).json({
        success: false,
        error: 'Unexpected error occurred'
      });
    }
  }
  
});


async function setCookiesAndSendResponse(res, token, realmId, plan_id) {
  try {
    const kpiValues = await getKPIValuesAndUpdateAllPlans(token, realmId, plan_id);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("realmId", realmId, { httpOnly: true, secure: true });
    res.json({
      success: true,
      account_id: realmId,
      kpiValues
    });
  } catch (error) {
    // Handle any errors that occur during cookie setting or response sending
    console.error("Error setting cookies and sending response:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getKPIValuesAndUpdateAllPlans(token, realmId, plan_id) {
  try {

    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    const kpiTitles = [
      "Total Revenue",
      "Net Profit Ratio",
      "Gross Profit Ratio",
      "Current Ratio",
      "Days Sales Outstanding",
      "Days Payable Outstanding",
      "Inventory Turnover Ratio",
      "Debt to Equity Ratio",
      "Level of Return",
      "Customer Retention",
      "Customer Satisfaction",
      "Employee Turnover Rate",
      "Employee Satisfaction",
      "Revenue per Employee",
      "Scrap Rate",
      "Machine Downtime",
    ];

    // Fetch all plans associated with the user
    const userPlan = await Plans.findById(plan_id);
    const userPlanId = userPlan.id;
      const startDate = userPlan.startDate; // Moved outside the loop
      const endDate = userPlan.endDate;     // Moved outside the loop

      const kpiValues = [];
      // Check if there is existing data with type "actual" before deleting
      const existingData = await ScenerioPlanData.find({ plan_id: userPlanId, type: 'actual' });

      if (existingData.length > 0) {
        // Remove existing data with type "actual"
        await ScenerioPlanData.deleteMany({ plan_id: userPlanId, type: 'actual' });
        console.log(`Deleted ${existingData.length} existing data with type "actual" for plan_id: ${userPlanId}`);
      }

      for (const kpiTitle of kpiTitles) {
        // Find the corresponding kpi_id for the given kpiTitle from the Kpis model
        const kpiRecord = await PlanKpi.findOne({ kpi_title: kpiTitle });
        console.log("kpiRecord " + JSON.stringify(kpiRecord));

        if (!kpiRecord) {
          console.error(`No matching KPI found for title: ${kpiTitle}`);
          continue;
        }
        const values = {
          plan_id: userPlanId,
          kpi_id: kpiRecord.kpi_id,
          kpi_title: kpiTitle,
          kpi_type: kpiRecord.kpi_type,
          type: 'actual',
        };


        if (kpiTitle === "Total Revenue") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const totalRevenue = await getTotalRevenueForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = totalRevenue.toFixed(2);
          }
        }
        if (kpiTitle === "Net Profit Ratio") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const netProfit = await getNetProfitForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            const totalRevenue = await getTotalRevenueForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            console.log(netProfit);
            const netProfitRatio = (netProfit / totalRevenue) * 100;
            values[quarter.toLowerCase()] = netProfitRatio.toFixed(2);
          }
        }
        if (kpiTitle === "Gross Profit Ratio") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const grossProfit = await getGrossProfitForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            const totalRevenue = await getTotalRevenueForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            const grossProfitRatio = (grossProfit / totalRevenue) * 100;
            values[quarter.toLowerCase()] = grossProfitRatio.toFixed(2);
          }
        }
        if (kpiTitle === "Current Ratio") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const currentRatio = await getCurrentForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = currentRatio.toFixed(2);
          }
        }
        if (kpiTitle === "Days Sales Outstanding") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const totalReceivables = await getDSOForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            const totalSales = await calculateTotalSales(token, realmId, quarterStartDate, quarterEndDate);
            const averageDSO = (totalReceivables / totalSales) * 365;
            values[quarter.toLowerCase()] = averageDSO.toFixed(2);
          }
        }
        if (kpiTitle === "Days Payable Outstanding") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const totalPayables = await getDPOForQuarter(token, realmId, quarterStartDate, quarterEndDate);

            const totalPurchases = await calculateTotalSales(token, realmId, quarterStartDate, quarterEndDate);

            const averageDPO = (totalPayables / totalPurchases) * 365;
            values[quarter.toLowerCase()] = averageDPO.toFixed(2);
          }
        }
        if (kpiTitle === "Inventory Turnover Ratio") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const ITR = await getITRForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = ITR.toFixed(2);
          }
        }
        if (kpiTitle === "Debt to Equity Ratio") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const DER = await getDERForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = DER.toFixed(2);
          }
        }
        if (kpiTitle === "Level of Return") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const LOR = await getLORForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = LOR.toFixed(2);
          }
        }
        if (kpiTitle === "Customer Retention") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const CR = await getCRForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = CR.toFixed(2);
          }
        }
        if (kpiTitle === "Customer Satisfaction") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const CS = await getCSForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = CS.toFixed(2);
          }
        }
        if (kpiTitle === "Employee Turnover Rate") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const ETR = await getETRForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = ETR.toFixed(2);
          }
        }
        if (kpiTitle === "Employee Satisfaction") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const ES = await getESForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = ES.toFixed(2);
          }
        }
        if (kpiTitle === "Revenue per Employee") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const RP = await getRPForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = RP.toFixed(2);
          }
        }
        if (kpiTitle === "Scrap Rate") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const SR = await getSRForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = SR.toFixed(2);
          }
        }
        if (kpiTitle === "Machine Downtime") {
          for (const quarter of quarters) {
            const quarterStartDate = getStartDateForQuarter(quarter, startDate, endDate);
            const quarterEndDate = getEndDateForQuarter(quarter, startDate, endDate);
            const MD = await getMDForQuarter(token, realmId, quarterStartDate, quarterEndDate);
            values[quarter.toLowerCase()] = MD.toFixed(2);
          }
        }

        kpiValues.push(values);
        console.log(`kpiValues: ${JSON.stringify(kpiValues)}`);

        const existingData1 = await ScenerioPlanData.find({ plan_id: userPlanId, kpi_id: kpiRecord.kpi_id });
        console.log("existingData1 " + existingData1);
        console.log("values " + JSON.stringify(values));
        if (existingData1.length > 0) {
          // Save the calculated values to the ScenerioPlanData model
          const scenerioPlanDataInstance = new ScenerioPlanData(values);
          scenerioPlanDataInstance.save()
            .then(savedInstance => {
              console.log('Instance saved successfully:', savedInstance);
            })
            .catch(error => {
              console.error('Error saving instance:', error);
            });
        }


      }
      console.log(`Added actual data for plan_id: ${userPlanId}`);
    
    // return kpiValues;

    console.log('Updated actual data for all plans.');
  } catch (error) {
    console.error("Error updating actual data for plans:", error);
    throw error;
  }
}


async function validateQuickBooksToken(token) {
  try {
    const response = await axios.post('https://quickbooks.api.intuit.com/v3/company', null, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return { isValid: response.status === 200 };
  } catch (error) {
    console.error('Error validating token:', error.response.data);
    return { isValid: false, error: error.response.data };
  }
}


async function getTotalRevenueForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/ItemSales?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const totalRevenue = calculateTotalRevenue(response);
    return totalRevenue;
  } catch (error) {
    console.error("Error fetching Total Revenue:", error);
    return 0;
  }
}

async function getNetProfitForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/ProfitAndLoss?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const netProfit = calculateNetProfit(response);
    return netProfit;
  } catch (error) {
    console.error("Error fetching Net Profit:", error);
    return 0;
  }
}

async function getGrossProfitForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/ProfitAndLoss?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const grossProfit = calculateGrossProfit(response);
    return grossProfit;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getCurrentForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/BalanceSheet?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const grossProfit = calculateCurrentRatio(response);
    return grossProfit;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getDSOForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/AgedReceivableDetail?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const grossProfit = calculateDSO(response);
    return grossProfit;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function calculateTotalSales(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/ProfitAndLoss?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const totalSales = calculateTotalSalesdata(response);
    return totalSales;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getDPOForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/AgedPayables?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const totalSales = calculateDPO(response);
    return totalSales;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getITRForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const totalSales = calculateITR(response);
    return totalSales;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getDERForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/BalanceSheet?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const totalSales = calculateDER(response);
    return totalSales;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}


async function getLORForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/LevelOfReturn?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const totalSales = calculateLOR(response);
    return totalSales;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getCRForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const CR = calculateCR(response);
    return CR;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getCSForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const CS = calculateCS(response);
    return CS;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getETRForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const ETR = calculateETR(response);
    return ETR;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getESForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const ES = calculateES(response);
    return ES;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getRPForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const RP = calculateRP(response);
    return RP;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getSRForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const SR = calculateSR(response);
    return SR;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}

async function getMDForQuarter(token, realmId, startDate, endDate) {
  try {
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/InventoryValuationSummary?minorversion=40&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const MD = calculateMD(response);
    return MD;
  } catch (error) {
    console.error("Error fetching Gross Profit:", error);
    return 0;
  }
}



function calculateTotalRevenue(response) {
  try {
    const itemSales = response.data;
    let totalRevenue = 0;
    const rows = itemSales.Rows.Row;
    // Check if Rows array and Row at index 0 exist
    if (rows && itemSales.Rows.Row[0]) {
      rows.forEach((row) => {
        const colData = row.ColData;
        if (colData && colData[0]?.value === "TOTAL" && colData[2]?.value !== undefined) {
          totalRevenue += parseFloat(colData[2].value);
        }
      });
    }
    if (isNaN(totalRevenue)) {
      return 0; // Return 0 if totalRevenue is NaN
    }
    return totalRevenue;
  } catch (error) {
    console.error("Error calculating Total Revenue:", error);
    return 0;
  }
}

function calculateNetProfit(response) {
  try {
    const profitAndLossData = response.data;
    let netProfit = 0;

    // Check if Rows array and Row at index 7 exist
    if (
      profitAndLossData.Rows &&
      profitAndLossData.Rows.Row &&
      profitAndLossData.Rows.Row[7]
    ) {
      const summary = profitAndLossData.Rows.Row[7].Summary;

      // Check if Summary and ColData array at index 1 exist
      if (
        summary &&
        summary.ColData &&
        summary.ColData[1] &&
        summary.ColData[1].value !== undefined
      ) {
        netProfit = parseFloat(summary.ColData[1].value || 0);
      }
    }

    if (isNaN(netProfit)) {
      return 0; // Return 0 if totalRevenue is NaN
    }

    return netProfit;
  } catch (error) {
    console.error("Error calculating Net Profit:", error);
    return 0;
  }
}

function calculateGrossProfit(response) {
  try {
    const profitAndLossData = response.data;

    // Check if Rows array and Row at index 2 exist
    if (
      profitAndLossData.Rows &&
      profitAndLossData.Rows.Row &&
      profitAndLossData.Rows.Row[2] &&
      profitAndLossData.Rows.Row[2].Summary &&
      profitAndLossData.Rows.Row[2].Summary.ColData[1] &&
      profitAndLossData.Rows.Row[2].Summary.ColData[1].value
    ) {
      const grossProfit = parseFloat(
        profitAndLossData.Rows.Row[2].Summary.ColData[1].value || 0
      );

      if (isNaN(grossProfit)) {
        return 0; // Return 0 if totalRevenue is NaN
      }
      return grossProfit;
    }

    return 0; // Return 0 if any expected property is missing
  } catch (error) {
    console.error("Error calculating Gross Profit:", error);
    return 0;
  }
}


function calculateCurrentRatio(response) {
  try {
    const profitAndLossData = response.data;

    // Check if Rows array and Row at index 0 and 1 exist
    if (
      profitAndLossData.Rows &&
      profitAndLossData.Rows.Row &&
      profitAndLossData.Rows.Row[0] &&
      profitAndLossData.Rows.Row[1]
    ) {
      const netIncome = parseFloat(
        profitAndLossData.Rows.Row[0].Summary.ColData[1].value || 0
      );
      const currentLiabilities = parseFloat(
        profitAndLossData.Rows.Row[1].Summary.ColData[1].value || 0
      );

      if (!isNaN(netIncome) && !isNaN(currentLiabilities)) {
        const currentRatio = netIncome / currentLiabilities;
        return currentRatio;
      }
    }

    return 0; // Return 0 if any expected property is missing or if netIncome or currentLiabilities is NaN
  } catch (error) {
    console.error("Error calculating Current Ratio:", error);
    return 0;
  }
}


function calculateDSO(response) {
  try {
    const agedReceivables = response.data;
    let totalReceivables = 0;
    let totalSales = 0;

    // Check if Rows array and Row at index 0 exist
    if (
      agedReceivables.Rows &&
      agedReceivables.Rows.Row &&
      agedReceivables.Rows.Row[0]
    ) {
      const rows = agedReceivables.Rows.Row;

      rows.forEach(section => {
        if (section.Summary && section.Summary.ColData && section.Summary.ColData[5] && section.Summary.ColData[5].value) {
          totalReceivables = parseFloat(section.Summary.ColData[5].value);
        }
      });
    }

    // Calculate DSO
    const averageDSO = totalReceivables;

    return averageDSO;
  } catch (error) {
    console.error("Error calculating DSO:", error);
    return 0;
  }
}


function calculateTotalSalesdata(response) {
  let total_sales = 0;

  const salesData = response.data;

  // Check if Rows array and Row at index 0 exist
  if (salesData.Rows && salesData.Rows.Row && salesData.Rows.Row[0]) {
    const rows = salesData.Rows.Row;

    rows.forEach((row) => {
      // Check if ColData array at index 2 and value property exist
      if (
        row.Summary &&
        row.Summary.ColData[1] &&
        row.Summary.ColData[1].value !== undefined
      ) {
        const value = row.Summary.ColData[1].value || 0;
        total_sales += parseFloat(value);
      }
    });
  }

  return total_sales;
}

function calculateITR(response) {
  try {
    // Implement logic to calculate inventory turnover rate based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const inventoryData = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const inventoryTurnoverRate = 0;
    return inventoryTurnoverRate;
  } catch (error) {
    console.error("Error calculating Inventory Turnover Rate:", error);
    return 0;
  }
}

function calculateDER(response) {
  try {
    const balanceSheetData = response.data;

    // Extract the total debt from the Balance Sheet data
    const totalDebt =
      parseFloat(balanceSheetData.Rows.Row[1].Summary.ColData[1].value) || 0;

    const shareholdersEquity =
      parseFloat(
        balanceSheetData.Rows.Row[1].Rows.Row[1].Summary.ColData[1].value
      ) || 0;

    if (shareholdersEquity === 0) {
      // Avoid division by zero
      console.error(
        "Shareholders' equity is zero. Unable to calculate Debt to Equity Ratio."
      );
      return 0;
    }

    const debtToEquityRatio = totalDebt / shareholdersEquity;
    return debtToEquityRatio;
  } catch (error) {
    console.error("Error calculating Debt to Equity Ratio:", error);
    return 0;
  }
}

function calculateDPO(response) {
  try {
    const agedPayables = response.data;
    let totalPayables = 0;
    let totalPurchases = 0;

    // Check if Rows array and Row at index 0 exist
    if (
      agedPayables.Rows &&
      agedPayables.Rows.Row &&
      agedPayables.Rows.Row[0]
    ) {
      const rows = agedPayables.Rows.Row;

      rows.forEach((row) => {
        // Check if ColData array at index 3 and value property exist
        if (
          row.ColData &&
          row.ColData[3] &&
          row.ColData[3].value !== undefined
        ) {
          const payableAmount = parseFloat(row.ColData[3].value || 0);
          totalPayables += payableAmount;
        }
      });
    }

    // Additional logic to fetch total purchases from QuickBooks API
    // Replace the URL with the appropriate QuickBooks API endpoint for fetching purchases
    // const purchasesUrl = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmIdStorage.realmId}/reports/Purchases?minorversion=40`;
    // const purchasesResponse = await axios.get(purchasesUrl, {
    //   headers: {
    //     Accept: "Application/json",
    //     Authorization: `Bearer ${realmIdStorage.token}`,
    //   },
    // });

    // // Calculate total purchases
    // totalPurchases = calculateTotalSales(purchasesResponse);

    // Calculate DPO
    // const averageDPO = (totalPayables / totalPurchases) * 365;

    return totalPayables;
  } catch (error) {
    console.error("Error calculating DPO:", error);
    return 0;
  }
}

function calculateLOR(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const customerSatisfaction = 0;
    return customerSatisfaction;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}


function calculateCR(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const customerRetention = 0;
    return customerRetention;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}

function calculateCS(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const customerSatisfaction = 0;
    return customerSatisfaction;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}


function calculateETR(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const ETR = 0;
    return ETR;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}

function calculateES(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const ES = 0;
    return ES;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}

function calculateRP(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const RP = 0;
    return RP;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}

function calculateSR(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const SR = 0;
    return SR;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}

function calculateMD(response) {
  try {
    // Implement logic to calculate customer satisfaction based on the QuickBooks API response
    // You may need to fetch relevant data from the API and perform necessary calculations
    const LOR = response.data; // Replace this with the actual data from QuickBooks
    // ... Your logic here ...
    const MD = 0;
    return MD;
  } catch (error) {
    console.error("Error calculating Customer Satisfaction:", error);
    return 0;
  }
}

function getStartDateForQuarter(quarter, startDate, endDate) {
  const startQuarter = Math.floor((startDate.getMonth() / 3));
  const endQuarter = Math.floor((endDate.getMonth() / 3));
  const currentQuarter = Math.floor((new Date().getMonth() / 3));

  let quarterStartDate;

  switch (quarter) {
    case "Q1":
      quarterStartDate = startQuarter === 0 ? startDate : new Date(startDate.getFullYear(), 0, 1);
      break;
    case "Q2":
      quarterStartDate = startQuarter <= 1 ? new Date(startDate.getFullYear(), 3, 1) : startDate;
      break;
    case "Q3":
      quarterStartDate = startQuarter <= 2 ? new Date(startDate.getFullYear(), 6, 1) : startDate;
      break;
    case "Q4":
      quarterStartDate = startQuarter <= 3 ? new Date(startDate.getFullYear(), 9, 1) : startDate;
      break;
    default:
      quarterStartDate = startDate;
      break;
  }

  // Ensure quarter start date is within the provided range
  return quarterStartDate < startDate ? startDate.toISOString().split('T')[0] : quarterStartDate.toISOString().split('T')[0];
}

function getEndDateForQuarter(quarter, startDate, endDate) {
  const startQuarter = Math.floor((startDate.getMonth() / 3));
  const endQuarter = Math.floor((endDate.getMonth() / 3));
  const currentQuarter = Math.floor((new Date().getMonth() / 3));

  let quarterEndDate;

  switch (quarter) {
    case "Q1":
      quarterEndDate = endQuarter >= 0 ? new Date(startDate.getFullYear(), 2, 31) : endDate;
      break;
    case "Q2":
      quarterEndDate = endQuarter >= 1 ? new Date(startDate.getFullYear(), 5, 30) : endDate;
      break;
    case "Q3":
      quarterEndDate = endQuarter >= 2 ? new Date(startDate.getFullYear(), 8, 30) : endDate;
      break;
    case "Q4":
      quarterEndDate = endQuarter >= 3 ? new Date(startDate.getFullYear(), 11, 31) : endDate;
      break;
    default:
      quarterEndDate = endDate;
      break;
  }

  // Ensure quarter end date is within the provided range
  return quarterEndDate > endDate ? endDate.toISOString().split('T')[0] : quarterEndDate.toISOString().split('T')[0];
}

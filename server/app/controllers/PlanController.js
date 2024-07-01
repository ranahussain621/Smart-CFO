"use strict"

const pool = require("../DBconnection");
const Plans = require('../model/Plans')
const ScenerioPlaning = require('../model/ScenerioPlaning')
const ScenerioPlaningGoals = require('../model/ScenerioPlaningGoals')
const PlanGoals = require('../model/PlanGoals')
const PlanKpi = require('../model/PlanKpi')
const ScenerioPlanData = require('../model/ScenerioPlanData')
const Company = require('../model/Company')
const moment = require('moment');

const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const Kpis = require("../model/Kpis");



exports.addPlan = catchAsyncFunction(async (req, res) => {
    // Input validation
    const { user_id, name, type, Goal, fiscal_year, company_id } = req.body;
    if (!(user_id && name && type && Goal && fiscal_year && company_id)) {
        return res.status(401).json({ success: false, error: "Please fill all the credentials" });
    }

    try {
        // Retrieve company details
        const companyDetails = await Company.findById(company_id);
        if (!companyDetails) {
            return res.status(404).json({ success: false, error: "Company not found" });
        }

        // Calculate start and end dates
        const financialYearStart = companyDetails.financialYearstart;
        const financialYearend = companyDetails.financialYearend;
        const startMonth = new Date(`${financialYearStart} 1, ${fiscal_year}`);
        const startDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
        const endMonth = new Date(`${financialYearend} 1, ${fiscal_year}`);
        const endDate = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0); // Last day of the month
        
        // Date validation
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid financial year dates" });
        }

        // Date formatting
        const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
        const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
        
        // Create plan object
        const plan = new Plans({
            user_id,
            name,
            type,
            Goal,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            company_id,
        });

        // Save plan
        await plan.save();
        
        // Return success message
        res.json({ success: true, message: "Plan added successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || "Some error occurred while creating user" });
    }
});


// get roles
exports.getPlans = catchAsyncFunction(async(req, res) => {
    try {
        const user = await Plans.find();
        res.json({
            success: true,
            data: user,
            message: "Plans fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})

// Update plan status endpoint
exports.changePlanStatus = catchAsyncFunction(async (req, res) => {
    try {
        // Assuming Plans is a Mongoose model and findByIdAndUpdate is the appropriate method
        const plan = await Plans.findByIdAndUpdate(req.params.id, { editingStatus: false }, { new: true });
        
        if (!plan) {
            return res.status(404).json({ success: false, message: "Plan not found" });
        }

        res.json({
            success: true,
            data: plan,
            message: "Plan status changed successfully!"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

exports.deletePlan = catchAsyncFunction(async (req, res) => {
    try {
        // Assuming you're passing the plan id in the request parameters
        const { planId } = req.params;

        // Delete the plan by id
        const deletedPlan = await Plans.findByIdAndDelete(planId);

        if (!deletedPlan) {
            return res.status(404).json({ message: "Plan not found." });
        }

        res.json({
            success: true,
            data: deletedPlan,
            message: "Plan deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Internal server error
    }
});


// get roles
exports.getUserPlans = catchAsyncFunction(async(req, res) => {
    try {
        const user = await Plans.find({company_id: req.params.id });
        res.json({
            success: true,
            data: user,
            message: "Plans fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})


// add roles
exports.addScenerioPlaning = catchAsyncFunction(async(req, res) => {
    if (!(req.body.plan_id, req.body.name, req.body.type, req.body.industryName)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" })
    } else {

        const user = new ScenerioPlaning({
            plan_id: req.body.plan_id,
            name: req.body.name,
            type: req.body.type,
            industryName: req.body.industryName,
        });
        await user.save().then(data => {
            res.json({
                success: true,
                message: "Scenerio Planing added successfully!"
            })
        }).catch(err => {
            res.status(500).send({
                'success': false,
                message: err.message || "Some error occurred while creating user"
            });
        });

    }
})




// get roles
exports.getScenerioPlaning = catchAsyncFunction(async(req, res) => {
    try {
        const user = await ScenerioPlaning.find();
        res.json({
            success: true,
            data: user,
            message: "Scenerio Planing fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})


// get roles
exports.getUserScenerioPlaning = catchAsyncFunction(async(req, res) => {
    try {
        const user = await ScenerioPlaning.find({ plan_id: req.body.plan_id });
        res.json({
            success: true,
            data: user,
            message: "Scenerio Planing fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})


// add roles
exports.addScenerioPlaningGoals = catchAsyncFunction(async(req, res) => {
    if (!(req.body.title)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" })
    } else {

        const user = new ScenerioPlaningGoals({
            title: req.body.title,
        });
        await user.save().then(data => {
            res.json({
                success: true,
                message: "Scenerio Planing Goal added successfully!"
            })
        }).catch(err => {
            res.status(500).send({
                'success': false,
                message: err.message || "Some error occurred while creating user"
            });
        });

    }
})




// get Goals
exports.getScenerioPlaningGoals = catchAsyncFunction(async(req, res) => {
    try {
        const user = await ScenerioPlaningGoals.find();
        res.json({
            success: true,
            data: user,
            message: "Scenerio Planing Goals fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})

//delete goal
exports.DeleteScenerioPlaningGoals = catchAsyncFunction(async(req, res) => {
    try {
      
         await ScenerioPlaningGoals.findOneAndDelete({_id:req.body.id});
        res.json({
            success: true,
            message: "Goals deleted successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})


// add roles
exports.addScenerioPlanGoals = catchAsyncFunction(async(req, res) => {
    if (!(req.body.plan_id && req.body.scenerio_goal_id)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" })
    } else {
        const plan_goal_check= await PlanGoals.find({ plan_id: req.body.plan_id }) 
        if(plan_goal_check.length>0){
             await PlanGoals.deleteMany({ plan_id: req.body.plan_id });
             }
        req.body.scenerio_goal_id.forEach(async(element) => {
            const user = new PlanGoals({
                plan_id: req.body.plan_id,
                scenerio_goal_id: element
            });
            await user.save().then(data => {

            }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });
        })
        res.json({
            success: true,
            message: "Scenerio Planing Goal assigned successfully!"
        })

    }
})




// get roles
exports.getScenerioPlanGoals = catchAsyncFunction(async(req, res) => {
    try {
        const user = await PlanGoals.find({ plan_id: req.body.plan_id });
        res.json({
            success: true,
            data: user,
            message: "Scenerio Planing Goals fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})


exports.addPlanKpi = catchAsyncFunction(async (req, res) => {
    if (!(req.body.plan_id && req.body.kpi_id)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" });
    } else {
        const plan_kpi_check = await PlanKpi.find({ plan_id: req.body.plan_id });
        if (plan_kpi_check.length > 0) {
            await PlanKpi.deleteMany({ plan_id: req.body.plan_id });
        }

        for (const element of req.body.kpi_id) {
            const kpi = await Kpis.findById(element);
            const plankpi = await PlanKpi.find({
                $and: [
                    { 'kpi_id': element },
                    { 'plan_id': req.body.plan_id }
                ]
            });

            if (plankpi.length === 0) {
                const user = new PlanKpi({
                    plan_id: req.body.plan_id,
                    kpi_id: element,
                    kpi_title: kpi.title,
                    kpi_type: kpi.Kpi_type // Assign kpi_type here
                });

                try {
                    await user.save();
                } catch (err) {
                    return res.status(500).send({
                        'success': false,
                        message: err.message || "Some error occurred while creating user"
                    });
                }
            }
        }

        res.status(200).json({
            success: true,
            message: "Plan Kpis assigned successfully!"
        });
    }
});

exports.getPlanKpi = catchAsyncFunction(async (req, res) => {
    try {
        // Extract the id parameter from the request
        const id = req.params.id;

        // Aggregate operation to group plan KPIs by their type
        const data = await PlanKpi.aggregate([
            // Match documents where plan_id equals id
            { $match: { plan_id: id } },

            // Group by kpi_type and push documents into an array
            {
                $group: {
                    _id: "$kpi_type",
                    data: { $push: "$$ROOT" }
                }
            },

            // Project the desired fields
            {
                $project: {
                    data: 1,
                    kpi_type: "$_id",
                    _id: 0 // Exclude _id field from the output
                }
            }
        ]);

        // Send the response with the aggregated data
        res.json({
            success: true,
            data: data,
            message: "Plan KPIs fetched successfully grouped by kpi_type!"
        });
    } catch (error) {
        // Handle errors by sending a 404 status with an error message
        res.status(404).json({ message: error.message });
    }
});



exports.getGolKpi = catchAsyncFunction(async (req, res) => {
    try {
        // Extract the id parameter from the request
        const goalType = req.body.goalType;
        const kpis = await Kpis.find({ Kpi_type: goalType });

        // Group KPIs by Kpi_type using reduce
        const groupedKpis = kpis.reduce((acc, kpi) => {
            acc[kpi.Kpi_type] = acc[kpi.Kpi_type] || [];
            acc[kpi.Kpi_type].push(kpi);
            return acc;
        }, {});

        res.json({
            success: true,
            data: groupedKpis,
            message: "Goal KPIs fetched successfully grouped by Kpi_type!"
        });
    } catch (error) {
        // Handle errors by sending a 404 status with an error message
        res.status(404).json({ message: error.message });
    }
});




// add roles
exports.addPlanData = catchAsyncFunction(async(req, res) => {
    if (!(req.body.plan_id && req.body.kpi_id && req.body.type && req.body.q1 && req.body.q2 && req.body.q3 && req.body.q4)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" })
    } else {
        const plankpi = await PlanKpi.find({ kpi_id: req.body.kpi_id })
        if (plankpi.length==0) {
            return res.status(401).json({ 'success': false, error: "kpi is missing" })
        } else {
        const user = new ScenerioPlanData({
            plan_id: req.body.plan_id,
            kpi_id: req.body.kpi_id,
            kpi_title: plankpi[0].kpi_title,
            kpi_type: plankpi[0].kpi_type,
            type: req.body.type,
            q1: req.body.q1,
            q2: req.body.q2,
            q3: req.body.q3,
            q4: req.body.q4,
        });
        await user.save().then(data => {}).catch(err => {
            res.status(500).send({
                'success': false,
                message: err.message || "Some error occurred while creating user"
            });
        });
    }

    }

    res.json({
        success: true,
        message: "Plan data added successfully!"
    })

})



exports.getPlanData = catchAsyncFunction(async (req, res, next) => {
    try {
        const { plan_id } = req.body;
        
        const aggregatedData = await ScenerioPlanData.aggregate([
            { $match: { plan_id } }, // Filter by plan_id
            { 
                $group: { 
                    _id: { kpi_type: "$kpi_type", type: "$type" }, // Group by kpi_type and type
                    data: { $push: "$$ROOT" } // Push documents into an array
                } 
            },
            { 
                $group: { 
                    _id: "$_id.kpi_type", // Group by kpi_type
                    kpi_data: { $push: { type: "$_id.type", data: "$data" } } // Push grouped data into an array
                } 
            },
            { 
                $project: { 
                    _id: 0, 
                    kpi_type: "$_id", // Rename _id as kpi_type
                    kpi_data: 1 // Include kpi_data field
                } 
            }
        ]);
        
        res.json({
            success: true,
            data: aggregatedData,
            message: "Plan data fetched successfully!"
        });
    } catch (error) {
        next(error);
    }
});


exports.getActualValues = catchAsyncFunction(async (req, res, next) => {
    try {
        const { plan_id, date } = req.body;
        const company_id = await Plans.findById(plan_id);
        const quarterMonths = await Company.findById(company_id.id);
        const startMonth=quarterMonths.financialYearstart;
        const endMonth=quarterMonths.financialYearend;
        // Function to get quarters within the specified start and end months
        function getQuartersWithinRange(startMonth, endMonth) {
            const quarters = [];
            const startQuarter = Math.ceil(moment().month(startMonth).format('MM') / 3);
            const endQuarter = Math.ceil(moment().month(endMonth).format('MM') / 3);

            for (let quarter = startQuarter; quarter <= endQuarter; quarter++) {
                quarters.push(`Q${quarter}`);
            }

            return quarters;
        }

        // Modified function to get quarter from date within the specified start and end months
        function getQuarterFromDate(date, startMonth, endMonth) {
            const quarters = getQuartersWithinRange(startMonth, endMonth);
            const month = new Date(date).getMonth() + 1;

            for (const quarter of quarters) {
                const quarterStartMonth = (parseInt(quarter.slice(1)) - 1) * 3 + 1;
                const quarterEndMonth = (parseInt(quarter.slice(1)) - 1) * 3 + 3;

                if (month >= quarterStartMonth && month <= quarterEndMonth) {
                    return quarter;
                }
            }

            throw new Error('Date does not fall within the specified start and end months');
        }

        // Assuming date is in the format YYYY-MM-DD
        const currentQuarter = getQuarterFromDate(date, startMonth, endMonth).toLowerCase();
        const user = await ScenerioPlanData.find({ plan_id });
        const kpis = user.map(element => element.kpi_id);
        const planeKpis = [...new Set(kpis)];

        const arr = [];

        for (const element of planeKpis) {
            const kpiDetails = await ScenerioPlanData.findOne({ plan_id, kpi_id: element, type: 'actual' });

            if (kpiDetails) {
                const quarterValues = {
                    _id: kpiDetails._id,
                    plan_id: kpiDetails.plan_id,
                    kpi_id: kpiDetails.kpi_id,
                    kpi_title: kpiDetails.kpi_title,
                    type: kpiDetails.type,
                    value: kpiDetails[currentQuarter], // Include the value directly
                };

                arr.push(quarterValues);
            }
        }

        res.json({
            success: true,
            data: arr,
            message: `Actual values for quarter ${currentQuarter} fetched successfully!`,
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

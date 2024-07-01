import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQuickbookPlan, getPlanData } from "../../Redux/SenarioPlanningSlice";
import { useLocation ,useNavigate} from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "85%",
    maxWidth: "95%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
};


    const KPIsName = ["Inventory Turnover Ratio","Revenue per Employee","Employee Turnover Rate","Current Ratio","Gross Profit Ratio","Days Sales Outstanding","Net Profit Ratio","Total Revenue","Customer Satisfaction","Customer Retention","Machine Downtime","Scrap Rate"]



const TemplateTable = ({ addPlanModalIsOpen, closePlanModal }) => {
  const [ShowData, setShowData] = useState([]);

  const location = useLocation();
  const { plan_id, name,truee } = location.state;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

   
  
   const handleBackButtonClick = () => {
      navigate(-1);
    };  
    
    
    // Add event listener for browser back button click
    useEffect(() => {
   window.addEventListener("popstate", handleBackButtonClick);
      // Remove event listener when component unmounts
      return () => {
        window.removeEventListener("popstate", handleBackButtonClick);
      };
    }, []);
  

 

  const user = JSON.parse(localStorage?.getItem("userDetail"));
  const quickBookToken = localStorage?.getItem("quickbookToken");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        await dispatch(fetchQuickbookPlan({ plan_id: plan_id, company_id: user?.company_ids[0]?._id, token: quickBookToken}))
        const response = await dispatch(getPlanData({ plan_id: plan_id }));
        const data = response?.payload;
        setShowData(data?.data);
        setLoading(false); // Set loading to false when fetching completes
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    if (plan_id) getData();
  }, [plan_id]);

 

  const numberWithComma = (number) => {
    if (number == null || isNaN(number)) {
      return "No Data";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString("en-US", options);

  const renderTable = (type) => {
    const displayedKpis = new Set();
    
    return ShowData?.map((item, i) => {
      const kpiDataByType = {};
  
      item.kpi_data.forEach((values) => {
        if (values.type === type) {
          values.data.forEach((kpi) => {
            const kpiTitle = kpi.kpi_title;
            kpiDataByType[kpiTitle] = {
              q1: parseFloat(kpi.q1).toFixed(2),
              q2: parseFloat(kpi.q2).toFixed(2),
              q3: parseFloat(kpi.q3).toFixed(2),
              q4: parseFloat(kpi.q4).toFixed(2),
            };
          });
        }
      });
  
      return (
        <React.Fragment key={i}>
          {Object.keys(kpiDataByType).map((kpiTitle, j) => {
            if (!displayedKpis.has(kpiTitle)) {
              displayedKpis.add(kpiTitle);
              const data = kpiDataByType[kpiTitle];
              return (
                <tr key={`${i}-${j}`} style={{minHeight:750}}>
                  <td style={{ background: "#ECF0F5", padding: "22px 10px", color: "#000000", fontWeight: 700 }}>
                    {kpiTitle}
                  </td>
                  <td className="py-4 text-center pe-3">{data.q1 !== null  ? numberWithComma(data.q1) : 'No Data'}</td>
                  <td className="text-center pe-3">{data.q2 !== null  ? numberWithComma(data.q2) : 'No Data'}</td>
                  <td className="text-center pe-3">{data.q3 !== null   ? numberWithComma(data.q3) : 'No Data'}</td>
                  <td className="text-center pe-3">{data.q4 !== null  ? numberWithComma(data.q4) : 'No Data'}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </React.Fragment>
      );
    });
  };
  
  
  
  

  return (
    <>
    
      {  loading ? (
        <div className="d-flex justify-content-center align-items-center p-5 mt-5">
         <div class="spinner-border text-primary" role="status">
          <span class="sr-only fs-1">Loading...</span>
        </div>  
        </div>
       
      ) : (
        <> 
         <div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="flex flex-col justify-start items-start mb-4">
          <p className="fw-bold mt-4 fs-3">{truee === "direct" ? `Scenario Assessment > ${name}` : "Scenario Assessment"  }</p>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "18px",
                textTransform: "lowerCase",
                color: "#000000",
                margin: 0,
              }}
            >
              As of{" "}
              <span style={{ textTransform: "capitalize" }}>
                <em>{formattedDateTime}</em>
              </span>
            </h2>
          </div>
        </div>

        <Box>
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-md-6 col-sm-12">
                <div className="card rounded-0 shadow" style={{minHeight:'825px'}}>
                  <div className="table m-0">
                    <table style={{ width: "100%", }}>
                      <thead style={{ background: "#CFDFF3", color: "#000000", fontWeight: 700 }}>
                        <tr>
                          <td style={{ padding: "10px", textAlign: "center" }} colSpan="5" className="pt-3">
                            Actual
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px " }}>KPI's</td>
                          <td style={{ padding: "10px" }}>Quarter 1</td>
                          <td style={{ padding: "10px " }}>Quarter 2</td>
                          <td style={{ padding: "10px " }}>Quarter 3</td>
                          <td style={{ padding: "10px " }}>Quarter 4</td>
                        </tr>
                      </thead>
                      <tbody >{  renderTable("actual")}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="card rounded-0 shadow" style={{minHeight:'825px'}}>
                  <div className="table m-0">
                    <table style={{ width: "100%", }}>
                      <thead style={{ background: "#CFDFF3", color: "#000000", fontWeight: 700 }}>
                        <tr>
                          <td style={{ padding: "10px", textAlign: "center" }} colSpan="5" className="pt-3">
                            Ideal
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px " }}>KPI's</td>
                          <td style={{ padding: "10px " }}>Quarter 1</td>
                          <td style={{ padding: "10px " }}>Quarter 2</td>
                          <td style={{ padding: "10px " }}>Quarter 3</td>
                          <td style={{ padding: "10px " }}>Quarter 4</td>
                        </tr>
                      </thead>
                      <tbody >{renderTable("ideal")}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="card rounded-0 shadow" style={{minHeight:'825px'}}>
                  <div className="table m-0">
                    <table style={{ width: "100%", }}>
                      <thead style={{ background: "#CFDFF3", color: "#000000", fontWeight: 700 }}>
                        <tr>
                          <td style={{ padding: "10px", textAlign: "center" }} colSpan="5" className="pt-3">
                            Average
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px " }}>KPI's</td>
                          <td style={{ padding: "10px " }}>Quarter 1</td>
                          <td style={{ padding: "10px " }}>Quarter 2</td>
                          <td style={{ padding: "10px " }}>Quarter 3</td>
                          <td style={{ padding: "10px " }}>Quarter 4</td>
                        </tr>
                      </thead>
                      <tbody>{renderTable("Average")}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="card rounded-0 shadow" style={{minHeight:'825px'}}>
                  <div className="table m-0">
                    <table style={{ width: "100%", }}>
                      <thead style={{ background: "#CFDFF3", color: "#000000", fontWeight: 700 }}>
                        <tr>
                          <td style={{ padding: "10px", textAlign: "center" }} colSpan="5" className="pt-3">
                            Worst
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px " }}>KPI's</td>
                          <td style={{ padding: "10px " }}>Quarter 1</td>
                          <td style={{ padding: "10px " }}>Quarter 2</td>
                          <td style={{ padding: "10px " }}>Quarter 3</td>
                          <td style={{ padding: "10px " }}>Quarter 4</td>
                        </tr>
                      </thead>
                      <tbody>{renderTable("wrost")}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
           </div>
        </>
      )
        
} 


   
    </>
  );
};

export default TemplateTable;

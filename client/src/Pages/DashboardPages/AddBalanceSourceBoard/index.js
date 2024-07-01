import React, { useEffect, useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  UpdateScoreCardKPI,
  adddScoreCardKPI,
  getSenarioKPI,
  quickbookBalanceScoreCard,
} from "../../../Redux/SenarioPlanningSlice";
import "./style.css";

const Index = () => {
  const dispatch = useDispatch();
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  const quickbookAccessToken = localStorage.getItem("quickbookToken");

  const companyId = userDetail.company_ids[0]._id;
  const location = useLocation();
  const { scoreCardId, updateCardKPI, name } = location.state;

  const { isLoading, senarioPlanData } = useSelector(
    (state) => state?.SenarioPlanning
  );

  const [selectedKPIs, setSelectedKPIs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e, categoryType, kpiId) => {
    const currentSelectedKPIs = selectedKPIs[categoryType] || [];
    console.log(e.target.checked);
    if (e.target.checked) {
      if (currentSelectedKPIs.length < 4) {
        setSelectedKPIs({
          ...selectedKPIs,
          [categoryType]: [...currentSelectedKPIs, kpiId],
        });
      } else {
        toast.error("You can select a maximum of 4 KPIs per category", {
          autoClose: 2000,
        });
      }
    } else {
      setSelectedKPIs({
        ...selectedKPIs,
        [categoryType]: currentSelectedKPIs.filter((id) => id !== kpiId),
      });
    }
  };

  useEffect(() => {
    const fetchBalanceScoreCard = async () => {
      try {
        await dispatch(getSenarioKPI());
      } catch (error) {
        console.error("Error fetching user companies:", error);
      }
    };
    fetchBalanceScoreCard();
  }, [dispatch, quickbookAccessToken, scoreCardId]);

  const finish = async () => {
    const selectedKPIIds = Object.values(selectedKPIs).flat();
    if (selectedKPIIds.length === 0) {
      toast.error("Please select at least one KPI", { autoClose: 2000 });
      return;
    }
    try {
      if (updateCardKPI === "update") {
        await dispatch(
          UpdateScoreCardKPI({ scoreCardId, kpi_id: selectedKPIIds })
        );
      } else {
        await dispatch(
          adddScoreCardKPI({ scoreCardId, kpi_id: selectedKPIIds })
        );
      }
      toast.success("KPI Assigned Successfully", { autoClose: 2000 });
      navigate("/userdashboard/ViewBalanceScoreCard", {
        state: { planId: scoreCardId, name: name },
      });
      await dispatch(
        quickbookBalanceScoreCard({ scoreCardId, token: quickbookAccessToken })
      );
    } catch (error) {
      console.error("Error adding KPI or balancing score card:", error);
      toast.error("Failed to add KPI or balance score card");
    }
  };
  const currentDate = new Date();

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    // hour: "numeric",
    // minute: "2-digit",
    // hour12: true,
  };

  const formattedDateTime = currentDate.toLocaleString("en-US", options);
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        className="m-2"
      >
        <Grid item xs={12} sm="auto">
          <h2
            style={{
              fontWeight: 600,
              fontSize: "30px",
              textTransform: "capitalize",
              color: "#000000",
              margin: 0,
            }}
          >
            Create Balance Score Board {" > "}
            <small className="text-center">{name}</small>
          </h2>
          <h2
            style={{
              fontWeight: 500,
              fontSize: "16px",
              color: "#000000",
              
            }}
          >
            {" "}
             
         <span style={{ textTransform: "lowercase",}}>as of</span>   <em>{formattedDateTime}</em>

          </h2>   
        </Grid>
        <Grid item xs={12} sm="auto">
        <h2   
             className="me-4"
            style={{
              fontWeight: 500,
              fontSize: "16px",
             
              color: "#000000",
            }}
          > Note : <span className="fw-bold underline" style={{textTransform:'lowercase'}}>You can select maximum four KPI's in one section</span> 
          </h2>
        </Grid>
      </Grid>

      <Grid container sx={{ backgroundColor: "#fff", paddingY: "16px" }}>
        <Grid container spacing={3}>
          {isLoading ? (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : senarioPlanData?.data?.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center w-100">
              <h2 className="p-5 fs-4">No Data</h2>
            </div>
          ) : (
            senarioPlanData?.data?.map((category) => {
              const currentSelectedKPIs = selectedKPIs[category.type] || [];
              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  key={category.type}
                  className=""
                >
                  <div
                    className="card shadow border-0"
                    style={{ minHeight: 330 }}
                  >
                    <Grid container sx={{ padding: "16px" }}>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "16px",
                            paddingY: "8px",
                          }}
                        >
                          {category.type}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ textAlign: "end" }}
                      >
                        {/* Place your actions here */}
                      </Grid>
                      <Grid
                        container
                        sx={{ backgroundColor: "#ECF0F5", padding: "6px" }}
                      >
                        <Grid item xs={6} sm={6} md={8} lg={8}>
                          <Typography className="Box-subtext">KPI</Typography>
                        </Grid>
                      </Grid>
                      {category?.kpis?.map((kpi) => (
                        <Grid
                          container
                          sx={{
                            padding: "6px",
                            borderBottom: "1px solid #D1D1D1",
                            paddingBottom: "10px",
                          }}
                          key={kpi._id}
                        >
                          <Grid item xs={6} sm={6} md={8} lg={8}>
                            <Box sx={{ alignItems: "center", display: "flex" }}>
                              {/* Add your image here if needed */}
                              <Typography className="Box-subtext-box text">
                                {kpi.title}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3} lg={3}>
                            <label className="checker d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                value={kpi._id}
                                checked={currentSelectedKPIs.includes(kpi._id)}
                                onChange={(e) =>
                                  handleChange(e, category.type, kpi._id)
                                }
                                // disabled={
                                //   // !currentSelectedKPIs.includes(kpi._id)
                                // }
                              />
                              <span
                                className="checkmark"
                                style={{
                                  borderRadius: "20px",
                                  background: "#2BAA3F",
                                }}
                              ></span>
                            </label>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Grid>
              );
            })
          )}
        </Grid>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "end" }}>
        <button
          className="rounded btn text-white px-4 shadow mt-3"
          style={{background:'#2457C5',}}
          onClick={finish}
        >
          Finish
        </button>
      </Grid>
    </>
  );
};

export default Index;

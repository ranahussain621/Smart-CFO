import React, { useEffect } from "react";
import "./style.css";
import { Typography, Grid, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { quickbookBalanceScoreCard } from "../../../Redux/SenarioPlanningSlice";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const planId = location.state?.planId;

  const { name } = location.state;

  const { isLoading, balanceScoreCard } = useSelector(
    (state) => state?.SenarioPlanning
  );

  const quickbookAccessToken = localStorage.getItem("quickbookToken");

  useEffect(() => {
    const fetchBalanceScoreCard = async () => {
      try {
        if (planId) {
          await dispatch(
            quickbookBalanceScoreCard({
              scoreCardId: planId,
              token: quickbookAccessToken,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching score card KPI:", error);
      }
    };
    fetchBalanceScoreCard();
  }, [planId, dispatch, quickbookAccessToken]);

  const UpdateCardKPI = (item) => {
    navigate("/userdashboard/balancesourceboard", { state: { edit: item } });
  };

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    // hour: "numeric",
    // minute: "2-digit",
    // hour12: true,
  };

  const currentDate = new Date();
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
        <Grid item xs={12} sm="auto" sx={{ paddingTop: 0 }}>
          <h2
            style={{
              fontWeight: 600,
              fontSize: "30px",
              textTransform: "capitalize",
              color: "#000000",
              margin: 0,
            }}
          >
            Balance Score Board {" > "} <small>{name}</small>
          </h2>
        </Grid>
        <Grid item xs={12} sm="auto" className="mt-0 pt-0">
          <Button
            variant="contained"
            disabled={
              !balanceScoreCard?.data || balanceScoreCard?.data?.length === 0
            }
            className="me-4 shadow"
            sx={{
              background: "#2457C5",
              color: "white",
              textTransform: "capitalize",
              border: 0,
              fontSize: 15,
              fontFamily: "Poppins",
              padding: "9px 25px",
              "&:hover": { 
                background: "#2457C5", 
              },
            }}
            onClick={() => UpdateCardKPI("update")}
          >
            {isLoading ? "loading..." : "Edit Balance Score Card"}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm="auto" sx={{ paddingTop: 0 }} className="mx-4">
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
      </Grid>
      <Grid container sx={{ backgroundColor: "#fff", paddingY: "16px" }}>
        <Grid container spacing={3}>
          {isLoading ? (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !balanceScoreCard?.data?.length ? (
            <div className="d-flex align-items-center justify-contenter w-100">
              <h2 className="p-5 text-center w-100 fs-4 fw-semibold poppins-500">
                No Data
              </h2>
            </div>
          ) : (
            balanceScoreCard.data.map(({ type, kpis }) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={type} className="">
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
                        {type}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      sx={{ textAlign: "end" }}
                    ></Grid>
                    <Grid
                      container
                      sx={{ backgroundColor: "#ECF0F5", padding: "6px" }}
                    >
                      <Grid item xs={6} sm={6} md={8} lg={8}>
                        <Typography className="Box-subtext">KPI</Typography>
                      </Grid>
                      <Grid item xs={2} sm={2} md={3} lg={3}>
                        <Typography className="Box-subtext">Values</Typography>
                      </Grid>
                    </Grid>
                    {kpis.map((kpi) => (
                      <Grid container sx={{ padding: "6px" }} key={kpi.id}>
                        <Grid item xs={6} sm={6} md={8} lg={8}>
                          <Box sx={{ alignItems: "center", display: "flex" }}>
                            <Typography className="Box-subtext-box fs-6">
                              {kpi.title}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={2} sm={2} md={3} lg={3}>
                          <Typography className="Box-subtext-box fs-6">
                            {kpi.value === "NaN" ? "No Data" : kpi.value}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Index;

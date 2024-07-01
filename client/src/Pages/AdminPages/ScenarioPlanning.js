import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "../AdminPages/scenariogoals.css";
import { Grid, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getAllPlans } from "../../Redux/AdminSlice";
import { useDispatch } from "react-redux";

const ScenarioPlanning = () => {
  const [list, setlist] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlans()).then((response) => {
      const value = response?.payload;
 
      setlist(value?.data);
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <Typography className="Main_Head">Scenario Planning</Typography>
          <Typography className="Main_subHead">
            Thu, 25 May, 2023, 10.30 PM{" "}
          </Typography>
        </Grid>
      </Grid>
      <div className="card shadow border-0">
        <div className="card-body d-flex justify-content-center">
          <div className="w-100">
            <div class="container mt-3">
              <div className="table-responsive">
                <table class="table">
                  <thead>
                    <tr
                      className="text-muted shadow"
                      style={{ backgroundColor: "#4545501A" }}
                    >
                      <th className="p-3">Plans</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Goals</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((item, index) => (
                      <tr key={index} className="text-muted shadow ">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.type}</td>
                        <td className="p-3">{item.Goal}</td>
                        <td className="p-3">
                          <Box sx={{ display: "flex" }}>
                            <DeleteIcon sx={{ color: "red" }} />{" "}
                            <ErrorOutlineIcon />
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScenarioPlanning;

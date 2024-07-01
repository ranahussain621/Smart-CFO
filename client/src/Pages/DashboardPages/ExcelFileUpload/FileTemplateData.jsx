import React, { useEffect, useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Grid, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DataContext } from "./Context";
const FileTemplateData = () => {
  const { data } = useContext(DataContext);

  return (
    <div>
      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <Typography className="Main_Head">Upload File Data</Typography>
          <Typography className="Main_subHead">
            Thu, 25 May, 2023, 10.30 PM{" "}
          </Typography>
        </Grid>
      </Grid>{" "}
      <div className="card shadow border-0">
        <div className="card-body d-flex justify-content-center">
          <div className="w-100">
            <div class="container mt-3">
              <div className="table-responsive">
                <div className="table-responsive">
                  <table class="table table-borderless">
                    <thead>
                      <tr
                        className="text-muted shadow"
                        style={{ backgroundColor: "#00003A" }}
                      >
                        <th
                          className="p-3"
                          style={{
                            color: "white",
                          }}
                        >
                          Name
                        </th>
                        <th
                          className="p-3"
                          style={{
                            color: "white",
                          }}
                        >
                          Sum
                        </th>
                        <th
                          className="p-3"
                          style={{
                            color: "white",
                          }}
                        >
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => {
                        return (
                          <>
                            <tr
                              key={index}
                              className="text-muted shadow-sm border rounded-3 "
                            >
                              <td className="p-3">
                                <div className="d-flex">
                                  <div className="px-4 name">{item.name}</div>
                                </div>
                              </td>
                              <td className="p-3">{item.sum}</td>
                              <td className="p-3">{item.count}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileTemplateData;

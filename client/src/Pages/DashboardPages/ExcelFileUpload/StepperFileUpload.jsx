// StepperFileUpload.js
import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import './style.css'

const steps = ["Upload File", "Import"];

const StepperFileUpload = ({ activeStep }) => {
  return (
    <Box sx={{ width: "50%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          return (
            <Step key={label} {...stepProps} style={{ padding: "0px 20px ",color:'yellow' }}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default StepperFileUpload;

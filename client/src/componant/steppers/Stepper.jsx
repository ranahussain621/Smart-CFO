import React, { useState } from "react";
import "./stepper.css";
import StepperScreen1 from "./StepperScreen1";
import StepperScreen2 from "./StepperScreen2";
import StepperScreen3 from "./StepperScreen3";
import StepperScreen4 from "./StepperScreen4";
import { useLocation } from "react-router-dom";

export const Stepper = (props) => {
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

  const [activeStep, setActiveStep] = useState(0);

  const [stepperDisplay, setStepperDisplay] = useState(false);
  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const location = useLocation();
  const planIdusingLocation = location.state?.planId;
  const { name } = location.state;

  const numSteps = 4; 
  const stepItemWidth = `${100 / numSteps}%`;

  const [goalTitle, setgoalsTile] = useState([]);

  return (
    <>
      <div className="d-flex justify-content-center container align-items-center flex-column">
        <div className="row w-100  px-0 mx-0">
          <div className="col-md-12 mx-0 px-0" style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontWeight: 600,
                fontSize: "30px",
                textTransform: "capitalize",
                color: "#000000",
              }}
            >
              Scenario Creation {" > "} {name}
            </h2>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "16px",

                color: "#000000",
              }}
            >
              {" "}
              <span style={{ textTransform: "lowercase" }}>as of</span>{" "}
              <em>{formattedDateTime}</em>
            </h2>
          </div>
        </div>

        <div className="card border-0 shadow-lg" style={{ minWidth: "100%" }}>
          <div className="card-body">
            {!stepperDisplay ? (
              <div className="steps mt-5">
                <progress
                  id="progress"
                  value={activeStep * 100}
                  max={100}
                ></progress>
                <div className="step-item" style={{ width: stepItemWidth }}>
                  <button
                    className={` step-button text-center ${
                      activeStep >= 0 ? "done" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded={activeStep === 0 ? "true" : "false"}
                    aria-controls="collapseOne"
                    style={{ width: "220px" }}
                    // onClick={() => handleStepClick(0)}
                  ></button>
                  <div className="d-flex justify-content-center flex-column">
                    <p className=" text-start m-0 ps-5">
                      {" "}
                      <b>Step1</b>{" "}
                    </p>
                    <p className="text-muted text-start ps-5 ">Basic Detail</p>
                  </div>
                </div>
                <div
                  className="step-item mx-2"
                  style={{ width: stepItemWidth }}
                >
                  <button
                    className={`step-button text-center ${
                      activeStep >= 1 ? "done" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded={activeStep === 1 ? "true" : "false"}
                    aria-controls="collapseTwo"
                    // onClick={() => handleStepClick(1)}
                    style={{ width: "220px" }}
                  ></button>
                  <div className="d-flex justify-content-center flex-column">
                    <p className=" text-start m-0 ps-5">
                      {" "}
                      <b>Step2</b>{" "}
                    </p>
                    <p className="text-muted text-start ps-5 ">Select Goal</p>
                  </div>
                </div>
                <div
                  className="step-item mx-2 "
                  style={{ width: stepItemWidth }}
                >
                  <button
                    className={`step-button text-center ${
                      activeStep >= 2 ? "done" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded={activeStep === 2 ? "true" : "false"}
                    aria-controls="collapseThree"
                    // onClick={() => handleStepClick(2)}
                    style={{ width: "220px" }}
                  ></button>

                  <div className="d-flex justify-content-center flex-column">
                    <p className=" text-start m-0 ps-5">
                      {" "}
                      <b>Step3</b>{" "}
                    </p>
                    <p className="text-muted text-start ps-5 ">
                      Select KPI for Plan
                    </p>
                  </div>
                </div>
                <div className="step-item" style={{ width: stepItemWidth }}>
                  <button
                    className={`step-button text-center ${
                      activeStep >= 3 ? "done" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded={activeStep === 3 ? "true" : "false"}
                    aria-controls="collapseFour"
                    style={{
                      width: "220px",
                    }}
                    // onClick={() => handleStepClick(3)}
                  ></button>
                  <div className="d-flex justify-content-center flex-column">
                    <p className=" text-start m-0 ps-5">
                      {" "}
                      <b>Step4</b>{" "}
                    </p>
                    <p className="text-muted text-start ps-5 ">
                      Quarterly Targets
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {activeStep === 0 ? (
              <div
                className="card-body "
                style={{
                  margin: "0px 10%",
                }}
              >
                <div className="mt-2 d-flex justify-content-center">
                  <StepperScreen1
                    nextwindow={handleStepClick}
                    plan_id={planIdusingLocation}
                  />
                </div>
              </div>
            ) : activeStep === 1 ? (
              <div
                className="card-body mx-0 px-0"
                style={{
                  margin: "0px 10%",
                }}
              >
                <div className="mt-2 d-flex ">
                  <StepperScreen2
                    nextwindow={handleStepClick}
                    plan_id={planIdusingLocation}
                    updateGoalTitle={setgoalsTile}
                    goalTitle={goalTitle}
                  />
                </div>
              </div>
            ) : activeStep === 2 ? (
              <div
                className="card border-0"
                style={{
                  margin: "0px 10%",
                }}
              >
                <div className="mt-2 card-body mx-0 px-0">
                  <StepperScreen3
                    nextwindow={handleStepClick}
                    plan_id={planIdusingLocation}
                    goalTitle={goalTitle}
                  />
                </div>
              </div>
            ) : activeStep === 3 ? (
              <div
                className="card border-0 w-100"
                style={{
                  margin: "0px 10%",
                }}
              >
                <div className="mt-2 card-body mx-0 px-0">
                  <StepperScreen4
                    nextwindow={handleStepClick}
                    plan_id={planIdusingLocation}
                    setStepperDisplay={setStepperDisplay}
                    stepperDisplay={stepperDisplay}
                    
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

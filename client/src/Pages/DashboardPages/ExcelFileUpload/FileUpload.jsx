import React, { useState } from "react";
import StepperFileUpload from "./StepperFileUpload";
import upload from "../../../Assets/Images/upload.svg";
import Button from "@mui/material/Button";
import FileImported from "./FileImported";
import FileImortedSuccessfully from "./FileImportSuccess";
import { Box } from "@mui/material";
import XLSX_FILE from "../../../SampleFile/Sample.XLSX";

const FileUpload = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileImported, setShowFileImported] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(true);

  const handleNext = () => {
    if (activeStep === 0 && selectedFile) {
      setShowFileImported(true);
      setShowFileUpload(false);
      setActiveStep(1);
    } else if (activeStep === 1) {
      setShowFileImported(false);
      setShowFileUpload(false);
      setActiveStep(2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setShowFileImported(false);
    setShowFileUpload(true);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSelectedFile(null);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
    setShowFileImported(step === 1);
    setShowFileUpload(step === 0);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setShowFileImported(true);
      setShowFileUpload(false);
      setActiveStep(1);
    }
  };

  const pick = () => {
    document.getElementById("fileInput").click();
  };

  const downloadFile = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <div className="mx-2">
        <div className="card rounded-0 mt-5 mx-3">
          <Box className="w-full flex-end flex justify-end ">
          <Button
              variant="contained"
              className="mt-3 shadow-lg"
              sx={{ marginRight: "20px", fontFamily:'poppins',background: '#2457C5' ,textTransform:'capitalize',"&:hover":{background: '#2457C5'}}}
              onClick={() => downloadFile(XLSX_FILE, "sample.xlsx")}
            >
              <span className="text-white px-4">Download Sample File</span>
            </Button>

          </Box>
          <div className="card-body">
            <div className="mx-5">
              <div className="stepper p-5 ps-4">
                <StepperFileUpload
                  activeStep={activeStep}
                  handleStepClick={handleStepClick}
                />
              </div>

              {showFileUpload && (
                <div
                  className="file-upload mx-5 ps-4 py-5 "
                  onClick={pick}
                  style={{ cursor: "pointer" }}
                >
                  <div className=" d-flex justify-content-center ">
                    <img src={upload} alt="" />
                  </div>
                  <div className="d-flex justify-content-center my-4">
                    <h2
                      style={{
                        fontWeight: 600,
                        fontSize: "30px",
                        textTransform: "capitalize",
                        color: "#000000",
                      }}
                    >
                      Select File
                    </h2>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".xlsx, .xls"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="d-flex justify-content-center ">
                    <h2
                      style={{
                        fontWeight: 500,
                        fontSize: "18px",
                        textTransform: "capitalize",
                        color: "#000000",
                      }}
                    >
                      Choose a file from your system
                    </h2>
                  </div>
                </div>
              )}

              {showFileImported && <FileImported selectedFile={selectedFile} />}

              {activeStep === 2 && (
                <FileImortedSuccessfully selectedFile={selectedFile}   setActiveStepp = {setActiveStep} />
              )}

              {activeStep !== 2 && (
                <div className="btn-group d-flex justify-content-end align-items-center my-5">
                  <Button
                    variant="outlined"
                    className="rounded me-md-5 mb-3 mb-md-0 bg-white shadow"
                    sx={{
                      width: 120,
                      "&:hover": {
                        background: "#2457C5",
                      },
                    }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    className="rounded px-4  me-5 text-white shadow"
                    sx={{
                      width: 120,
                      background: "#2457C5",
                      "&:hover": {
                        background: "#2457C5",
                      },
                    }}
                    onClick={handleNext}
                    disabled={!selectedFile}
                  >
                    {showFileImported ? "Finish" : "Next"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;

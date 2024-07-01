import React, { useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import right from "../../../Assets/Images/right.svg";
import * as XLSX from "xlsx";
import { baseURL } from "../../../axios/axios";
import { DataContext } from "./Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { UploadCSVFile } from "../../../Redux/SenarioPlanningSlice";

const FileImortedSuccessfully = ({ selectedFile , setActiveStepp }) => {

  const navigate = useNavigate();
  const { setData } = useContext(DataContext);

  // useEffect(() => {
  //   if (selectedFile !== null) {
  //     // const workBook = XLSX.read(selectedFile, { type: "buffer" });
  //     // const workBookName = workBook.SheetNames[0];
  //     // const workSheet = workBook.Sheets[workBookName];
  //     // const data = XLSX.utils.sheet_to_json(workSheet);
  //     // console.log(workBookName, data.slice(0, 100));
  //   }
  // }, []);

  const userDetail = JSON.parse(localStorage.getItem("userDetail"));

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!selectedFile) {
      return;
    }

    const formDataa = new FormData();
    formDataa.append("excelFile", selectedFile);
    formDataa.append("company_id", userDetail?.company_ids[0]?.company_id);

    try {
      await dispatch(UploadCSVFile(formDataa)).then((res) => {
            
        if(res.error?.message){
          toast.error('Invalid File Format')
          return
        }
        else {
            console.log("first")
          toast.success("File Uploaded Successfuly");
           navigate("/userdashboard/dashboard");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };


  const handleBack = () =>{
    window.location.reload()
    setActiveStepp((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column  align-items-center">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle mb-4"
          style={{ width: 150, height: 150, background: "rgb(141, 215, 206)" }}
        >
          <img
            src={right}
            alt=""
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        </div>
        <h2
          className="my-4"
          style={{
            fontWeight: 600,
            fontSize: "30px",
            textTransform: "capitalize",
            color: "#000000",
          }}
        >
          File Successfully Imported
        </h2>
        <div className="d-flex align-items-center">
          <Button
                    variant="outlined"
                    className="rounded me-md-5  mb-md-0 bg-white shadow"
                    sx={{
                      width: 120,
                      "&:hover": {
                        background: "#2457C5",
                      },
                    }}
                    
                    onClick={handleBack}
                  >
                    Back
                  </Button>
        <Button
          variant=""
          className="rounded  text-white  border px-4"
          sx={{ textTransform: "capitalize", fontFamily: "poppins" ,background:'#2457C5', "&:hover": { // Override hover styles
            background: "#2457C5", // Set the background color to the same as normal state
          },}}
          onClick={handleSubmit}
        >
          Go to Dashboard
        </Button>  
        </div>
      
      </div>
    </div>
  );
};

export default FileImortedSuccessfully;

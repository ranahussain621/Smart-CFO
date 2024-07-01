
import { Box, IconButton, Typography, } from "@mui/material";
  import React, {  useState } from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";
  import {useDispatch,} from "react-redux";

import { toast } from "react-hot-toast";
import { AddKpis } from "../../../Redux/AdminSlice";
import { getSenarioKPI } from "../../../Redux/SenarioPlanningSlice";
import FormControl from "@mui/material/FormControl";



  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      minWidth: "700px",
      maxWidth: "800px",
      transform: "translate(-50%, -50%)",
    },
  };
  
  const AddKpiModal = ({ addKpiModalIsOpen, closeKpiModal }) => {



const dispatch = useDispatch();
   

const [kpiData, setKpiData] = useState({ title: '', Kpi_type: 'FINANCIAL' });

const handleTitleChange = (event) => {
  setKpiData({ ...kpiData, title: event.target.value });
};

const handleTypeChange = (event) => {
  setKpiData({ ...kpiData, Kpi_type: event.target.value });
};


const submitData = () => {
  if (kpiData.title === "" || kpiData.Kpi_type === "") {
    closeKpiModal();
    toast.error("Invalid Credentials");
  } else {
    dispatch(AddKpis(kpiData))
      .then((res) => {
       
        dispatch(getSenarioKPI());
        setKpiData({ title: '', Kpi_type: 'FINANCIAL' });
        if(res?.payload?.success === true){
          toast.success("KPI added successfully!");
        }
        
        closeKpiModal();
      });
  }
};


    return (
      <Box >
        <Modal
          isOpen={addKpiModalIsOpen}
          onRequestClose={closeKpiModal}
          style={{ overlay: { zIndex: 9999 }, content: customStyles.content }}
          contentLabel="Example Modal"
        >
          <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <IconButton onClick={closeKpiModal} aria-label="delete">
                <CloseIcon sx={{ color: "#000" }} />
              </IconButton>
            </Box>
  
            <Box>
              <Typography variant="h5" 
              className="text-start mb-3 px-5"
              sx={{ fontWeight: "600", color: "#000" }}>
                KPI Title
              </Typography>

           
              <Box
              variant='div'
              className=''
              >
            <div className="d-flex  w-100">
                <div className="d-flex align-items-center">
                      {/* <label className="px-5" htmlFor="exampleInputEmail1">Title</label> */}
                </div>
          
    <input type="text" 
   className="form-control ms-5 rounded-1"
    style={{padding:'13px'}} 
     id="exampleInputEmail1" 
     placeholder="Title"
     value={kpiData.title}
     onChange={handleTitleChange}
     />
            </div>
          
         

              </Box>
  
            </Box>


            <Box>
  <FormControl style={{ width: "100%" }} className=" mt-4">
    <Typography variant="h5" className="text-start mb-3 px-5" sx={{ fontWeight: "600", color: "#000" }}>
      KPI Type
    </Typography>

    <select class="form-select" className="ms-5 rounded-1" style={{padding:'16px',cursor:'pointer'}}  aria-label="Default select example" value={kpiData.Kpi_type} onChange={handleTypeChange}>
  <option value="FINANCIAL" >FINANCIAL</option>
  <option value="LEARNING & GROWTH" >LEARNING & GROWTH</option>
  <option value="CUSTOMERS">CUSTOMERS</option>
  <option value="INTERNAL">INTERNAL </option>
</select>
  </FormControl>
</Box>


   <div className="d-flex justify-content-end w-100 mt-5">
                <button className="btn btn-dark px-4 rounded-0" onClick={submitData} >Add New KPI </button>
            </div>

          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default AddKpiModal;
  
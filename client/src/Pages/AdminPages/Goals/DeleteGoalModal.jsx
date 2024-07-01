
import {
    Box,
    IconButton,
    Typography,
    Button,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";
  import {useDispatch } from "react-redux";

import { toast } from "react-hot-toast";
import { getGoals } from "../../../Redux/SenarioPlanningSlice";
import { DeleteGoal } from "../../../Redux/AdminSlice";



  
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
  
  const DeleteGoalModal = ({id, ModalIsOpen, closeModal }) => {





const dispatch = useDispatch();
   




const DeleteGoalFunctioin=()=>{

    dispatch(DeleteGoal({
      id,
    })).then(()=>{
      dispatch(getGoals())
       closeModal()
       toast.success("Goal Deleted successfully!",{duration:'1000'})
    })
   
   

}


    return (
      <Box >
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={closeModal}
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
              <IconButton onClick={closeModal} aria-label="delete">
                <CloseIcon sx={{ color: "#000" }} />
              </IconButton>
            </Box>
  
            <Box>
              <Typography variant="h4" 
              className="text-center"
              sx={{ fontWeight: "600", color: "#000" }}>
                Delete Goal
              </Typography>

              <Typography  
              className="text-center mt-3"
              sx={{ fontWeight: "300", color: "#000" }}>
              Are you sure to Delete Goal ?
              </Typography>
              <Box
              variant='div'
              className='text-end'
              >
<button variant="contained" className="rounded-0 btn btn-dark px-4" onClick={DeleteGoalFunctioin}>Delete</button>
              </Box>
  
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default DeleteGoalModal;
  
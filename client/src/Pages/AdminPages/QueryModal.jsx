
import {Box,IconButton,} from "@mui/material";
  import React from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";



    const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "700px",
      maxHeight:'90%',
      transform: "translate(-50%, -50%)",
    },
  };
  


  const QueryDetail = ({ ModalIsOpen, closeModal,queryData}) => {



    return (
      <Box sx={{ width: "800px" }}>
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Box sx={{ padding: "0 20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
              className="mt-2"
            >
              <div className="w-100 text-start">
                 <p className="h3  text-start"  style={{fontWeight:'600'}}>Query Details</p> 
              </div>
             
              <IconButton onClick={closeModal} aria-label="delete">
                <CloseIcon  sx={{ color:'black' }} />
              </IconButton>
            </Box>
          
         
<div className="row ps-1 mt-4" style={{justifyContent:'space-between'}}>
  <div className="col-md-6 name">
    <p className="m-0 mb-1" style={{fontWeight:'600'}}> Name</p>
    <p>{queryData?.name}</p>
  </div>
  <div className="col-md-6 email">
    <p className="m-0 mb-1" style={{fontWeight:'600'}}>Email</p>
    <p>{queryData?.email}</p>
  </div>
</div>
<div className="mt-3 query ps-1">
  <p className="m-0 mb-2" style={{fontWeight:'600'}}>Query</p>
  <p className="border rounded p-3">{queryData?.message}</p>
</div>


          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default QueryDetail;
  
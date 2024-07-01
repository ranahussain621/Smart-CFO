
import {
    Box,
    IconButton,
    Typography,
  } from "@mui/material";
  import React from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";
  import {useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { UnsubscribeUser } from "../../Redux/subscriptionSlice";
import { getAllUser } from "../../Redux/AdminSlice";




  
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
  
  const CancelSubscriptionModal = ({id, ModalIsOpen, closeModal }) => {

    const {isLoading} = useSelector((state) => state.subscription);



const dispatch = useDispatch();
   




const CancelSubs=()=>{
    dispatch(UnsubscribeUser({user_id:id})).then(async (res)=>{
        if(res?.payload?.canceledSubscription){
         toast?.success('Unsubscribe Successfully!')   
        }
        else {
            toast.error('Error 404!')
        }
        await dispatch(getAllUser());
       closeModal()

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
                Cancel Subscription
              </Typography>

              <Typography  
              className="text-center mt-3"
              sx={{ fontWeight: "300", color: "#000" }}>
              Are you sure to Cancel Subscription ?
              </Typography>
              <Box
              variant='div'
              className='text-end'
              >
<button variant="contained" className="rounded-0 btn btn-dark px-4" onClick={CancelSubs}>{isLoading ? 'loading...':'Submit'}</button>
              </Box>
  
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default CancelSubscriptionModal;
  
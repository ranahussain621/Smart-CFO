import { Box, IconButton, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";

import { toast } from "react-hot-toast";
import {
  DeleteCompany,
  companiesList,
  deleteMyCFO,
  getMyCFO,
} from "../../../Redux/AdminSlice";

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

const DeleteCFO = ({ user_id, ModalIsOpen, closeModal }) => {
  const dispatch = useDispatch();
  var User = JSON.parse(localStorage.getItem("userDetail"));
  let userid = User?.company_ids[0]?.company_id;


  const DeleteFunction = () => {
    dispatch(
      deleteMyCFO({
        user_id,
      })
    ).then((res) => {

      if (res?.payload?.success === true) {
        closeModal();
        dispatch(getMyCFO(userid));
        toast.success(res.payload.message, { duration: "1000" });
      } else {
        toast.error("something wrong, please try again!", { duration: "1000" });
      }
    });
  };

  return (
    <Box>
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
            <Typography
              variant="h4"
              className="text-center"
              sx={{ fontWeight: "600", color: "#000" }}
            >
              Delete CFO
            </Typography>

            <Typography
              className="text-center mt-3"
              sx={{ fontWeight: "300", color: "#000" }}
            >
              Are you sure to Remove this CFO ?
            </Typography>
            <Box variant="div" className="text-end">
              <Button
                variant="contained"
                onClick={() => {
                  DeleteFunction();
                }}
              >
                Remove
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteCFO;

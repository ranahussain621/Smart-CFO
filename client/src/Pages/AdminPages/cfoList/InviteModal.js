import { Box, IconButton, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { InviteCFO, getAllUser } from "../../../Redux/AdminSlice";
import { getGoals } from "../../../Redux/SenarioPlanningSlice";

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

const AddGoalModal = ({ addPlanModalIsOpen, closePlanModal }) => {
  const [email, setEmail] = useState("");

  // var storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
  // let user_id = storedUserDetail?.user?._id
  // {console.log(storedUserDetail?.user?._id,"user_id")}

  const user = JSON.parse(localStorage.getItem("userDetail"));
  const company_id = user?.company_id?._id;

  const dispatch = useDispatch();

  const submitData = () => {
    if (email === "") {
      toast.error("please fill credentials");
    } else {
      dispatch(
        InviteCFO({
          email,
          company_id,
        })
      ).then((res) => {
        setEmail("");
        toast.success("Invite Sent successfully!");
        closePlanModal();
      });
    }
  };
  return (
    <Box>
      <Modal
        isOpen={addPlanModalIsOpen}
        onRequestClose={closePlanModal}
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
            <IconButton onClick={closePlanModal} aria-label="delete">
              <CloseIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>

          <Box>
            <Typography
              variant="h5"
              className="text-start mb-3 px-5"
              sx={{ fontWeight: "600", color: "#000" }}
            >
              Invite Team Members
            </Typography>

            <Box variant="div" className="">
              <div className="d-flex  w-100">
                <div className="d-flex align-items-center">
                  <label className="px-5" htmlFor="exampleInputEmail1">
                    Email
                  </label>
                </div>

                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Title"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-end w-100 mt-3">
                <button className="btn btn-dark" onClick={submitData}>
                  Send Invitation{" "}
                </button>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddGoalModal;

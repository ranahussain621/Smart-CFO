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

const CreateCompanyModal = ({ addPlanModalIsOpen, closePlanModal }) => {
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
              className="text-start mb-5 px-5"
              sx={{ fontWeight: "600", color: "#000" }}
            >
              Create Company
            </Typography>
            <Box variant="div" className="mb-5">
              <div className="d-flex  w-100">
                <div className="d-flex align-items-center w-[63%]">
                  <label className="px-5 " htmlFor="exampleInputEmail1">
                    Company Name
                  </label>
                </div>

                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Company Name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Box>

            <Box variant="div" className="">
              <div className="  w-100 flex flex-col ">
                <div className="d-flex align-items-center mb-4">
                  <label className="px-5" htmlFor="exampleInputEmail1">
                    Assign to:
                  </label>
                </div>

                <input
                  type="text"
                  className=" w-[92.5%] ml-[48px]"
                  id="exampleInputEmail1"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-end w-100 mt-3">
                <button className="btn btn-dark" onClick={submitData}>
                  Create Company{" "}
                </button>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateCompanyModal;

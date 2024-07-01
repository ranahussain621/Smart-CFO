import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { sendInvite } from "../../../Redux/SenarioPlanningSlice";
import { toast } from "react-hot-toast";

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

const InviteModal = ({ addPlanModalIsOpen, closePlanModal, companyId }) => {
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(false);

  const storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
  const userId = storedUserDetail?.user._id;

  const [invite, setInvite] = useState({
    email: "",
    user_id: userId,
    company_id: ''
  });

  useEffect(() => {
    setInvite(prevState => ({
      ...prevState,
      company_id: companyId
    }));
  }, [companyId]);

  // Function to handle input change
  const handleEmailChange = (e) => {
    setInvite(prevState => ({
      ...prevState,
      email: e.target.value
    }));
  };

  const submitData = () => {
    if (!invite.email) {
      toast.error('Email is required', { autoClose: 2000 });
      closePlanModal()
      return;
    }

    setLoading(true);

    dispatch(sendInvite(invite))
      .then((res) => {
        if (res.payload.success === true) {
          toast.success("Invitation sent successfully!");
          setInvite(prevState => ({
            ...prevState,
            email: "",
          }));
          closePlanModal();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error sending invitation:", error);
        toast.error("Error sending invitation. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      isOpen={addPlanModalIsOpen}
      onRequestClose={closePlanModal}
      style={{ overlay: { zIndex: 9999 }, content: customStyles.content }}
      contentLabel="Invite Team Members Modal"
    >
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={closePlanModal} aria-label="close">
            <CloseIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>

        <Box>
          <Typography variant="h5"
            className="text-start mb-3 px-5 mb-4"
            sx={{ fontWeight: "600", color: "#000" }}>
            Invite Team Members
          </Typography>

          <Box>
            <div className="d-flex w-100">
              <div className="d-flex align-items-center">
                <label className="px-5" htmlFor="exampleInputEmail1">Email</label>
              </div>

              <input type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                value={invite.email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="d-flex justify-content-end w-100 mt-5">
              <button className="btn btn-dark rounded-0" onClick={submitData} disabled={loading}>
                Send Invitation
              </button>
            </div>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default InviteModal;

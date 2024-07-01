import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import "./modal.css";
import Avatar from "../../../../Assets/Images/Avatar.png";
import { FormContentWrapper } from "./modal.style";
import { useDispatch } from "react-redux";
import { getUserDetail, userUpdate } from "../../../../Redux/AuthSlice";
import { baseURL } from "../../../../axios/axios";

const customStyles = {
  content: {
    top: "50%",
    left: "60%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    width: "50%", // default width
  },
};

const UpdatedPersonalInfo = ({ personalInfoModalIsOpen, closeModal, user }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [userImage, setuserImage] = useState();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Handle the selected file here, e.g., upload it to the server or display it
    setuserImage(selectedFile);
  };
  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", userImage);
    formData.append("id", user._id);

    dispatch(userUpdate(formData)).then(() => {
      dispatch(getUserDetail(user._id));
      closeModal();
      setuserImage("");
      setLoading(false);
    });
  };

  return (
    <div>
      <Modal
        isOpen={personalInfoModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="personal info Modal"
      >
        <Box sx={{ padding: "40px" }}>
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
              variant="h2"
              sx={{ fontSize: "30px", fontWeight: "600", color: "#000" }}
            >
              Updated Profile
            </Typography>
          </Box>

          {/* user image */}

          <div className="d-flex justify-content-center">
            <div className="" style={{ width: "180px" }}>
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img
                  src={
                    !user?.image && !userImage
                      ? Avatar
                      : userImage
                      ? URL.createObjectURL(userImage)
                      : user?.image && !userImage
                      ? `${baseURL}images/${user.image}`
                      : ""
                  }
                  alt="no img"
                  style={{
                    cursor: "pointer",
                    width: "140px",
                    height: "140px",
                    borderRadius: "100%",
                  }}
                  onClick={handleUploadClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormContentWrapper>
              <Box sx={{ width: "400px" }}>
                <label className="input-label">Email</label>
                <input
                  // placeholder="Please Enter Email"
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input"
                  {...register("email", {
                    required: "Email is required.",
                  })}
                />
                {errors.email && (
                  <div className="text-danger mb-2">{errors.email.message}</div>
                )}
              </Box>
              <Box sx={{ width: "400px" }}>
                <label className="input-label">First Name</label>
                <input
                  // placeholder="Please Enter Fist Name"
                  type="text"
                  defaultValue={user?.firstName}
                  className="input"
                  {...register("firstName", {
                    required: "Name is required.",
                  })}
                />
                {errors.fistName && (
                  <div className="text-danger mb-2">
                    {errors.fistName.message}
                  </div>
                )}
              </Box>
            </FormContentWrapper>
            <FormContentWrapper>
              <Box sx={{ width: "400px" }}>
                <label className="input-label">Last Name</label>
                <input
                  // placeholder="Please Enter Last Name"
                  type="text"
                  className="input"
                  defaultValue={user?.lastName}
                  {...register("lastName", {
                    required: "Name is required.",
                  })}
                />
                {errors.lastName && (
                  <div className="text-danger mb-2">
                    {errors.lastName.message}
                  </div>
                )}
              </Box>
              <Box sx={{ width: "400px" }}>
                <label className="input-label">Password</label>
                <input
                  placeholder="Please Enter Password"
                  type="password"
                  className="input"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                />
                {errors.password && (
                  <div className="text-danger mb-2">
                    {errors.password.message}
                  </div>
                )}
              </Box>
            </FormContentWrapper>

            <Box sx={{ mt: "30px", textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: "#fff",
                  background: "#2457C5",
                  padding: "5px 30px",
                  "&:hover": {
                    background: "#2457C5",
                  },
                }}
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdatedPersonalInfo;

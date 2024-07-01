import React from "react";
import Logo from "../../Assets/Images/logoUpdate.png";
import { Box, Button, Grid } from "@mui/material";
import Lock from "../../Assets/Images/reseticon.png";
import Lottie from "lottie-react";
import resetLottie from "../../Assets/Lottie/reset.json";
import {
  ButtonTextWrapper,
  FormContentWrapper,
  FormSubTitle,
  FormTitleText,
  FromNavigateLinkWrapper,
  LogoWrapper,
  TextInputField,
} from "../../globalStyle/global.style";
import { useForm } from "react-hook-form";
import "../../globalcss/global.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Redux/AuthSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, userData } = useSelector((state) => state.user);


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm();

  const onSubmit = (data) => {
    if (data.newpassword === data.confirmpassword) {
      const newData = {
        id,
        ...data,
      };
      dispatch(resetPassword(newData)).then((res) => {
        if (res.error) {
          toast.error("Something wrong, please try again!");
        } else {
          toast.success("password updated successfully!", { duration: 1500 });
          navigate("/login");
        }
      });
    } else {
      toast.error("password and confirm password is not same", {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Grid container columnSpacing={{ lg: "120px", md: "30px", xs: "0px" }}>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Box
            sx={{
              background: "#EAEBEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Lottie
              animationData={resetLottie}
              loop={true}
              style={{ height: "50vh" }}
            />
          </Box>
          {/* <img src={Reset} style={{ height: "700px", minWidth: "650px" }} alt='' /> */}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={7}>
          <Box sx={{ padding: "0px 20px" }}>
            <img
              src={Logo}
              className="logo"
              alt=""
              style={{
                width: "118px",
                height: "89px",
                marginTop: "30px",
              }}
            />
            <FormContentWrapper>
              <Box sx={{ flexGrow: 1 }}>
                <FormTitleText className="text-black">
                  ENTER NEW PASSWORD
                </FormTitleText>
                <FormSubTitle className="text-black">
                  Your new password must be different to previously used
                  passwords.
                </FormSubTitle>

                <Box
                  sx={{ mt: "30px" }}
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="password"
                      id="outlined-basic"
                      label="Password"
                      variant="filled"
                      sx={{
                        marginTop: "48px",
                      }}
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      {...register("newpassword", {
                        required: "Password is required",
                      })}
                    />
                    {errors.newpassword && (
                      <Box sx={{ color: "red" }}>
                        {errors.newpassword.message}
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="password"
                      label="Confirm Password"
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      sx={{ marginTop: "10px" }}
                      {...register("confirmpassword", {
                        required: "Confirm Password is required",
                      })}
                    />
                    {errors.confirmpassword && (
                      <Box sx={{ color: "red" }}>
                        {errors.confirmpassword.message}
                      </Box>
                    )}
                  </Box>

                  <Box
                    sx={{
                      marginTop: "20px",
                      color: "white",
                      background: "#4472C4",
                      padding: "10px 10px",
                      width: "126px",
                      borderRadius: "8px",
                    }}
                  >
                    <Button type="submit">
                      <ButtonTextWrapper className="text-white">
                        {isLoading ? "Loading" : "Reset Password"}
                      </ButtonTextWrapper>
                      <img src={Lock} className="form-icon" alt="" />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </FormContentWrapper>
            Back To{" "}
            <Link
              to="/login"
              style={{
                color: "white",
                padding: "10px 10px",
                background: "black",
                borderRadius: "7px",
              }}
            >
              Sign in?
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;

import React, { useEffect } from "react";
import NewLogo from "../../Assets/Images/logoUpdate.png";
import { Grid, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import {
  ButtonTextWrapper,
  FormSubTitle,
  FormTitleText,
  FromNavigateLinkWrapper,
  TextInputField,
} from "../../globalStyle/global.style";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../../globalcss/global.css";
import { signInUser } from "../../Redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLogo from "../../Assets/Images/authScreen.png";
// import { getCompanyDetail } from "../../Redux/SenarioPlanningSlice";

const Login = () => {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // var company_id = JSON.parse(localStorage.getItem("company-data"));
  // console.log("🚀 ~ Login ~ company_id:", company_id)

  // useEffect(() => {
  //   const getData = async () => {
  //     if(company_id) await  dispatch(getCompanyDetail(company_id));
  //   };
  //   getData();
  // }, [company_id,dispatch]);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  //get user role

  const onSubmit = async (data) => {
    const response = await dispatch(signInUser(data));
    const userDetail = response.payload;

    if (userDetail?.success === true)  {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      if(userDetail?.Role?.title === "CFO"){
        navigate("/login-with-quickbook");
      }else if(userDetail?.Role?.title === "admin"){
        navigate("/CompanyDashboard/Companies");
      }else{
        navigate("/admindashboard/users");
      }

      
      
    }
  };


  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container columnSpacing={2} className="d-flex  justify-content-sm-center">

        {
          !isSmallScreen && (
            <Grid item xs={12} sm={5} md={5} lg={5}>
          <img
            src={AuthLogo}
            style={{ height: "100vh", width: "90%" }}
            alt=""
          />
        </Grid>
          )
        }
        

        <Grid item xs={12} sm={7} md={7} lg={7} className="mt-md-0 mt-5">
          <Box sx={{ padding: "0px 20px" }}>
            <img
              src={NewLogo}
              className="logo"
              alt=""
              style={{
                width: "118px",
                height: "89px",
                marginTop: "30px",
              }}
            />

            <Box sx={{ flexGrow: 1, marginTop: "15%" }}>
              <FormTitleText>Welcome to Smart CFO</FormTitleText>
              <FormSubTitle>Enter your Information to access more</FormSubTitle>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ py: "8px" }}>
                  <TextInputField
                    type="email"
                    label="Email"
                    id="outlined-basic"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    variant="filled"
                    sx={{
                      marginTop: "10px",
                      color: "#000000",
                      width: "75%",
                      "& input": {
                        fontSize: "16px",
                        fontWeight: "bold",
                        height: "40px",
                      },
                    }}
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <Box sx={{ color: "red" }}>{errors.email.message}</Box>
                  )}
                </Box>
                <Box sx={{ position: "relative" }}>
                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="password"
                      label="Password"
                      // defaultValue='First Name'
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      sx={{
                        marginTop: "10px",
                        color: "#000000",
                        width: "75%",
                        "& input": {
                          fontSize: "16px",
                          fontWeight: "bold",
                          height: "40px",
                        },
                      }}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <Box sx={{ color: "red" }}>{errors.password.message}</Box>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    textAlign: "end",
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    width: "75%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  <Box>
                    <Link
                      to="/forgotpassword"
                      style={{
                        textDecoration: "none",
                        color: "#4472C4",
                      }}
                    >
                      Forgotten Account ?
                    </Link>
                  </Box>
                  <Button type="submit" className="">
                    <ButtonTextWrapper
                      className=""
                      style={{
                        color: "white",
                        background: "#4472C4",
                        padding: "1px 10px",
                        borderRadius: "10px",
                      }}
                    >
                      {isLoading ? "Loading..." : "LOGIN"}
                    </ButtonTextWrapper>
                    {/* <img src={Signuplogo} className="form-icon" alt="" /> */}
                  </Button>
                </Box>
              </Box>
            </Box>

            <FromNavigateLinkWrapper>
              Don’t have account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "white",
                  padding: "10px 10px",
                  borderRadius: "10px",
                  background: "black",
                }}
              >
                Sign up
              </Link>
            </FromNavigateLinkWrapper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

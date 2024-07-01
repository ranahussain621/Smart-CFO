import React, { useEffect } from "react";
import Logo from "../../Assets/Images/logoUpdate.png";
import NewLogo from "../../Assets/Images/authScreen.png";
import {
  Grid,
  Button,
  Box,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Signuplogo from "../../Assets/Images/signup-logo.png";
import countries from "../../CountriesJson/countries";
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
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../Redux/AuthSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

const Signup = () => {
  const { message, userData, isLoading, token } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(signUpUser(data));
  };

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("access-token");
    if (token) {
      navigate("/");
    }
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid container spacing={2} className="d-flex align-items-center">
        {!isSmallScreen && (
          <Grid item xs={12} sm={5} md={5} lg={5}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <img
                src={NewLogo}
                style={{ height: "100vh", width: "100%" }}
                alt="Authentication Screen"
              />
            </Box>
          </Grid>
        )}

        <Grid item xs={12} sm={7} md={7} lg={7} className="mt-md-0 mt-5">
          <Box sx={{ padding: { xs: "0px 20px", sm: "0px 40px" } }}>
            <img
              src={Logo}
              className="logo"
              style={{
                width: "110px",
                height: "80px",
                marginTop: "0px",
                marginBottom: "20px",
              }}
              alt="Smart CFO Logo"
            />
            <FormContentWrapper>
              <Box sx={{ flexGrow: 1 }}>
                <FormTitleText sx={{ fontSize: { xs: "30px", md: "40px" } }}>
                  Welcome to Smart CFO
                </FormTitleText>
                <FormSubTitle>
                  Enter your Information to access more
                </FormSubTitle>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      py: "8px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <TextInputField
                        type="text"
                        label="First Name"
                        id="outlined-basic"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        variant="filled"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                      />
                      {errors.firstName && (
                        <Box sx={{ color: "red" }}>
                          {errors.firstName.message}
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <TextInputField
                        type="text"
                        label="Last Name"
                        id="outlined-basic"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        variant="filled"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                      />
                      {errors.lastName && (
                        <Box sx={{ color: "red" }}>
                          {errors.lastName.message}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="email"
                      label="Email"
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    {errors.email && (
                      <Box sx={{ color: "red" }}>{errors.email.message}</Box>
                    )}
                  </Box>
                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="password"
                      label="Password"
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <Box sx={{ color: "red" }}>{errors.password.message}</Box>
                    )}
                  </Box>
                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="text"
                      label="Company"
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      {...register("company", {
                        required: "Company is required",
                      })}
                    />
                    {errors.company && (
                      <Box sx={{ color: "red" }}>{errors.company.message}</Box>
                    )}
                  </Box>
                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      select
                      label="Country"
                      fullWidth
                      id="outlined-basic"
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      {...register("country", {
                        required: "Country is required",
                      })}
                    >
                      {countries?.countries?.map((option) => (
                        <MenuItem key={option.code} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextInputField>
                    {errors.country && (
                      <Box sx={{ color: "red" }}>{errors.country.message}</Box>
                    )}
                  </Box>
                  <Box sx={{ textAlign: "start" }}>
                    <Button type="submit">
                      <ButtonTextWrapper
                        style={{
                          color: "white",
                          background: "#4472C4",
                          padding: "0px 8px",
                          borderRadius: "10px",
                        }}
                      >
                        {isLoading ? "Loading..." : "Sign Up"}
                      </ButtonTextWrapper>
                    </Button>
                    <FromNavigateLinkWrapper
                      sx={{ textAlign: "start", paddingTop: "0px" }}
                    >
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        style={{
                          color: "white",
                          padding: "10px 10px",
                          borderRadius: "10px",
                          background: "black",
                          display: "inline-block",
                        }}
                      >
                        Sign in
                      </Link>
                    </FromNavigateLinkWrapper>
                  </Box>
                </Box>
              </Box>
            </FormContentWrapper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;

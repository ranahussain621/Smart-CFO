import React, { useEffect, useState } from "react";
import Sign from "../../Assets/Images/authScreen.png";
import Logo from "../../Assets/Images/SmartCFOLogo.png";
import { Grid, Button, Box, MenuItem, useMediaQuery } from "@mui/material";
import Signuplogo from "../../Assets/Images/signup-logo.png";
import {
  ButtonTextWrapper,
  FormContentWrapper,
  FormSubTitle,
  FormTitleText,
  FromNavigateLinkWrapper,
  LogoWrapper,
  TextInputField,
} from "../../globalStyle/global.style";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../Redux/AuthSlice";
import { invotedCFODetail } from "../../Redux/AdminSlice";
import { Link, useParams } from "react-router-dom";
import countries from "../../CountriesJson/countries";
import { useTheme } from "@mui/material/styles";

const SignupCompany = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const companyId = param.id;

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company_id: "",
    country: "USA",
    role: "CFO",
  });

  


  const [validationMessages, setValidationMessages] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });




  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(invotedCFODetail({ id: companyId }));
      const { companyName, email,company_id } = response.payload;
  //  localStorage.setItem('company-data',JSON.stringify(response?.payload))
      setSignupData((prevState) => ({
        ...prevState,
        company: companyName,
        email: email,
        company_id:company_id
      }));
    };
    getData();
  }, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidationMessages((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, password } = signupData;
    if (!firstName) {
      setValidationMessages((prevState) => ({
        ...prevState,
        firstName: "First Name is required",
      }));
      return;
    }
    if (!lastName) {
      setValidationMessages((prevState) => ({
        ...prevState,
        lastName: "Last Name is required",
      }));
      return;
    }
    if (!password) {
      setValidationMessages((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      return;
    }
  await dispatch(signUpUser(signupData)) 

  };



  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container spacing={2} className="d-flex align-items-center">
      {!isSmallScreen && (
      <Grid item xs={12} sm={5} md={5} lg={5}>
        <img src={Sign} style={{ height: "100vh", width: "100%" }} alt="" />
      </Grid>
    )}

        <Grid item xs={12} sm={7} md={7} lg={7} >
          <Box sx={{ padding: "0px 20px" }}>
            {/* <LogoWrapper>
              <img
                src={Logo}
                className="logo"
                alt=""
                style={{
                  width: "118px",
                  height: "89px",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              />
            </LogoWrapper> */}

            <FormContentWrapper>
              <Box sx={{ flexGrow: 1 }}>
                <FormTitleText>Welcome to Smart CFO</FormTitleText>
                <FormSubTitle>
                  Enter your Information to access more
                </FormSubTitle>

            
                  <Box
                  container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "45px",
                      py: "8px",
                    }}
                  >
                    <Box sx={{ width: "100%" }} item md={12}>
                      <TextInputField
                        type="text"
                        name="firstName"
                        label="First Name"
                        id="outlined-basic"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        variant="filled"
                        sx={{ marginTop: "10px" }}
                        style={{
                          padding: "10px",
                        }}
                        value={signupData.firstName}
                        onChange={handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {validationMessages.firstName}
                      </span>
                    </Box>
                    <Box sx={{ width: "100%" }} item md={12}>
                      <TextInputField
                        type="text"
                        name="lastName"
                        label="Last Name"
                        id="outlined-basic"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        variant="filled"
                        sx={{ marginTop: "10px" }}
                        value={signupData.lastName}
                        onChange={handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {validationMessages.lastName}
                      </span>
                    </Box>
                  </Box>

                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="email"
                      name="email"
                      label="Email"
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      sx={{ marginTop: "10px" }}
                      value={signupData.email}
                      readOnly
                    />
                  </Box>

                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="password"
                      name="password"
                      label="Password"
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      sx={{ marginTop: "10px" }}
                      value={signupData.password}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>
                      {validationMessages.password}
                    </span>
                  </Box>

                  <Box sx={{ py: "8px" }}>
                    <TextInputField
                      type="text"
                      name="company"
                      label="Company"
                      id="outlined-basic"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      sx={{ marginTop: "10px" }}
                      value={signupData.company}
                      readOnly
                    />
                  </Box>

                  <Box sx={{ py: "8px" }}>
  <TextInputField
    select
    label="Country"
    name="country" // Add name to handle change
    value={signupData.country} // Bind value to signupData.country
    fullWidth
    id="outlined-basic"
    InputProps={{ disableUnderline: true }}
    variant="filled"
    onChange={handleChange} // Add onChange to handle selection
  >
    {countries?.countries?.map((option) => (
      <MenuItem key={option.code} value={option.name}>
        {option.name}
      </MenuItem>
    ))}
  </TextInputField>
</Box>


                  <Box sx={{ textAlign: "end", marginTop: "20px" }}>
                    <Button onClick={submit}>
                      <ButtonTextWrapper>Sign Up</ButtonTextWrapper>
                      <img src={Signuplogo} className="form-icon" alt="" />
                    </Button>
                  </Box>
              
              </Box>
            </FormContentWrapper>

            <FromNavigateLinkWrapper>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#596CF7" }}>
                Sign in
              </Link>
            </FromNavigateLinkWrapper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignupCompany;

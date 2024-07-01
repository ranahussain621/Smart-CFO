import { Container, Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../axios/axios";
import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
import homeImage from "../../Assets/Images/dashboard.jpg";
import PropTypes from "prop-types";
import "./style.css";

import HomeBack from "../../Assets/Images/homeback.png";
import HomeSecond from "../../Assets/Images/aboutSection.jpeg";
import Ellipse1 from "../../Assets/Images/ellipseSection2.jpg";
import Ellipse2 from "../../Assets/Images/ellipe.webp";
import Ellipse3 from "../../Assets/Images/ellipe3.jpg";
import SectionHeader from "../../componant/steppers/SectionHeader";
import HomeSec1 from "../../Assets/Images/homesec1.png";
import Sec1 from "../../Assets/Images/sec1.png";
import Scalibility from "../../Assets/Images/scalability.png";
import HomeSec2 from "../../Assets/Images/homesec2.png";
import Sec2 from "../../Assets/Images/sec2.png";
import Report from "../../Assets/Images/report.png";
import Sec3 from "../../Assets/Images/Sec3.png";
import Expansion from "../../Assets/Images/Expansion.png";
import Sec4 from "../../Assets/Images/sec4.png";
import Cloud from "../../Assets/Images/Cloud.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [placeholder, setPlaceholder] = React.useState("Type Name");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const handleSubmit = () => {
  //   toast.success(
  //     "Your Email has been received! Someone will contact you soon."
  //   );
  // };
  const handleNavigation = () => {
    navigate("/services");
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = (str) => {
    setPlaceholder(str);
  };

  const handleNavigate2 = () => {
    navigate("/aboutus");
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [placeholders, setPlaceholders] = useState({
    name: "Type Name",
    phone: "000 0000 000",
    email: "Type Email Address",
    message: "Type your message here",
  });

  const handleFormSubmit = async () => {
    const { name, phone, email, message } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {};
    if (!name) {
      newErrors.name = "Please enter your full name.";
    }
    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    }
    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!message) {
      newErrors.message = "Please enter your message.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post(`${baseURL}query/add-Query`, {
          ...formData,
        });

        if (res.success === true) {
          toast.success(
            "Your Email has been received! Someone will contact you soon."
          );
        }
      } catch (e) {
        console.log(e);
      }
      toast.success(
        "Your Email has been received! Someone will contact you soon."
      );
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };
  return (
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          // position: "absolute",
          backgroundImage: `url(${HomeBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "130px",
          height: "750px",
        }}
      >
        {/* <img src={HomeBack} alt="hero" /> */}

        <Container>
          <Grid container className="flex  justify-between">
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Typography
                sx={{ fontWeight: "700", fontSize: "50px", color: "#4C4C4C" }}
              >
                <span
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "#dcb0ff",
                  }}
                  className="font-fam"
                >
                  Revolutionizing
                </span>{" "}
              </Typography>
              <Typography
                sx={{ fontWeight: "500", fontSize: "50px", color: "#4C4C4C" }}
                className="font-fam"
              >
                Financial Management
              </Typography>
              <Typography
                sx={{ fontWeight: "500", fontSize: "50px", color: "#4C4C4C" }}
                className="font-fam"
              >
                with{" "}
                <span
                  className="font-fam"
                  style={{
                    backgroundColor: "#928edb",
                    color: "white",
                    padding: "15px 15px",
                    borderRadius: "60px",
                  }}
                >
                  Intelligence
                </span>
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "20px",
                  color: "#2F2F2F",
                  textAlign: "justify",
                  lineHeight: "40px",
                }}
                className="my-md-4 font-fam"
              >
                Empowering Your Decision-Making with Advanced Analytics.
              </Typography>
              <button
                style={{
                  color: "white",
                  border: "0px",
                  padding: "20px 20px",
                  borderRadius: "60px",
                  background: "#53BC9E",
                  textTransform: "capitalize",
                  letterSpacing: 0.8,
                  fontSize: "18px",
                  fontWeight: 500,
                }}
                className="font-pop"
                onClick={handleNavigation}
              >
                <span>Discover Smart-CFO</span>{" "}
              </button>
              <button
                style={{
                  color: "white",
                  border: "0px",
                  padding: "20px 20px",
                  borderRadius: "60px",
                  background: "#928EDB",
                  textTransform: "capitalize",
                  letterSpacing: 0.8,
                  fontSize: "18px",
                  fontWeight: 500,
                  marginLeft: "40px",
                }}
                className="font-pop"
                onClick={handleNavigation}
              >
                <span>Watch Demo</span>{" "}
              </button>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{ display: "flex" }}
              className="text-end"
            >
              <img
                src={homeImage}
                alt=""
                className="image-responsiveOne ms-md-5 m"
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "5rem" }}>
            {/* <Grid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="d-flex justify-content-center text-center"
            >
              <Typography sx={{ fontSize: "3rem", fontWeight: "600" }}>
                Your advantage of choosing us as your financial planner tool
              </Typography>
            </Grid> */}
          </Grid>
        </Container>
      </div>

      <Box
        className="w-full flex flex-row mt-5 "
        style={{
          background: "white !important",
          backgroundColor: "white !important",
          marginBottom: "90px",
        }}
      >
        <Box className="w-50">
          <Box
            className="box-shadow p-12 mt-5"
            style={{
              width: "804px",
              height: "541px",
              borderRadius: "20px",
              position: "relative",
              zIndex: 10,
              background: "white",
              left: "15%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <h3
              className=" heading mb-3 font-fam"
              style={{
                color: "#4C4C4C",
              }}
            >
              Introducing Smart-CFO
            </h3>
            <p
              className=" paragraph font-fam"
              style={{
                color: "#2F2F2F",
              }}
            >
              At <b>Smart-CFO</b>, we're ushering in a new era of financial
              management. Our cutting-edge platform, driven by <b>AI and ML</b>{" "}
              technologies, turns complex financial data into actionable
              insights. Designed for today's businesses, <b>Smart-CFO</b>{" "}
              streamlines decision-making, boosts efficiency, and drives
              strategic growth.
            </p>
          </Box>
        </Box>
        <Box className="w-50">
          <Box
            style={{
              width: "804px",
              height: "541px",
            }}
          >
            <img
              src={HomeSecond}
              alt=""
              style={{
                height: "640px",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        className=" mt-4"
        style={{
          padding: "8rem",
          background: "#efeefa",
        }}
      >
        <Box className="w-full flex flex-row justify-center items-center">
          <Box
            style={{
              width: "65%",
            }}
          >
            <h3
              className="heading"
              style={{
                color: "#4C4C4C",
              }}
            >
              Features Products/Services
            </h3>
          </Box>
          <Box className="w-65">
            <hr />
          </Box>
        </Box>
        <Box className="w-full mt-24">
          <Box className="flex flex-row justify-evenly">
            <Box className="flex flex-col items-center">
              <img
                src={Ellipse1}
                alt=""
                style={{
                  borderRadius: "100px",
                  width: "195px",
                  height: "195px",
                }}
              />
              <h1 className="card-h font-fam text-center">
                AI and ML-Driven Analytics
              </h1>
              <p className="font-fam paragraph-card px-5 py-4 text-center">
                Harness the power of advanced analytics for predictive financial
                insights.
              </p>
            </Box>
            <Box className="flex flex-col items-center">
              <img
                src={Ellipse2}
                alt=""
                style={{
                  borderRadius: "100px",
                  width: "195px",
                  height: "195px",
                }}
              />
              <h1 className="card-h font-fam text-center">
                Real-Time Data Processing
              </h1>
              <p className="font-fam paragraph-card px-5 py-4 text-center">
                Make informed decisions quickly with real-time financial data.
              </p>
            </Box>
            <Box className="flex flex-col items-center">
              <img
                src={Ellipse3}
                alt=""
                style={{
                  borderRadius: "100px",
                  width: "195px",
                  height: "195px",
                }}
              />
              <h1 className="card-h font-fam text-center">
                Customizable Dashboards
              </h1>
              <p className="font-fam paragraph-card px-5 py-4 text-center">
                Tailor your financial view to meet your unique business needs.
              </p>
            </Box>
          </Box>
        </Box>
      </Box>

      <div
        style={{
          background: "#efeefb",
        }}
        className="mt-[100px] mb-12 flex flex-col items-center justify-center gap-[51px] self-stretch bg-deep_purple-300_26 px-14 py-[132px] md:p-5 sm:gap-[25px]"
      >
        <Heading size="xl" as="h2" className="mt-[7px] !text-black-900">
          Ready to Elevate Your Financial Management?
        </Heading>
        <Buttons
          color="black_900"
          shape="round"
          className="min-w-[430px] font-poppins font-medium sm:px-5"
          style={{
            padding: "35px 49px",
            borderRadius: "32px",
          }}
          onClick={() => handleNavigation()}
        >
          Start Your Journey with Smart-CFO
        </Buttons>
      </div>
      <div className="flex md:flex-col self-end items-center w-full  mx-auto md:p-5 mb-6 max-w-[1610px]">
        <div className="flex flex-col items-start justify-center w-[46%] md:w-full pl-[99px] pr-14 gap-[66px] py-[99px] md:p-5 sm:gap-[33px] z-[1] bg-white-A700 shadow-sm rounded-[25px]">
          <Heading as="h2" className="mt-[17px] !text-gray-800_01">
            Toronto, Ontario, Canada
          </Heading>
          <Heading as="h3" className="!text-gray-800_01">
            647-355-5234
          </Heading>
          <Heading as="h4" className="!text-gray-800_01">
            enquiry@poko-tech.com
          </Heading>
          <Heading as="h5" className="!text-gray-800_01">
            205 Grandview Way, North York, ON, M2N 6V3
          </Heading>
        </div>
        <div className="flex flex-col items-start justify-center md:self-stretch ml-[-105px] pl-[73px] pr-14 py-[73px] md:ml-0 md:p-5 relative bg-light_blue-50 flex-1">
          <div className="flex flex-col items-start ml-[111px] gap-[9px] md:ml-0 border-gray-500 border-b-[0.5px] border-solid">
            <Text size="6xl" as="p" className="!text-gray-700 !font-medium">
              Full Name*
            </Text>
            {/* <Heading as="h6" className="!text-gray-800_01 w-full">
              Type name
            </Heading> */}

            <input
              as="h6"
              className="!text-gray-800_01 font-fam borderbox"
              placeholder={placeholder}
              style={{
                border: "none",
                fontSize: "30px",
                background: "#E6F8FE",
                fontWeight: "700",
              }}
              onFocus={handleFocus}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onBlur={() => handleBlur("Type Name")}
            ></input>
          </div>
          {errors?.name && (
            <Typography
              variant="body2"
              sx={{ color: "red", display: "flex", marginLeft: "110px" }}
            >
              {errors?.name}
            </Typography>
          )}
          <Text
            size="6xl"
            as="p"
            className="mt-[52px] ml-[111px] md:ml-0 !text-gray-700 !font-medium"
          >
            Phone*
          </Text>
          {/* <Heading
            as="h3"
            className="mt-1.5 ml-[111px] md:ml-0 !text-gray-800_01"
          >
            000 0000 000
          </Heading> */}

          <input
            as="h3"
            className=" ml-[111px] md:ml-0 !text-gray-800_01 font-fam borderbox custom-input"
            placeholder="000 0000 000"
            style={{
              border: "none",
              fontSize: "30px",
              background: "#E6F8FE",
              fontWeight: "700",
            }}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          ></input>
          <div className="self-center h-px w-[70%] mt-3.5 bg-gray-500" />
          {errors?.phone && (
            <Typography
              variant="body2"
              sx={{ color: "red", display: "flex", marginLeft: "110px" }}
            >
              {errors?.phone}
            </Typography>
          )}
          <Text
            size="6xl"
            as="p"
            className="mt-10 ml-[111px] md:ml-0 !text-gray-700 !font-medium"
          >
            Email Address*
          </Text>
          {/* <Heading
            as="h3"
            className="mt-[9px] ml-[111px] md:ml-0 !text-gray-800_01"
          >
            Type Email Address
          </Heading> */}
          <input
            as="h3"
            className=" ml-[111px] md:ml-0 !text-gray-800_01 font-fam borderbox custom-input"
            placeholder="Type Email Address"
            style={{
              border: "none",
              fontSize: "30px",
              background: "#E6F8FE",
              fontWeight: "700",
            }}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          <div className="self-center h-px w-[74%] mt-[11px] bg-gray-500" />
          {errors?.email && (
            <Typography
              variant="body2"
              sx={{ color: "red", display: "flex", marginLeft: "110px" }}
            >
              {errors.email}
            </Typography>
          )}
          <Text
            size="6xl"
            as="p"
            className="mt-[42px] ml-[111px] md:ml-0 !text-gray-700 !font-medium"
          >
            Message*
          </Text>
          {/* <Heading
            as="h3"
            className="mt-[7px] ml-[111px] md:ml-0 !text-gray-800_01"
          >
            Type your message here
          </Heading> */}
          <input
            as="h3"
            className=" ml-[111px] md:ml-0 !text-gray-800_01 font-fam borderbox custom-input"
            placeholder="Type your message here"
            style={{
              border: "none",
              fontSize: "30px",
              background: "#E6F8FE",
              fontWeight: "700",
            }}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          ></input>
          <div className="self-center h-px w-[74%] mt-[11px] bg-gray-500" />
          {errors?.message && (
            <Typography
              variant="body2"
              sx={{ color: "red", display: "flex", marginLeft: "110px" }}
            >
              {errors.message}
            </Typography>
          )}
          <Buttons
            color="black_900"
            size="xl"
            className="mt-[50px] mb-[5px] ml-[111px] md:ml-0 sm:px-5 font-poppins font-medium min-w-[213px] rounded-[43px]"
            onClick={handleFormSubmit}
          >
            Contact Us
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default Home;

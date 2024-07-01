import React, { useEffect } from "react";
import "./Aboutus.css";
import { Typography, Grid, Container, Button, Box } from "@mui/material";
import HomeBack from "../../Assets/Images/homeback.png";
import homeImage from "../../Assets/Images/headerImage.png";

import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
import Report from "../../Assets/Images/img_image_372_1.png";
import Ellipse1 from "../../Assets/Images/buisness.png";
import Ellipse2 from "../../Assets/Images/CEO.png";
import Ellipse3 from "../../Assets/Images/marketing.png";
import { useNavigate } from "react-router-dom";

const Aboutus = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = () => {
    navigate("/contactus");
  };

  const handleNavigation2 = () => {
    navigate("/services");
  };
  return (
    <>
      <div
        style={{
          // position: "absolute",
          backgroundImage: `url(${HomeBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "90px",
          overflowX: "hidden !important",
        }}
      >
        {/* <img src={HomeBack} alt="hero" /> */}

        <Container
          style={{
            paddingTop: "30px",
            paddingBottom: "15px",
          }}
        >
          <Grid container className="d-flex align-items-center " id="cfo">
            <Grid xs={12} sm={12} md={6} lg={6}>
              <button
                className="font-fam"
                style={{
                  color: "white",
                  border: "0px",
                  padding: "20px 20px",
                  borderRadius: "15px",
                  background: "#928EDB",
                  textTransform: "capitalize",
                  letterSpacing: 0.8,
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                <span>About Smart CFO</span>{" "}
              </button>
              <Typography
                sx={{ fontWeight: "700", fontSize: "50px" }}
                className="font-fam"
              >
                Pioneering Financial Analytics
              </Typography>
              <p className="sec-para font-fam mb-5">
                Welcome to Smart-CFO, where innovation meets financial
                management. As a forward-thinking software company, we
                specialize in developing cutting-edge financial analytics tools
                that empower businesses to make smarter decisions.
              </p>
              <button
                className="font-fam"
                style={{
                  color: "white",
                  border: "0px",
                  padding: "20px 20px",
                  borderRadius: "60px",
                  background: "#53BC9E",
                  textTransform: "capitalize",
                  letterSpacing: 0.8,
                  fontSize: "22px",
                  fontWeight: 500,
                }}
                onClick={() => handleNavigation()}
              >
                <span>Contact us for a personalized demo</span>{" "}
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
                className="image-responsivetwo ms-md-5"
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

        <div
          id="ourMission"
          className="flex md:flex-col flex-row-reverse self-stretch justify-between items-center w-full mt-[50px] gap-5 p-[140px] mx-auto md:p-5 bg-gradient max-w-[1721px]"
        >
          <div className="flex flex-col items-start w-[50%] md:w-full ml-[34px] gap-[38px] md:ml-0">
            <Heading size="md" as="h2" className="font-fam switch-heading">
              Our Mission
            </Heading>
            <Text
              size="6xl"
              as="p"
              className="text-justify leading-10 font-fam sec-para"
            >
              Our mission is to revolutionize the way companies interact with
              their financial data. Through the integration of advanced AI and
              ML technologies, Smart-CFO brings unparalleled clarity,
              efficiency, and insight to financial management processes.
            </Text>
          </div>
          <div className="flex md:flex-col items-center w-[50%] md:w-full mt-[-13px]  md:p-5 md:ml-0 z-[1] relative">
            <Img
              src="images/img_group_1000002294_deep_purple_300_01.svg"
              alt="image_five"
              className="self-end h-[128px] md:w-full mb-[151px] z-[1]"
            />
            <Img
              src="images/img_image_372_490x650.png"
              alt="image372_one"
              className="w-[92%] md:w-full ml-[-38px] md:ml-0 relative object-cover rounded-[30px]"
            />
          </div>
        </div>
      </div>

      <div
        id="vision"
        className="flex md:flex-col  self-stretch justify-between items-center gap-5 w-full  bg-[url(/public/images/homesec2.png)] bg-cover bg-no-repeat   p-[140px] mx-auto md:p-5  max-w-[1721px]"
      >
        <div className="flex flex-col items-start w-[50%] md:w-full ml-[34px] gap-[38px] md:ml-0">
          <Heading
            size="md"
            as="h2"
            className="font-fam "
            style={{
              fontWeight: "700",
              fontSize: "40px",
              lineHeight: "60px",
            }}
          >
            Vision
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="text-justify leading-10 font-fam sec-para"
          >
            We envision a world where financial decision-making is not just
            about looking at numbers but understanding the story they tell. Our
            vision is to be the leading force in transforming financial
            analytics, making it more intuitive, predictive, and accessible for
            businesses of all sizes.
          </Text>
        </div>
        <div className="flex md:flex-col items-center w-[50%] md:w-full mt-[-13px]  md:p-5 md:ml-0 z-[1] relative">
          <Img
            src="images/img_group_1000002294_deep_purple_300_01.svg"
            alt="image_five"
            className="self-end h-[128px] md:w-full mb-[151px] z-[1]"
          />
          <Img
            src={Report}
            alt="image372_one"
            className="w-[92%] md:w-full ml-[-18px]  md:ml-0 relative object-cover rounded-[30px]"
          />
        </div>
      </div>

      <div className="flex flex-col items-start" id="team">
        <div className="self-stretch">
          <div
            className="flex flex-col items-center gap-[41px] px-14 py-[118px] md:p-5 z-[1] bg-[url(/public/images/Vector.png)] bg-cover bg-no-repeat "
            style={{
              paddingBottom: "0px",
            }}
          >
            <Buttons
              size="sm"
              className="sm:px-5 font-bold min-w-[144px] rounded-[10px] font-fam"
            >
              Our Team
            </Buttons>
            <Heading
              size="md"
              as="h2"
              className="text-center switch-heading font-fam "
              style={{
                width: "100%",
              }}
            >
              The Brains Behind Smart-CFO
            </Heading>
            <Text
              size="6xl"
              as="p"
              className="w-[55%] md:w-full text-center leading-10 font-fam sec-para"
            >
              <>
                Meet the passionate individuals behind Smart-CFO. Our team
                comprises seasoned
                <br />
                professionals, innovative thinkers, and tech enthusiasts
                dedicated to redefining financial management.
              </>
            </Text>
          </div>
          <Box
            style={{
              padding: "8rem",
              paddingBottom: "0px",
            }}
          >
            <Box className="w-full ">
              <Box className="flex flex-row justify-between">
                {/* <Box className="w-33 flex flex-col items-center">
                  <img
                    src={Ellipse1}
                    alt=""
                    style={{
                      width: "373px",
                      height: "482px",
                    }}
                  />
                  <h1 className="card-h font-fam mt-5 mb-2 text-center">
                    Cody Legge, Marketing Specialist:
                  </h1>
                  <p className="font-fam paragraph-card px-5">
                    A marketing specialist with a passion for driving brand
                    growth and enhancing customer engagement. With a background
                    in digital marketing, Cody brings extensive experience in
                    developing strategic campaigns tailored to diverse
                    audiences.
                  </p>
                </Box> */}
                <Box className=" w-full flex flex-col items-center  ">
                  <img
                    src={Ellipse2}
                    alt=""
                    style={{
                      width: "373px",
                      height: "482px",
                    }}
                  />
                  <h1 className="card-h font-fam mt-5 mb-5 text-center">
                    Johnson Li, CEO and Founder
                  </h1>
                  <p className="font-fam paragraph-card px-5">
                    A visionary leader with a passion for finance and
                    technology. With a Diploma in Finance from the Chinese
                    University of Hong Kong, Johnson has over three decades of
                    experience in finance and manufacturing management. Before
                    founding Smart-CFO, he managed financial operations at Chi
                    Wo Plastic Moulds Fty Ltd.
                  </p>
                </Box>
                {/* <Box className=" w-33 flex flex-col items-center ">
                  <img
                    src={Ellipse3}
                    alt=""
                    style={{
                      width: "373px",
                      height: "482px",
                    }}
                  />
                  <h1 className="card-h font-fam mt-5 text-center">
                    Keri Hynes, Business Development Manager
                  </h1>
                  <p className="font-fam paragraph-card px-5">
                    An accomplished business development manager renowned for
                    strategic insight in generating new growth opportunities and
                    building robust partnerships. Keri’s expertise covers
                    strategic planning, partner management, and market
                    penetration.
                  </p>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </div>
        <div
          className="self-stretch mt-[194px] px-14 py-16 md:p-5 bg-[url(/public/images/Vector1.png)] bg-cover bg-no-repeat"
          id="culture"
        >
          <div className="flex md:flex-col justify-between items-center w-full gap-5 mx-auto max-w-[1338px]">
            <div className="flex flex-col items-start w-[56%] md:w-full gap-[42px]">
              <Buttons
                size="sm"
                className="sm:px-5 font-bold min-w-[272px] rounded-[10px] font-fam"
                onClick={handleNavigation2}
              >
                Our Values and Culture
              </Buttons>
              <Heading size="md" as="h2" className="font-fam switch-heading">
                What Drives Us
              </Heading>
              <Text
                size="6xl"
                as="p"
                className="text-justify leading-10 font-fam"
              >
                - Innovation: &quot;At the heart of Smart-CFO is a constant
                quest for innovation – creating solutions that are not just
                effective but revolutionary..&quot;
              </Text>
              <Text
                size="6xl"
                as="p"
                className="text-justify leading-10 font-fam"
              >
                - Customer-Centricity: &quot;Our customers are our top priority.
                We believe in building tools that solve real problems and
                contribute to their success.&quot;
              </Text>
              <Text
                size="6xl"
                as="p"
                className="text-justify leading-10 font-fam"
              >
                - Sustainability and Integrity: &quot;We are committed to
                sustainable business practices and uphold the highest standards
                of integrity in all our operations.&quot;
              </Text>
            </div>
            <Img
              src="images/values.jpg"
              alt="image372_five"
              className="w-[36%] md:w-full object-cover rounded-[30px]"
            />
          </div>
        </div>
        <Buttons
          size="sm"
          className="mt-[126px] ml-[204px] md:ml-0 font-bold min-w-[166px] rounded-[10px] font-fam"
          onClick={handleNavigation2}
        >
          Our Journey
        </Buttons>
        <Heading
          size="md"
          as="h2"
          className="mt-[38px] ml-[204px] md:ml-0 font-fam w-full mb-5"
        >
          Milestones and Achievements:
        </Heading>

        <div className="timeline  w-full">
          <div className="contain left">
            <i></i>
            <div className="content">
              <Heading
                as="h2"
                className="w-[64%] !text-gray-800_01 text-right !font-bold leading-[157%] switch-heading"
              >
                <span className="text-gray-800_01 font-extrabold font-fam">
                  <>
                    Founded in 2024:
                    <br />
                  </>
                </span>
                <span className="text-gray-800_01 font-normal font-fam">
                  Birth of an idea.
                </span>
              </Heading>
            </div>
          </div>
          <div className="contain right">
            <i></i>
            <div className="content">
              <Heading
                as="h2"
                className="w-[70%] sm:w-full !text-gray-800_01 !font-bold leading-[157%] switch-heading"
              >
                <span className="text-gray-800_01 font-extrabold font-fam">
                  <>
                    Launch of MVP in 2024:
                    <br />
                  </>
                </span>
                <span className="text-gray-800_01 font-normal font-fam">
                  Stepping into the market.
                </span>
              </Heading>
            </div>
          </div>
          <div className="contain left">
            <i className=" "></i>
            <div className="content">
              <Heading
                as="h2"
                className="w-[77%] sm:w-full !text-gray-800_01 text-right !font-bold leading-[157%] switch-heading"
              >
                <span className="text-gray-800_01 font-extrabold font-fam">
                  <>
                    Partnerships and Collaborations:
                    <br />
                  </>
                </span>
                <span className="text-gray-800_01 font-normal font-fam">
                  Expanding our horizons.
                </span>
              </Heading>
            </div>
          </div>
          <div className="contain right">
            <i></i>
            <div className="content">
              <Heading
                as="h2"
                className="w-[71%] sm:w-full mt-1 !text-gray-800_01 !font-bold leading-[157%] switch-heading"
              >
                <span className="text-gray-800_01 font-extrabold font-fam">
                  Awards and Recognition
                </span>
                <span className="text-gray-800_01">
                  <>
                    :<br />
                  </>
                </span>
                <span className="text-gray-800_01 font-normal font-fam">
                  Celebrating our successes.
                </span>
              </Heading>
            </div>
          </div>
          <div className="contain left">
            <i></i>
            <div className="content">
              <Heading
                as="h2"
                className="w-[77%] sm:w-full !text-gray-800_01 text-right !font-bold leading-[157%] switch-heading"
              >
                <span className="text-gray-800_01 font-extrabold font-fam">
                  <>
                    Future Goals:
                    <br />
                  </>
                </span>
                <span className="text-gray-800_01 font-normal font-fam">
                  Continuously innovating and expanding our reach.
                </span>
              </Heading>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full mt-[253px] mb-[120px] gap-[34px] mx-auto md:p-5 max-w-[1154px]">
          <Heading size="md" as="h2" className="font-fam">
            Closing Statement:
          </Heading>
          <Text size="6xl" as="p" className="leading-10 font-fam">
            At Smart-CFO, we are more than a software company – we are a team
            committed to empowering businesses with the tools they need to
            succeed in today's dynamic financial landscape. Join us on this
            journey of innovation and excellence."
          </Text>
        </div>
      </div>
    </>
  );
};

export default Aboutus;

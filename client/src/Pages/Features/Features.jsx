import { Container, Grid, Box, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
import homeImage from "../../Assets/Images/groupHero.png";
import PropTypes from "prop-types";
import HomeBack from "../../Assets/Images/homeback.png";
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
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const Features = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [placeholder, setPlaceholder] = React.useState("Type Name");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    toast.success(
      "Your Email has been received! Someone will contact you soon."
    );
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = (str) => {
    setPlaceholder(str);
  };

  const handleNavigation = () => {
    navigate("/services");
    // toast.success(
    //   "Your Email has been received! Someone will contact you soon."
    // );
  };

  return (
    <>
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

        <Container id="revolution">
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
                  Revolutionising
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
                Emphasizing its mission to transform financial analytics through
                AI and ML technologies.
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
      </div>

      <SectionHeader
        homeImage={HomeSec1}
        direction={"row-reverse"}
        headingImage={Scalibility}
        heading={"Global Scalibility"}
        paragraph={
          <>
            Smart-CFO’s agile software enables global finance and company
            executives to customize the KPIs according to their company’s
            strategy, target customer profile, product, financial objects, and
            others. Data visualization of KPIs on key financial metrics.
          </>
        }
        sideImage={Sec1}
        id={"global"}
      />

      <SectionHeader
        homeImage={HomeSec2}
        direction={"row"}
        headingImage={Report}
        heading={"Report"}
        paragraph={
          <>
            Smart-CFO utilises tools to interface with different enterprise
            solutions to collect, compile and analyse unstructured real-time
            data from different business units to report up-to-date top
            management reports, dashboard charts and balance scorecards.
          </>
        }
        sideImage={Sec2}
        id={"report"}
      />

      <SectionHeader
        homeImage={HomeSec1}
        direction={"row-reverse"}
        headingImage={Expansion}
        heading={"Real Time Data Exploration"}
        paragraph={
          <>
            To offer executive decision-makers with real time, intelligent
            financial analytics and empower enterprises with an effective
            technology for accurately analysing their financial performance
            based on key performance indicator (KPI) and a Balance Sorecard.
          </>
        }
        sideImage={Sec3}
      />

      <SectionHeader
        homeImage={HomeSec2}
        direction={"row"}
        headingImage={Cloud}
        heading={"Report"}
        paragraph={
          <>
            Smart-CFO Cloud empowers smarter, insight driven decisions with fast
            and flexible analytics.
          </>
        }
        sideImage={Sec4}
      />

      <div className="w-full bg-white-A700">
        <div className="flex flex-col items-center">
          <div className="flex self-stretch justify-center items-end h-[913px] md:h-auto mt-[-1px] p-[30px] sm:p-5 z-[1] relative bg-[url(/public/images/img_group_403.png)] bg-cover bg-no-repeat">
            <div className="flex flex-col w-[89%] md:w-full mt-[85px] gap-[77px] md:gap-[57px] sm:gap-[38px]">
              <Heading
                size="md"
                as="h2"
                className="w-[40%] md:w-full !text-gray-800 !font-semibold leading-[157%]"
              >
                Read our latest posted blog about financial planning
              </Heading>
              <div className="flex md:flex-col justify-between items-center gap-5">
                <Img
                  src="images/img_rectangle_6058.png"
                  alt="image_seven"
                  className="w-[40%] md:w-full object-cover rounded-[30px]"
                />
                <div className="flex flex-col w-[56%] md:w-full gap-6">
                  <div className="flex flex-col gap-[26px]">
                    <div className="flex md:flex-col justify-between items-center gap-5">
                      <div className="flex flex-col items-start w-[65%] md:w-full gap-4">
                        <div className="flex self-stretch justify-between items-center gap-5 flex-wrap">
                          <Heading as="h3" className="!text-gray-800_01">
                            Commodities
                          </Heading>
                          <Text
                            size="4xl"
                            as="p"
                            className="self-end mb-[5px] !text-gray-800_01 text-right"
                          >
                            Feb 12, 2023
                          </Text>
                        </div>
                        <Text size="6xl" as="p" className="leading-[150%]">
                          Good buckles under pressure from strong dollar,
                          looming rates hikes
                        </Text>
                        <Heading
                          size="xs"
                          as="h4"
                          className="!text-deep_purple-300_01 !font-semibold"
                        >
                          Read Blog
                        </Heading>
                      </div>
                      <Img
                        src="images/img_rectangle_6059.png"
                        alt="image_eight"
                        className="w-[28%] md:w-full object-cover rounded-[15px]"
                      />
                    </div>
                    <div className="h-px opacity-0.5 rotate-[-180deg] bg-black-900_87" />
                  </div>
                  <div className="flex md:flex-col justify-between items-start gap-5">
                    <div className="flex flex-col items-start w-[65%] md:w-full mt-[9px]">
                      <div className="flex self-stretch justify-between items-start gap-5">
                        <div className="flex flex-col items-start w-[36%]">
                          <div className="h-[28px] w-[67%] z-[1] border-white-A700_66 " />
                          <Heading
                            as="h5"
                            className="mt-[-19px] !text-gray-800_01 relative"
                          >
                            Commodities
                          </Heading>
                        </div>
                        <Text
                          size="4xl"
                          as="p"
                          className="mt-2 !text-gray-800_01 text-right"
                        >
                          Feb 12, 2023
                        </Text>
                      </div>
                      <Text
                        size="6xl"
                        as="p"
                        className="mt-[5px] leading-[150%]"
                      >
                        Good buckles under pressure from strong dollar, looming
                        rates hikes
                      </Text>
                      <Heading
                        size="xs"
                        as="h6"
                        className="mt-[17px] !text-deep_purple-300_01 !font-semibold"
                      >
                        Read Blog
                      </Heading>
                    </div>
                    <Img
                      src="images/img_rectangle_6060.png"
                      alt="image_nine"
                      className="w-[28%] md:w-full object-cover rounded-[20px]"
                    />
                  </div>
                  <div className="h-px opacity-0.5 rotate-[-180deg] bg-black-900_87" />
                  <div className="flex md:flex-col justify-between items-center gap-5">
                    <div className="flex flex-col items-start w-[65%] md:w-full">
                      <div className="h-[28px] w-[24%] border-white-A700_66 " />
                      <div className="flex self-stretch justify-between items-start mt-[19px] gap-5 flex-wrap">
                        <Heading as="h3" className="!text-gray-800_01">
                          Commodities
                        </Heading>
                        <Text
                          size="4xl"
                          as="p"
                          className="!text-gray-800_01 text-right"
                        >
                          Feb 12, 2023
                        </Text>
                      </div>
                      <Text
                        size="6xl"
                        as="p"
                        className="mt-[5px] leading-[150%]"
                      >
                        Good buckles under pressure from strong dollar, looming
                        rates hikes
                      </Text>
                      <Heading
                        size="xs"
                        as="h5"
                        className="mt-[17px] !text-deep_purple-300_01 !font-semibold"
                      >
                        Read Blog
                      </Heading>
                    </div>
                    <Img
                      src="images/img_rectangle_6061.png"
                      alt="image_ten"
                      className="self-end w-[28%] md:w-full mb-[15px] object-cover rounded-[20px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-32">
        <Accordion className="mb-2">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 className="sec-heading">What is Smart CFO?</h3>
          </AccordionSummary>
          <AccordionDetails>
            Smart-CFO is an advanced financial analytics and reporting software
            that integrates AI and ML technologies to provide real-time insights
            and predictive analytics for your business’s financial management.
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-2">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 className="sec-heading">
              Who can benefit from using Smart-CFO?
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            Smart-CFO is an advanced financial analytics and reporting software
            that integrates AI and ML technologies to provide real-time insights
            and predictive analytics for your business’s financial management.
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-2">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 className="sec-heading">
              How does Smart-CFO integrate with existing systems?
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            Smart-CFO is an advanced financial analytics and reporting software
            that integrates AI and ML technologies to provide real-time insights
            and predictive analytics for your business’s financial management.
          </AccordionDetails>
        </Accordion>

        <Accordion className="mb-2">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 className="sec-heading">Is my data secure with Smart-CFO?</h3>
          </AccordionSummary>
          <AccordionDetails>
            Smart-CFO is an advanced financial analytics and reporting software
            that integrates AI and ML technologies to provide real-time insights
            and predictive analytics for your business’s financial management.
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-2">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 className="sec-heading">
              Can I customize the dashboard according to my needs?
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            Smart-CFO is an advanced financial analytics and reporting software
            that integrates AI and ML technologies to provide real-time insights
            and predictive analytics for your business’s financial management.
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="flex md:flex-col self-end items-center w-full  mx-auto md:p-5 max-w-[1610px]">
        <div className="flex flex-col items-start justify-center w-[46%] md:w-full pl-[99px] pr-14 gap-[66px] py-[99px] md:p-5 sm:gap-[33px] z-[1] bg-white-A700 shadow-sm rounded-[25px]">
          <Heading as="h2" className="mt-[17px] !text-gray-800_01">
            Toronto, Ontario, Canada
          </Heading>
          <Heading as="h3" className="!text-gray-800_01">
            +1-6473555234
          </Heading>
          <Heading as="h4" className="!text-gray-800_01">
            enquiry@smartcfo.com
          </Heading>
          <Heading as="h5" className="!text-gray-800_01">
            Link for Map of the location
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
              onBlur={() => handleBlur("Type Name")}
            ></input>
          </div>
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
          ></input>
          <div className="self-center h-px w-[74%] mt-3.5 bg-gray-500" />
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
          ></input>
          <div className="self-center h-px w-[74%] mt-[11px] bg-gray-500" />
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
          ></input>
          <div className="self-center h-px w-[74%] mt-[11px] bg-gray-500" />
          <Buttons
            color="black_900"
            size="xl"
            className="mt-[50px] mb-[5px] ml-[111px] md:ml-0 sm:px-5 font-poppins font-medium min-w-[213px] rounded-[43px]"
            onClick={handleSubmit}
          >
            Contact Us
          </Buttons>
        </div>
      </div>
      <div className="h-[740px] w-full mt-[206px] mx-auto md:p-5 relative max-w-[1534px] mb-5">
        <div className="flex flex-col w-[92%] left-[0.00px] top-[0.00px] m-auto absolute">
          <Img
            src="images/img_left_673feadcc7_deep_purple_300_01.svg"
            alt="left673feadccse"
            className="h-[168px] ml-[29px] md:ml-0 z-[1]"
            style={{
              marginRight: "78%",
            }}
          />
          <div className="flex md:flex-col items-center mt-[-128px] relative">
            <Img
              src="images/img_button_left_a_white_a700.svg"
              alt="buttonlefta_one"
              className="self-end h-[153px] w-[153px] md:w-full mb-[226px] z-[1]"
            />
            <div className="flex flex-col items-center md:self-stretch ml-[-34px] p-12 md:ml-0 md:p-5 relative bg-white-A700 shadow-sm flex-1 rounded-[25px]">
              <Heading
                size="md"
                as="h2"
                className="mt-[9px] !text-gray-800 tracking-[-1.60px] text-center"
              >
                What Our Customers Have to Say
              </Heading>
              <Img
                src="images/img_richard_tubb_f5.png"
                alt="richardtubbffiv"
                className="h-[112px] w-[112px] mt-[9px] rounded-[50%]"
              />
              <Text
                size="8xl"
                as="p"
                className="mt-[3px] !text-gray-800 tracking-[-0.52px] text-center"
              >
                Richard Tubb
              </Text>
              <Text
                size="3xl"
                as="p"
                className="mt-[13px] !text-deep_purple-300_01 tracking-[-0.36px] text-center !text-[17.72px]"
              >
                IT Consultant/Owner
              </Text>
              <Text
                size="7xl"
                as="p"
                className="w-[96%] md:w-full mt-4 !text-gray-800 tracking-[-0.44px] text-center !text-[21.66px] leading-10"
              >
                &quot;We looked at a number of checklist/workflow tools, but
                Manifestly was the easiest to deploy and hit the ground using.
                We&#39;ve found the Manifestly team to be great partners.”
              </Text>
              <Img
                src="images/img_richard_tubb_lo.png"
                alt="richardtubblo"
                className="w-[43%] mt-4 object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-[14%] gap-[98px] bottom-[0.00px] right-[0.00px] m-auto md:gap-[73px] sm:gap-[49px] absolute">
          <Img
            src="images/img_button_right_white_a700.svg"
            alt="buttonright_one"
            className="self-end h-[153px] w-[154px]"
          />
          <Img
            src="images/img_left_673feadcc7_deep_purple_300_01.svg"
            alt="right0252fd91f"
            className="h-[168px]"
          />
        </div>
      </div>
    </>
  );
};

export default Features;

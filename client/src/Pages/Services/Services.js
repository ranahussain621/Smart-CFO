import React, { useEffect, useState } from "react";
import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ServicesPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [placeholder, setPlaceholder] = useState("Type Name");

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = (str) => {
    setPlaceholder(str);
  };

  const handleNavigation = () => {
    navigate("/features");
  };

  const handleSubmit = () => {
    toast.success(
      "Your Email has been received! Someone will contact you soon."
    );
  };
  const handleContact = () => {
    navigate("/contactus");
  };
  return (
    <>
      <div className="w-full bg-white-A700">
        <div>
          <div className="h-[1819px] md:h-auto relative">
            <div className="flex flex-col items-start w-full">
              <div className="flex md:flex-col items-start w-[94%] md:w-full md:p-5 z-[1]">
                <div className="flex flex-col items-end md:self-stretch h-[1077px] md:h-auto pl-14 pr-[143px] py-[143px] md:p-5 bg-[url(/public/images/img_group_396.png)] bg-cover bg-no-repeat flex-1">
                  <div className="flex flex-col items-start w-[80%] md:w-full mb-[214px] mr-[11px] md:mr-0">
                    <Buttons
                      size="sm"
                      className="sm:px-5 font-bold min-w-[177px] rounded-[10px] btn-head font-fam"
                      onClick={() => handleNavigation()}
                    >
                      Our Solutions
                    </Buttons>
                    <Heading
                      size="xl"
                      as="h1"
                      className="w-[97%] md:w-full mt-[33px] leading-[60px] para-heading font-fam"
                    >
                      <>
                        Transforming Financial
                        <br />
                        Analytics
                      </>
                    </Heading>
                    <Text
                      size="6xl"
                      as="p"
                      className="mt-[33px] text-justify leading-10 paragraph font-fam"
                    >
                      &quot;Smart-CFO offers a suite of innovative financial
                      analytics and management tools designed to empower
                      businesses with actionable insights. Our products address
                      the diverse needs of modern financial management,
                      integrating the latest AI and ML technologies.&quot;
                    </Text>
                    <Buttons
                      color="teal_300"
                      size="lg"
                      className="mt-[52px] sm:px-5 font-poppins font-medium min-w-[323px] rounded-[39px] font-pop btn-u "
                      onClick={() => handleContact()}
                    >
                      <>
                        Contact us for a demo
                        <br />
                      </>
                    </Buttons>
                    <Buttons
                      color="teal_300"
                      size="lg"
                      className="mt-[52px] sm:px-5 font-poppins font-medium min-w-[323px] rounded-[39px] font-pop btn-u btn-head mb-4"
                      style={{
                        background: "#928EDB",
                      }}
                      onClick={() => handleContact()}
                    >
                      <>
                        Download our product Brochure
                        <br />
                      </>
                    </Buttons>
                  </div>
                </div>
                <div className="h-[568px] w-[45%] md:w-full mt-[161px] ml-[-81px] md:ml-0 rotate-[180deg] relative">
                  <div className="flex flex-col items-end w-full h-max left-0 bottom-0 right-0 top-0 m-auto absolute">
                    <Img
                      src="images/img_group_1000002295.svg"
                      alt="image"
                      className="h-[59px] mr-[47px] md:mr-0"
                    />
                    <div className="self-stretch h-[547px] mt-[-52px] relative">
                      <img
                        src="images/img_rectangle_6063.svg"
                        alt="image_one"
                        className="h-[547px] left-0 bottom-0 right-0 top-0 m-auto absolute rounded-[30px]"
                      />
                      <img
                        src="images/img_rectangle_6064.svg"
                        alt="image_two"
                        className="h-[543px] left-0 bottom-0 right-0 top-0 m-auto absolute rounded-[30px]"
                      />
                      <img
                        src="images/revenue-operations-concept.png"
                        alt="revenue_one"
                        className="h-[479px] w-[94%] left-0 bottom-0 right-0 top-0 m-auto object-cover absolute rounded-[10px] rotate-[180deg]" // Adding rotate-[180deg] to rotate the image 180 degrees
                      />
                    </div>
                  </div>
                  <Img
                    src="images/img_group_1000002294.svg"
                    alt="image_three"
                    className="h-[128px] bottom-[-0.50px] left-[0.00px] m-auto absolute"
                  />
                </div>
              </div>
              <div className="self-stretch mt-[-155px] px-14 py-[130px] md:p-5 relative bg-[url(/public/images/Vector2.png)] bg-cover bg-no-repeat">
                <div className="flex md:flex-col justify-center items-center w-full mb-[1px] gap-[43px] mx-auto max-w-[1337px]">
                  <div
                    className="flex flex-col items-end md:self-stretch flex-1"
                    id="analytics"
                  >
                    <Img
                      src="images/img_group_1000002323.svg"
                      alt="image_four"
                      className="h-[59px] mr-2.5 md:mr-0"
                    />
                    <div className="flex md:flex-col self-stretch items-center mt-[-25px] relative">
                      <Img
                        src="images/img_group_1000002294_deep_purple_300_01.svg"
                        alt="image_five"
                        className="self-end h-[128px] md:w-full mb-[191px]"
                      />
                      <div className="md:self-stretch h-[556px] md:w-full ml-[-25px] md:ml-0 relative flex-1 md:flex-none">
                        <Img
                          src="images/img_image_369.png"
                          alt="image369_one"
                          className="h-[490px] w-[100%] left-[0.00px] top-[0.00px] m-auto object-cover absolute"
                        />
                        {/* <Img
                          src="images/img_image_367.png"
                          alt="image367_one"
                          className="h-[233px] w-[46%] bottom-[-0.50px] right-[0.00px] m-auto object-cover absolute"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-col w-[44%] md:w-full gap-[41px]"
                    id="analytics"
                  >
                    <div className="flex sm:flex-col items-center w-[70%] md:w-full gap-[26px]">
                      <div className="h-[86px] w-[86px] md:h-auto bg-gray-100 relative rounded-[43px]">
                        {/* <Img
                          src="images/img_group_1000002290.svg"
                          alt="settings_one"
                          className="h-[46px]"
                        /> */}
                        <div className="w-full h-max left-0 bottom-0 right-0 top-0 p-[17px] m-auto bg-deep_purple-50 absolute rounded-[43px]">
                          <Img
                            src="images/img_mask_group.png"
                            alt="image_six"
                            className="w-full md:h-auto mt-[5px] object-cover"
                          />
                        </div>
                      </div>
                      <Heading
                        as="h2"
                        className="self-end mb-[21px] card-service font-fam"
                      >
                        Intelligent Analytics
                      </Heading>
                    </div>
                    <Text
                      size="6xl"
                      as="p"
                      className="ml-[21px] md:ml-0 text-justify leading-10 paragraph font-fam"
                    >
                      Dive deep into your financial data with our AI-powered
                      analytics. Smart-CFO provides predictive insights, helping
                      you forecast trends and make data-driven decisions
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <Img
              src="images/img_group.png"
              alt="image_seven"
              className="h-[941px] w-[37%] right-[0.33px] top-[8%] m-auto object-cover absolute"
            />
          </div>
          <div
            id="insights"
            className="flex md:flex-col justify-between items-center gap-5 p-[118px] md:p-5 bg-[url(/public/images/Vector3.png)] bg-cover bg-no-repeat"
          >
            <div className="flex flex-col w-[40%] md:w-full ml-[95px] gap-[41px] md:ml-0">
              <div className="flex items-center gap-[26px]">
                <div className="flex flex-col items-center p-[21px] sm:p-5 bg-gray-100 rounded-[43px]">
                  <Img
                    src="images/img_group_1000002289.svg"
                    alt="user_one"
                    className="h-[42px] w-[42px]"
                  />
                </div>
                <Heading
                  as="h2"
                  className="self-end mb-[21px] card-service font-fam"
                >
                  Real-Time Insights
                </Heading>
              </div>
              <Text
                size="6xl"
                as="p"
                className="text-justify leading-10 paragraph font-fam"
              >
                Stay ahead with real-time financial reporting. Our platform
                updates instantly, providing up-to-the-minute financial data to
                keep your business agile.
              </Text>
            </div>
            <div className="flex justify-center items-center h-[536px] w-[49%] md:w-full md:h-auto mr-3 p-4 md:p-5 md:mr-0 bg-[url(/public/images/img_group_1000002377.svg)] bg-cover bg-no-repeat rounded-[30px]">
              <Img
                src="images/img_image_372.png"
                alt="image372_one"
                className="h-[490px] w-full md:h-auto mt-1.5 mb-[5px] object-cover rounded-[30px]"
              />
            </div>
          </div>
          <div className="flex md:flex-col justify-between items-center w-full gap-5 p-[135px] mx-auto md:p-5 bg-gradient max-w-[1721px]">
            <div className="h-[441px] w-[55%] md:w-full mt-[18px] mb-[41px] relative">
              <Img
                src="images/img_rectangle_6083.svg"
                alt="image_eight"
                className="h-[441px] left-0 bottom-0 right-0 top-0 m-auto absolute rounded-[30px]"
              />
              <Img
                src="images/img_image_375.png"
                alt="image375_one"
                className="h-[402px] w-full bottom-[7.44px] right-0 left-0 m-auto object-cover absolute"
              />
            </div>
            <div
              className="flex flex-col w-[41%] md:w-full mr-[93px] gap-[41px] md:mr-0"
              id="tailored"
            >
              <div className="flex sm:flex-col items-center gap-[26px]">
                <div className="flex flex-col items-center justify-center p-[21px] sm:p-5 bg-deep_purple-50 rounded-[43px]">
                  <Img
                    src="images/img_mask_group_43x44.png"
                    alt="image_nine"
                    className="w-[44px] object-cover"
                  />
                </div>
                <Heading as="h2" className="card-service font-fam">
                  Tailored For Your Business
                </Heading>
              </div>
              <Text
                size="6xl"
                as="p"
                className="text-justify leading-10 paragraph font-fam"
              >
                Every business is unique, and so is your dashboard. Customize
                your financial view to focus on what matters most to your
                company.
              </Text>
            </div>
          </div>
          <div
            className="px-14 py-[118px] md:p-5 bg-[url(/public/images/Vector4.png)] bg-cover bg-no-repeat "
            id="integration"
          >
            <div className="flex md:flex-col justify-between items-center w-full gap-5 mx-auto max-w-[1382px]">
              <div className="flex flex-col w-[40%] md:w-full gap-[41px] ml-20">
                <div className="flex sm:flex-col items-center gap-[26px]">
                  <div className="flex flex-col items-center p-3 bg-gray-100 rounded-[80px] ">
                    <Img
                      src="images/img_mask_group_46x46.png"
                      alt="image_ten"
                      className="w-[46px] object-cover"
                    />
                  </div>
                  <Heading
                    as="h2"
                    className="self-end mb-[21px] card-service font-fam"
                  >
                    Effortless Integration
                  </Heading>
                </div>
                <Text
                  size="6xl"
                  as="p"
                  className="text-justify leading-10 paragraph font-fam"
                >
                  Smart-CFO seamlessly integrates with your existing financial
                  systems, ensuring a unified and efficient workflow.
                </Text>
              </div>
              <div className="flex justify-center items-center h-[536px] w-[49%] md:w-full md:h-auto p-4  bg-cover bg-no-repeat rounded-[30px]">
                <div className="w-full my-[5px] bg-white-A700 rounded-[30px]">
                  <Img
                    src="images/img_image_376.png"
                    alt="image376_one"
                    className="h-[536px] w-[683.55px] md:h-auto mt-[35px] mb-[31px] object-cover rounded-[30px]"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* bg-[url(/public/images/Vector2.png)]   bg-[url(/public/images/img_group_399.svg)]  */}
          <div
            id="complaince"
            className="flex md:flex-col justify-between items-center w-full gap-5 p-[145px] mx-auto md:p-5  max-w-[1721px] bg-cover bg-no-repeat"
          >
            <div className="flex self-end justify-center items-center h-[447px] w-[45%] md:w-full md:h-auto ml-[84px] md:p-5 md:ml-0  bg-cover bg-no-repeat rounded-[30px]">
              <Img
                src="images/img_image_377.png"
                alt="image377_one"
                className=" mb-[3px] h-[536px] w-[683.55px] object-cover"
              />
            </div>
            <div className="flex flex-col w-[44%] md:w-full mr-[83px] gap-[41px] md:mr-0">
              <div className="flex sm:flex-col self-start items-center gap-[26px]">
                <div className="flex flex-col items-center p-3 bg-deep_purple-50 rounded-[80px]">
                  <Img
                    src="images/img_mask_group_1.png"
                    alt="image_eleven"
                    className="w-[46px] object-cover"
                  />
                </div>
                <Heading
                  as="h2"
                  className="self-end mb-[21px] card-service font-fam"
                >
                  Data Security and Compliance
                </Heading>
              </div>
              <Text
                size="6xl"
                as="p"
                className="text-justify leading-10 paragraph font-fam"
              >
                Your data's security is paramount. Smart-CFO is built with
                industry-leading security measures and complies with financial
                regulations.
              </Text>
            </div>
          </div>
          <div
            className="flex md:flex-col items-center w-full py-5 gap-[33px] mx-auto md:p-5 px-20"
            style={{
              backgroundColor: "#f4f3fc",
              background: "#f4f3fc",
            }}
          >
            <Heading
              size="md"
              as="h2"
              className="!text-gray-800 !font-semibold  font-fam"
            >
              Additional Services
            </Heading>
            <div className="self-end md:self-stretch h-[2px] mb-[18px] bg-gray-800 flex-1" />
          </div>
          <div
            id="consultation"
            className=" px-14 py-[117px] md:p-5 bg-[url(/public/images/Vector5.png)] bg-cover bg-no-repeat"
          >
            <div className="flex md:flex-col justify-between items-center w-full gap-5 mx-auto max-w-[1318px]">
              {/* bg-[url(/public/images/img_group_399.svg)] */}
              <div className="flex justify-center items-center h-[539px] w-[52%] md:w-full md:h-auto p-[17px]  bg-cover bg-no-repeat rounded-[30px]">
                <Img
                  src="images/img_rectangle_6084.png"
                  alt="image_twelve"
                  className="h-[536px] w-[683.55px] md:h-auto my-1.5 object-cover rounded-[30px]"
                />
              </div>
              <div className="flex flex-col w-[44%] md:w-full gap-[41px]">
                <div className="flex sm:flex-col items-center gap-[26px]">
                  <div className="w-[16%] sm:w-full p-3.5 bg-gray-100 rounded-[43px]">
                    <Img
                      src="images/img_mask_group_46x58.png"
                      alt="image_thirteen"
                      className="w-full md:h-auto my-1.5 object-cover"
                    />
                  </div>
                  <Heading as="h2" className="card-service font-fam">
                    Consultation and Customization
                  </Heading>
                </div>
                <Text
                  size="6xl"
                  as="p"
                  className="w-[96%] md:w-full text-justify leading-10 paragraph font-fam"
                >
                  Need a more tailored solution? Our experts are here to consult
                  and customize Smart-CFO to fit your specific requirements."
                </Text>
              </div>
            </div>
          </div>
          <div
            id="training"
            className="flex justify-center w-full px-14 py-[117px] mx-auto md:p-5 bg-gradient max-w-[1721px]"
          >
            <div className="flex md:flex-col justify-between items-center w-[87%] md:w-full gap-5">
              <div className="flex flex-col w-[40%] md:w-full gap-[41px]">
                <div className="flex sm:flex-col items-center w-[75%] md:w-full gap-[26px]">
                  <div className="w-[22%] sm:w-full p-3 bg-deep_purple-50 rounded-[43px]">
                    <Img
                      src="images/img_mask_group_46x61.png"
                      alt="image_fourteen"
                      className="w-full md:h-auto my-2 object-cover"
                    />
                  </div>
                  <Heading
                    as="h2"
                    className="self-end mb-[21px] card-service font-fam"
                  >
                    Training and Support
                  </Heading>
                </div>
                <Text
                  size="6xl"
                  as="p"
                  className="text-justify leading-10 paragraph font-fam"
                >
                  Get the most out of Smart-CFO with our comprehensive training
                  and ongoing support. We're here to assist you at every step.
                </Text>
              </div>
              <div className="flex justify-center items-center h-[535px] w-[49%] md:w-full md:h-auto p-4 bg-[url(/public/images/img_group_1000002378.svg)] bg-cover bg-no-repeat rounded-[30px]">
                <Img
                  src="images/img_rectangle_6086.png"
                  alt="image_fifteen"
                  className="h-[491px] w-full md:h-auto my-[5px] object-cover rounded-[30px]"
                />
              </div>
            </div>
          </div>
          <div
            id="pricing"
            className="px-14 py-[117px] md:p-5 bg-[url(/public/images/Vector4.png)] bg-cover bg-no-repeat"
          >
            <div className="flex md:flex-col justify-between items-center w-full gap-5 mx-auto max-w-[1293px]">
              <div className="flex justify-center items-center h-[539px] w-[53%] md:w-full md:h-auto p-[15px] bg-[url(/public/images/img_group_399.svg)] bg-cover bg-no-repeat rounded-[30px]">
                <Img
                  src="images/img_image_382.png"
                  alt="image382_one"
                  className="h-[490px] w-full md:h-auto mt-[9px] mb-2 object-cover rounded-[34px]"
                />
              </div>
              <div className="flex flex-col w-[43%] md:w-full gap-[41px]">
                <div className="flex items-center gap-[26px]">
                  <div className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-[80px]">
                    <Img
                      src="images/img_mask_group_46x49.png"
                      alt="image_sixteen"
                      style={{
                        width: "63px",
                        height: "70px",
                      }}
                      className="object-cover"
                    />
                  </div>
                  <Heading
                    as="h2"
                    className="self-end mb-[21px] !text-gray-800_01 card-service font-fam"
                  >
                    Pricing Information
                  </Heading>
                </div>
                <Text
                  size="6xl"
                  as="p"
                  className="text-justify leading-10 paragraph font-fam"
                >
                  Discover our flexible pricing options designed to suit
                  businesses of all sizes. Contact us for a detailed quote and
                  find the perfect plan for your needs.
                </Text>
              </div>
            </div>
          </div>
          <div
            id="customer"
            className="flex justify-center w-full px-14 py-[119px] mx-auto md:p-5 bg-[url(/public/images/Vector2.png)] bg-cover bg-no-repeat max-w-[1721px]"
          >
            <div className="flex md:flex-col justify-between items-center w-[86%] md:w-full gap-5">
              <div className="flex flex-col w-[40%] md:w-full gap-[41px]">
                <div className="flex sm:flex-col items-center gap-[26px]">
                  <div className="flex flex-col items-center p-3 bg-deep_purple-50 rounded-[80-px]">
                    <Img
                      src="images/img_mask_group_2.png"
                      alt="image_seventeen"
                      className="w-[46px] object-cover"
                    />
                  </div>
                  <Heading
                    as="h2"
                    className="!text-gray-800_01 card-service font-fam"
                  >
                    Customer Success Stories
                  </Heading>
                </div>
                <Text
                  size="6xl"
                  as="p"
                  className="text-justify leading-10 font-fam paragraph"
                >
                  Don't just take our word for it. Read how businesses like
                  yours are leveraging Smart-CFO to transform their financial
                  management.
                </Text>
              </div>
              <div className="flex justify-center items-center h-[535px] w-[49%] md:w-full md:h-auto p-4 bg-[url(/public/images/img_group_1000002378.svg)] bg-cover bg-no-repeat rounded-[30px]">
                <Img
                  src="images/img_rectangle_6090.png"
                  alt="image_eighteen"
                  className="h-[491px] w-full md:h-auto my-[5px] object-cover rounded-[30px]"
                />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col self-end items-center w-full mt-[39px] mx-auto md:p-5 max-w-[1606px]">
            <div className="flex flex-col items-start justify-center w-[46%] md:w-full pl-[92px] pr-14 gap-[66px] py-[92px] md:p-5 sm:gap-[33px] z-[1] bg-white-A700 shadow-md">
              <Heading as="h2" className="ml-2 md:ml-0">
                Toronto, Ontario, Canada
              </Heading>
              <Heading as="h3" className="ml-2 md:ml-0">
                647-355-5234
              </Heading>
              <Heading as="h4" className="ml-2 md:ml-0">
                enquiry@poko-tech.com
              </Heading>
              <Heading as="h5" className="mb-8 ml-2 md:ml-0">
                205 Grandview Way, North York, ON, M2N 6V3
              </Heading>
            </div>
            <div className="flex flex-col items-start justify-center md:self-stretch ml-[-105px] pl-[73px] pr-14 py-[73px] md:ml-0 md:p-5 relative bg-deep_purple-50_01 flex-1">
              <div className="flex flex-col items-start ml-[111px] gap-[9px] md:ml-0 border-gray-500 border-b-[0.5px] border-solid">
                <Text size="6xl" as="p" className="!text-gray-700 !font-medium">
                  Full Name*
                </Text>

                <input
                  as="h6"
                  className="!text-gray-800_01 font-fam borderbox"
                  placeholder={placeholder}
                  style={{
                    border: "none",
                    fontSize: "30px",
                    background: "#EFEEFB",
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
                  background: "#EFEEFB",
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
                  background: "#EFEEFB",
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
                  background: "#EFEEFB",
                  fontWeight: "700",
                }}
              ></input>
              <div className="self-center h-px w-[74%] mt-[11px] bg-gray-500" />
              <Buttons
                color="black_900"
                size="xl"
                className="mt-[50px] mb-[5px] ml-[111px] md:ml-0 sm:px-5 font-poppins font-medium min-w-[213px] rounded-[43px]"
                onClick={() => handleSubmit()}
              >
                Contact Us
              </Buttons>
            </div>
          </div>
          {/*  What out Customers have to Say Section */}
          {/* <div className="h-[740px] w-full mt-[100px] mx-auto md:p-5 relative max-w-[1534px] mb-5">
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
                    Manifestly was the easiest to deploy and hit the ground
                    using. We&#39;ve found the Manifestly team to be great
                    partners.”
                  </Text>
                  <Img
                    src="images/abstract-background-yellow-blue-red-color-flow-grainy-wave-dark-noise-texture-cover-header_136558-42310.png"
                    alt="richardtubblo"
                    className="w-[43%] mt-4 object-cover h-[180px]"
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
          </div> */}
          {/* <footer className="mt-[210px] px-14 py-20 md:p-5 bg-gray-50">
            <div className="flex md:flex-col self-start justify-between items-start w-full gap-5 mx-auto max-w-[1403px]">
              <Img
                src="images/img_image_360.png"
                alt="image360_three"
                className="w-[15%] md:w-full object-cover"
              />
              <div className="flex flex-col w-[80%] md:w-full mt-[11px] gap-[15px]">
                <div className="flex flex-wrap">
                  <Text size="6xl" as="p" className="self-end !font-medium">
                    Company
                  </Text>
                  <Text
                    size="5xl"
                    as="p"
                    className="self-start ml-[223px] !text-[19.84px]"
                  >
                    Features
                  </Text>
                  <Text
                    size="6xl"
                    as="p"
                    className="self-start ml-[546px] !font-medium"
                  >
                    Resources
                  </Text>
                </div>
                <div className="flex md:flex-col items-start">
                  <div className="flex flex-col items-start mt-1 gap-[15px]">
                    <Text size="lg" as="p" className="!text-[13.78px]">
                      About
                    </Text>
                    <a href="#">
                      <Text as="p">Product Roadmap</Text>
                    </a>
                    <a href="#">
                      <Text as="p">API Reference</Text>
                    </a>
                    <a href="Integrations" target="_blank" rel="noreferrer">
                      <Text size="lg" as="p" className="!text-[13.67px]">
                        Integrations
                      </Text>
                    </a>
                    <a href="Blog" target="_blank" rel="noreferrer">
                      <Text as="p">Blog</Text>
                    </a>
                  </div>
                  <div className="flex flex-col items-start ml-[196px] md:ml-0">
                    <Text size="lg" as="p" className="!text-[13.89px]">
                      How it Works
                    </Text>
                    <a href="#" className="mt-[15px]">
                      <Text as="p">All Features</Text>
                    </a>
                    <a href="#" className="mt-4">
                      <Text size="lg" as="p" className="!text-[13.78px]">
                        Conditional Logic
                      </Text>
                    </a>
                    <a href="#" className="mt-3.5">
                      <Text as="p">Role Based Assignments</Text>
                    </a>
                    <a href="#" className="mt-[13px]">
                      <Text as="p">Due Dates & Reminders</Text>
                    </a>
                    <a href="#" className="mt-[15px]">
                      <Text size="lg" as="p" className="!text-[13.89px]">
                        Data Collection
                      </Text>
                    </a>
                    <a href="#" className="mt-[15px]">
                      <Text size="lg" as="p" className="!text-[13.89px]">
                        Detailed Process Documentation
                      </Text>
                    </a>
                    <a href="#" className="mt-3.5">
                      <Text size="lg" as="p" className="!text-[13.56px]">
                        Workflow Automations
                      </Text>
                    </a>
                    <a href="#" className="mt-[17px]">
                      <Text as="p">Schedule Recurring</Text>
                    </a>
                    <a href="#" className="mt-[15px]">
                      <Text as="p">Import Runs</Text>
                    </a>
                    <a href="#" className="mt-[13px]">
                      <Text as="p">API and WebHooks</Text>
                    </a>
                    <a href="#" className="mt-5">
                      <Text size="lg" as="p" className="!text-[13.78px]">
                        Zapier Integrations
                      </Text>
                    </a>
                  </div>
                  <div className="md:self-stretch h-[369px] md:w-full md:h-auto ml-[100px] md:ml-0 flex-1 relative md:flex-none">
                    <div className="flex flex-col items-start gap-[15px]">
                      <Text as="p">Summary View</Text>
                      <Text size="lg" as="p" className="!text-[13.89px]">
                        Reminders & Notifications
                      </Text>
                      <Text size="lg" as="p" className="!text-[13.89px]">
                        Customizable Dashboards
                      </Text>
                      <Text as="p">Reporting & Data Exports</Text>
                      <Text size="lg" as="p" className="!text-[13.89px]">
                        Calendar Integration
                      </Text>
                      <Text as="p">Departments & Roles</Text>
                      <Text size="lg" as="p" className="!text-[13.67px]">
                        Permissions
                      </Text>
                      <Text as="p">SAML SSO</Text>
                      <Text as="p">Organize with Tags</Text>
                      <Text as="p">Searchable Activity Logs</Text>
                      <Text size="lg" as="p" className="!text-[13.89px]">
                        Comments & Mentions
                      </Text>
                      <Text size="lg" as="p" className="!text-[13.89px]">
                        Built in Process Improvement
                      </Text>
                    </div>
                    <ul className="flex flex-col items-start gap-[15px] bottom-[0.39px] right-0 left-0 m-auto absolute">
                      <li>
                        <a href="#">
                          <Text size="lg" as="p" className="!text-[13.89px]">
                            Reminders & Notifications
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text size="lg" as="p" className="!text-[13.89px]">
                            Customizable Dashboards
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p">Reporting & Data Exports</Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text size="lg" as="p" className="!text-[13.89px]">
                            Calendar Integration
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p">Departments & Roles</Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text size="lg" as="p" className="!text-[13.67px]">
                            Permissions
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p">SAML SSO</Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p">Organize with Tags</Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text as="p">Searchable Activity Logs</Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text size="lg" as="p" className="!text-[13.89px]">
                            Comments & Mentions
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text size="lg" as="p" className="!text-[13.89px]">
                            Built in Process Improvement
                          </Text>
                        </a>
                      </li>
                      <a href="#">
                        <Text size="lg" as="p" className="!text-[13.89px]">
                          Built in Process Improvement
                        </Text>
                      </a>
                      <a href="#">
                        <Text size="lg" as="p" className="!text-[13.89px]">
                          Comments & Mentions
                        </Text>
                      </a>
                      <a href="#">
                        <Text as="p">Searchable Activity Logs</Text>
                      </a>
                      <a href="#">
                        <Text as="p">Organize with Tags</Text>
                      </a>
                      <a href="#">
                        <Text as="p">SAML SSO</Text>
                      </a>
                      <a href="#">
                        <Text size="lg" as="p" className="!text-[13.67px]">
                          Permissions
                        </Text>
                      </a>
                      <a href="#">
                        <Text as="p">Departments & Roles</Text>
                      </a>
                      <a href="#">
                        <Text size="lg" as="p" className="!text-[13.89px]">
                          Calendar Integration
                        </Text>
                      </a>
                      <a href="#">
                        <Text as="p">Reporting & Data Exports</Text>
                      </a>
                      <a href="#">
                        <Text size="lg" as="p" className="!text-[13.89px]">
                          Customizable Dashboards
                        </Text>
                      </a>
                      <a href="#">
                        <Text size="lg" as="p" className="!text-[13.89px]">
                          Reminders & Notifications
                        </Text>
                      </a>
                    </ul>
                  </div>
                  <ul className="flex flex-col items-start mt-[5px] ml-[126px] gap-3.5 md:ml-0">
                    <li>
                      <a href="#">
                        <Text as="p">Help</Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p">Getting Started Guides</Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p">Video Center</Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p">Demos</Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text size="lg" as="p" className="!text-[13.89px]">
                          Your Account
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p">Use Cases</Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p">Integrations</Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p">Process Street Alternative</Text>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="h-px w-full mt-12 mx-auto md:p-5 bg-gray-300 max-w-[1445px]" />
            <div className="flex md:flex-col items-start w-full mt-2 mb-[31px] mx-auto max-w-[1488px]">
              <a href="#">
                <Text as="p" className="!text-gray-900 !font-roboto">
                  Privacy & Policy
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="mt-[5px] ml-3.5 md:ml-0 !text-white-A700_7e !font-roboto !text-[11.88px] opacity-0.4"
              >
                /
              </Text>
              <a
                href="Terms"
                target="_blank"
                rel="noreferrer"
                className="mt-1 ml-[13px] md:ml-0"
              >
                <Text
                  size="lg"
                  as="p"
                  className="!text-gray-900 !font-roboto !text-[13.67px]"
                >
                  Terms
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="mt-[5px] ml-3.5 md:ml-0 !text-white-A700_7e !font-roboto !text-[11.88px] opacity-0.4"
              >
                /
              </Text>
              <a href="#" className="mt-1 ml-[13px] md:ml-0">
                <Text as="p" className="!text-gray-900 !font-roboto">
                  Contact Us
                </Text>
              </a>
              <div className="h-[28px] w-[36%] md:w-full ml-[1100px] md:ml-0 relative">
                <div className="flex h-max gap-3 left-[3.37px] bottom-0 top-0 my-auto absolute">
                  <Buttons
                    color="gray_50_19"
                    shape="round"
                    className="w-[28px]"
                  >
                    <Img src="images/img_list_item_link.svg" />
                  </Buttons>
                  <Buttons
                    color="gray_50_19"
                    shape="round"
                    className="w-[28px]"
                  >
                    <Img src="images/img_list_item_link_gray_50_01.svg" />
                  </Buttons>
                </div>
                <Text
                  size="lg"
                  as="p"
                  className="w-max bottom-[2.35px] right-0 left-0 m-auto !font-roboto text-right !text-[13.67px] absolute"
                >
                  © Smart CFO 2024
                </Text>
              </div>
            </div>
          </footer> */}
        </div>
      </div>
    </>
  );
}

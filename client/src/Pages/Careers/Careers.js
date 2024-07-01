import React from "react";
import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
const Careers = () => {
  const navigate = useNavigate();
  const handleNavigation = (str) => {
    if (str === "contact") {
      navigate("/contactus");
    }
  };
  return (
    <div className="flex w-full flex-col items-center bg-white-A700">
      {/* header section */}
      <div className="h-[600px] self-stretch bg-[url(/public/images/img_group_116.png)] bg-cover bg-no-repeat pb-[134px] md:h-auto md:pb-5">
        {/* hero section */}
        <div className="flex flex-col items-center gap-[117px] md:gap-[87px] sm:gap-[58px] mt-12">
          <div className="container-sm flex flex-col mt-12 items-start pl-[120px] pr-14 md:p-5 md:px-5">
            <div className="flex w-[53%] flex-col gap-[45px] md:w-full">
              <Text
                size="9xl"
                as="p"
                className="w-[75%] leading-[70px] !text-gray-800_01 md:w-full para-heading font-fam"
              >
                Join Our Team at Smart-CFO
              </Text>
              <Text
                as="p"
                className="leading-10 !text-blue_gray-900_01 paragraph font-fam mb-5"
              >
                At Smart-CFO, we're on a mission to revolutionize financial
                analytics with our cutting-edge software solutions. We're
                looking for passionate, innovative, and dedicated individuals to
                join our growing team. Explore our career opportunities and
                become a part of our journey to transform the world of financial
                management."
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* job listings section */}
      <div className="container-sm mt-[108px] md:p-5">
        <div className="flex gap-[95px] md:flex-col">
          <div className="flex w-full flex-col items-start gap-[51px] sm:gap-[25px]">
            <Heading
              size="2xl"
              as="h2"
              className=" w-full ml-2 md:ml-0 para-heading font-fam !text-gray-800_01"
            >
              Explore Our Current Opportunities
            </Heading>
            <div className="flex flex-col items-start self-stretch">
              <Heading
                size="lg"
                as="h3"
                className="ml-2 leading-[56px] !text-gray-900 md:ml-0 career-head font-fam"
              >
                Blockchain Developer - Decentralized IoT Data Marketplace
              </Heading>
              <Text
                size="6xl"
                as="p"
                className="ml-2 mt-[13px] !text-gray-900 md:ml-0"
              >
                <>
                  Wardweb Sol
                  <br />
                </>
              </Text>
              <div className="mt-[26px] flex items-center gap-1.5 sm:flex-col">
                <Img
                  src="images/img_25530_1.png"
                  alt="image"
                  className="h-[32px] w-[32px] self-start object-cover sm:w-full"
                />
                <Text size="6xl" as="p" className="self-end !text-gray-900">
                  Pakistan - Apr 01, 2024 - Work From Home
                </Text>
              </div>
              <Text
                as="p"
                className="ml-2 mt-5 leading-10 !text-blue_gray-900_01 md:ml-0 paragraph font-fam"
              >
                Smart-CFO now offers seamless integration with leading ERP
                systems, enhancing data synchronization and workflow efficiency.
              </Text>
              <div className="ml-2 mt-[29px] flex gap-1.5 md:ml-0 sm:flex-col">
                <div className="flex h-[70px] items-center rounded-[43px] bg-[url(/public/images/img_group_1000002401.svg)] bg-cover bg-no-repeat p-[26px] md:h-auto sm:p-5">
                  <Text size="5xl" as="p" className="self-end !text-black-900">
                    Programming
                  </Text>
                </div>
                <div className="flex h-[70px] items-center  md:h-auto sm:p-5">
                  <Text
                    size="5xl"
                    as="p"
                    className="self-end !text-black-900 rounded-[43px]"
                    style={{
                      background: "#EFEFEF",
                      padding: "19px 20px",
                    }}
                  >
                    Deploying Smart Contract
                  </Text>
                </div>
              </div>
              <div className="ml-2 mt-[22px] flex gap-[7px] md:ml-0 sm:flex-col">
                <div className="flex h-[70px] items-center rounded-[43px] bg-[url(/public/images/img_group_1000002401.svg)] bg-cover bg-no-repeat p-[26px] md:h-auto sm:p-5">
                  <Text size="5xl" as="p" className="self-end !text-black-900">
                    Blockchain Coding
                  </Text>
                </div>
                <div className="flex h-[70px] items-center rounded-[43px] bg-[url(/public/images/img_group_1000002401.svg)] bg-cover bg-no-repeat p-[27px] md:h-auto sm:p-5">
                  <Text
                    size="5xl"
                    as="p"
                    className="self-start !text-black-900"
                  >
                    MS Visual Studio
                  </Text>
                </div>
              </div>
              <Buttons
                color="teal_300"
                className="ml-2 mt-[45px] min-w-[220px] rounded-[43px] font-medium md:ml-0 sm:px-5"
                style={{
                  padding: "28px 49px",
                  borderRadius: "32px",
                }}
                onClick={() => handleNavigation("contact")}
              >
                Apply Now!
              </Buttons>
            </div>
          </div>
          <div
            className="flex w-full flex-col items-start"
            style={{
              marginTop: "8%",
            }}
          >
            <Heading
              size="lg"
              as="h4"
              className="ml-2 leading-[56px] !text-gray-900 md:ml-0 career-head font-fam mt-[60px]"
            >
              Blockchain Developer - Decentralized IoT Data Marketplace
            </Heading>
            <Text
              size="6xl"
              as="p"
              className="ml-2 mt-[13px] !text-gray-900 md:ml-0"
            >
              <>
                Wardweb Sol
                <br />
              </>
            </Text>
            <div className="mt-[26px] flex items-center gap-1.5 sm:flex-col">
              <Img
                src="images/img_25530_1.png"
                alt="image"
                className="h-[32px] w-[32px] self-start object-cover sm:w-full"
              />
              <Text size="6xl" as="p" className="self-end !text-gray-900">
                Pakistan - Apr 01, 2024 - Work From Home
              </Text>
            </div>
            <Text
              as="p"
              className="ml-2 mt-5 leading-10 !text-blue_gray-900_01 md:ml-0 paragraph font-fam"
            >
              Smart-CFO now offers seamless integration with leading ERP
              systems, enhancing data synchronization and workflow efficiency.
            </Text>
            <div className="ml-2 mt-[29px] flex gap-1.5 md:ml-0 sm:flex-col">
              <div className="flex h-[70px] items-center rounded-[43px] bg-[url(/public/images/img_group_1000002401.svg)] bg-cover bg-no-repeat p-[26px] md:h-auto sm:p-5">
                <Text size="5xl" as="p" className="self-end !text-black-900">
                  Programming
                </Text>
              </div>
              <div className="flex h-[70px] items-center  md:h-auto sm:p-5">
                <Text
                  size="5xl"
                  as="p"
                  className="self-end !text-black-900 rounded-[43px]"
                  style={{
                    background: "#EFEFEF",
                    padding: "19px 20px",
                  }}
                >
                  Deploying Smart Contract
                </Text>
              </div>
            </div>
            <div className="ml-2 mt-[22px] flex gap-[7px] md:ml-0 sm:flex-col">
              <div className="flex h-[70px] items-center rounded-[43px] bg-[url(/public/images/img_group_1000002401.svg)] bg-cover bg-no-repeat p-[26px] md:h-auto sm:p-5">
                <Text size="5xl" as="p" className="self-end !text-black-900">
                  Blockchain Coding
                </Text>
              </div>
              <div className="flex h-[70px] items-center rounded-[43px] bg-[url(/public/images/img_group_1000002401.svg)] bg-cover bg-no-repeat p-[27px] md:h-auto sm:p-5">
                <Text size="5xl" as="p" className="self-start !text-black-900">
                  MS Visual Studio
                </Text>
              </div>
            </div>
            <Buttons
              color="teal_300"
              className="mt-[45px] min-w-[220px] rounded-[43px] font-medium sm:px-5"
              style={{
                padding: "28px 49px",
                borderRadius: "32px",
              }}
              onClick={() => handleNavigation("contact")}
            >
              Apply Now!
            </Buttons>
          </div>
        </div>
      </div>

      {/* featured jobs section */}
      <div className="container-sm mt-[79px] flex justify-center bg-blue-50 p-[25px] md:p-5">
        <div className="my-14 flex w-full gap-[71px] md:flex-col">
          {[...Array(2)].map((d, index) => (
            <div
              key={"listtitle" + index}
              className="flex w-full flex-col items-start"
            >
              <Heading
                size="lg"
                as="h2"
                className="ml-1.5 leading-[56px] !text-gray-900 md:ml-0 career-head font-fam"
              >
                Blockchain Developer - Decentralized IoT Data Marketplace
              </Heading>
              <Text
                size="6xl"
                as="p"
                className="ml-1.5 mt-[13px] !text-gray-900 md:ml-0"
              >
                <>
                  Wardweb Sol
                  <br />
                </>
              </Text>
              <Text
                as="p"
                className="ml-1.5 mt-6 w-[84%] leading-10 !text-blue_gray-900_01 md:ml-0 md:w-full paragraph font-fam"
              >
                Smart-CFO now offers seamless integration with leading ERP
                systems, enhancing data synchronization and workflow efficiency.
              </Text>
              <Buttons
                color="black_900"
                className="mt-14 min-w-[220px] rounded-[43px] font-medium sm:px-5"
                style={{
                  padding: "28px 49px",
                  borderRadius: "32px",
                }}
                onClick={() => handleNavigation("contact")}
              >
                Apply Now!
              </Buttons>
            </div>
          ))}
        </div>
      </div>

      {/* culture section */}
      <div className="container-sm mt-[73px] flex md:p-5">
        <div className="flex w-full items-center md:flex-col">
          <div className="flex flex-1 gap-[77px] md:flex-col md:self-stretch">
            <div className="flex flex-1 flex-col items-start gap-[26px]">
              <Heading size="lg" as="h2" className="!text-gray-900">
                Culture and Environment
              </Heading>
              <Text
                as="p"
                className="leading-10 !text-blue_gray-900_01 paragraph font-fam mr-16"
              >
                Smart-CFO is more than just a workplace. We're a team that
                values creativity, collaboration, and innovation. We believe in
                empowering our employees to grow their skills and careers while
                contributing to meaningful work that makes a real impact.
              </Text>
            </div>
            <Heading size="lg" as="h3" className="!text-gray-900 ">
              Benefits and Perks
            </Heading>
          </div>
          <Text
            as="p"
            className="relative ml-[-402px] w-[41%] self-end leading-10 !text-blue_gray-900_01 md:ml-0 md:w-full paragraph font-fam"
            style={{
              marginTop: "110px",
            }}
          >
            We offer a comprehensive benefits package to support our employees'
            professional and personal well-being. This includes competitive
            salaries, health insurance, retirement plans, flexible working
            hours, professional development opportunities, and more.
          </Text>
        </div>
      </div>

      {/* team testimonials section */}
      <div className="container-sm mt-[101px] px-[241px] md:p-5 md:px-5">
        <div className="flex flex-col items-center gap-[26px]">
          <Heading size="lg" as="h2" className="!text-gray-900">
            Hear from Our Team
          </Heading>
          <div className="flex justify-center self-stretch bg-blue_gray-100 px-14 py-[232px] md:p-5">
            <Heading size="lg" as="h3" className="!text-gray-900">
              video here
            </Heading>
          </div>
        </div>
      </div>

      {/* application process section */}
      <div className="container-sm mt-[84px] flex md:p-5">
        <div className="flex w-full items-center justify-between gap-5 md:flex-col">
          <div className="flex w-[45%] flex-col items-start md:w-full">
            <Heading
              size="2xl"
              as="h2"
              className="para-heading font-fam !text-gray-800_01"
            >
              Application Process
            </Heading>
            <Heading size="lg" as="h3" className="mt-[58px] !text-gray-900">
              How to Apply
            </Heading>
            <Text
              as="p"
              className="mt-[33px] leading-10 !text-blue_gray-900_01 paragraph font-fam"
            >
              Interested in joining Smart-CFO? Here's how you can apply: Select
              the position you're interested in, fill out the application form,
              and submit your resume and cover letter. Our HR team will review
              your application and contact you for further steps.
            </Text>
          </div>
          <div
            className=" flex w-[50%] flex-col items-start gap-[34px] self-end md:w-full "
            style={{
              marginBottom: "40px",
            }}
          >
            <Heading size="lg" as="h4" className="!text-gray-900 ">
              Equal Opportunity Statement
            </Heading>
            <Text
              as="p"
              className="leading-10 !text-blue_gray-900_01 paragraph font-fam"
            >
              Smart-CFO is an equal opportunity employer. We celebrate diversity
              and are committed to creating an inclusive environment for all
              employees.
            </Text>
          </div>
        </div>
      </div>

      {/* contact hr section */}
      <div className="container-sm mt-[54px] flex flex-col items-center justify-center bg-blue-50 px-14 py-[69px] md:p-5">
        <Heading size="lg" as="h2" className="mt-2 !text-gray-900">
          Have questions about our career opportunities?
        </Heading>
        <Text size="8xl" as="p" className="mt-3 text-center !text-gray-900">
          Reach out to our HR team
        </Text>
        <Buttons
          color="black_900"
          className="mt-[26px] min-w-[220px] rounded-[43px] font-medium sm:px-5"
          style={{
            padding: "28px 49px",
            borderRadius: "32px",
          }}
          onClick={() => handleNavigation("contact")}
        >
          Contact Now!
        </Buttons>
      </div>
    </div>
  );
};

export default Careers;

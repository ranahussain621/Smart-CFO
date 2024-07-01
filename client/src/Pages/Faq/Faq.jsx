import React, { useEffect } from "react";
import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
export default function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex flex-col items-start w-full pb-[7px] bg-white-A700">
        <div
          className="self-stretch  bg-[url(/public/images/faq.png)] bg-cover bg-no-repeat"
          style={{
            height: "462px",
            width: "100%",
          }}
        ></div>

        <Heading
          size="xl"
          as="h2"
          className="mt-[52px] ml-[115px] md:ml-0 !text-gray-800_01 !font-semibold"
        >
          General Questions
        </Heading>
        <div className="self-stretch">
          <div className="flex flex-col w-full mt-6 gap-[23px] mx-auto md:p-5 max-w-[1416px]">
            <div className="flex flex-col items-start justify-center gap-5 border-blue_gray-100 border-b border-solid flex-1">
              <div className="flex justify-between items-center w-[97%] md:w-full gap-5">
                <Heading as="h2" className="!text-gray-800_01">
                  What is Smart-CFO?
                </Heading>
                <Img
                  src="images/img_arrow_up.svg"
                  alt="what_is"
                  className="h-[35px]"
                />
              </div>
              <Text
                size="6xl"
                as="p"
                className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
              >
                Smart-CFO is an advanced financial analytics and reporting
                software that integrates AI and ML technologies to provide
                real-time insights and predictive analytics for your business’s
                financial management.
              </Text>
            </div>
            <div className="flex flex-col items-start justify-center gap-[17px] border-blue_gray-100 border-b border-solid flex-1">
              <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full mt-0.5 gap-5">
                <Heading as="h3" className="self-end !text-gray-800_01">
                  Who can benefit from using Smart-CFO?
                </Heading>
                <Img
                  src="images/img_arrow_up.svg"
                  alt="arrowup_one"
                  className="self-start h-[35px] md:w-full"
                />
              </div>
              <Text
                size="6xl"
                as="p"
                className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
              >
                Smart-CFO is designed for businesses of all sizes that seek to
                enhance their financial decision-making process. It’s especially
                beneficial for CFOs, financial analysts, and business executives
                who need a comprehensive view of their financial health."
              </Text>
            </div>
            <div className="flex flex-col items-start justify-center gap-[17px] border-blue_gray-100 border-b border-solid flex-1">
              <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full mt-0.5 gap-5">
                <Heading as="h4" className="self-end !text-gray-800_01">
                  How does Smart-CFO integrate with existing systems?
                </Heading>
                <Img
                  src="images/img_arrow_up.svg"
                  alt="arrowup_one"
                  className="self-start h-[35px] md:w-full"
                />
              </div>
              <Text
                size="6xl"
                as="p"
                className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
              >
                Smart-CFO is built for easy integration with various financial
                and operational systems. It uses APIs to connect with your
                existing software, ensuring a seamless workflow."
              </Text>
            </div>
          </div>
        </div>
        <Heading
          size="xl"
          as="h2"
          className="mt-[30px] ml-[190px] md:ml-0 !text-gray-800_01 !font-semibold"
        >
          Technical Questions
        </Heading>
        <div className="self-stretch">
          <div className="flex flex-col w-full mt-[27px] gap-[31px] mx-auto md:p-5 max-w-[1416px]">
            <div className="flex flex-col items-start justify-center gap-[17px] border-blue_gray-100 border-b border-solid flex-1">
              <div className="flex sm:flex-col justify-between items-center w-[97%] md:w-full mt-0.5 ml-[7px] gap-5 md:ml-0">
                <Heading as="h2" className="!text-gray-800_01">
                  Is my data secure with Smart-CFO?
                </Heading>
                <Img
                  src="images/img_arrow_up.svg"
                  alt="image"
                  className="self-start h-[35px] sm:w-full"
                />
              </div>
              <Text
                size="6xl"
                as="p"
                className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
              >
                Absolutely. We prioritize data security with encryption, regular
                audits, and compliance with financial regulations to ensure your
                information is always protected.
              </Text>
            </div>
            <div className="flex flex-col items-start justify-center gap-[17px] border-blue_gray-100 border-b border-solid flex-1">
              <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full mt-0.5 gap-5">
                <Heading as="h3" className="self-end !text-gray-800_01">
                  Can I customize the dashboard according to my needs?
                </Heading>
                <Img
                  src="images/img_arrow_up.svg"
                  alt="arrowup_one"
                  className="self-start h-[35px] md:w-full"
                />
              </div>
              <Text
                size="6xl"
                as="p"
                className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
              >
                Yes, Smart-CFO offers customizable dashboards. You can tailor
                the interface to display the metrics and KPIs most relevant to
                your business.
              </Text>
            </div>
            <div className="flex flex-col items-start justify-center gap-[17px] border-blue_gray-100 border-b border-solid flex-1">
              <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full mt-0.5 gap-5">
                <Heading as="h4" className="!text-gray-800_01">
                  Does Smart-CFO offer predictive analytics?
                </Heading>
                <Img
                  src="images/img_arrow_up.svg"
                  alt="arrowup_one"
                  className="self-start h-[35px] md:w-full"
                />
              </div>
              <Text
                size="6xl"
                as="p"
                className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
              >
                Yes, one of Smart-CFO’s key features is its AI-driven predictive
                analytics, which helps forecast trends and facilitates proactive
                financial decisions.
              </Text>
            </div>
          </div>
        </div>
        <Heading
          size="xl"
          as="h2"
          className="mt-[42px] ml-[190px] md:ml-0 !text-gray-800_01 !font-semibold"
        >
          Pricing and Subscription
        </Heading>
        <div className="flex flex-col self-stretch gap-[31px]">
          <div className="flex flex-col items-start justify-center w-full mt-7 gap-[17px] mx-auto md:p-5 border-blue_gray-100 border-b border-solid max-w-[1416px]">
            <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full mt-0.5 gap-5">
              <Heading as="h2" className="self-end !text-gray-800_01">
                What are the pricing plans for Smart-CFO?
              </Heading>
              <Img
                src="images/img_arrow_up.svg"
                alt="arrowup_one"
                className="self-start h-[35px] md:w-full"
              />
            </div>
            <Text
              size="6xl"
              as="p"
              className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
            >
              We offer various pricing plans to suit different business needs
              and sizes. Please contact our sales team for detailed information
              and a personalized quote.
            </Text>
          </div>
          <div className="flex flex-col items-start w-full gap-[29px] mx-auto md:p-5 border-blue_gray-100 border-b border-solid max-w-[1416px]">
            <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full gap-5">
              <Heading as="h2" className="!text-gray-800_01">
                Is there a trial version available for Smart-CFO?
              </Heading>
              <Img
                src="images/img_arrow_up.svg"
                alt="arrowup_three"
                className="h-[35px] md:w-full"
              />
            </div>
            <Text
              size="6xl"
              as="p"
              className="mb-11 !text-blue_gray-900_01 text-justify"
            >
              Yes, we offer a free trial period for you to experience
              Smart-CFO’s capabilities. Sign up on our website to start your
              trial.
            </Text>
          </div>
        </div>
        <Heading
          size="xl"
          as="h2"
          className="mt-[45px] ml-[190px] md:ml-0 !text-gray-800_01 !font-semibold"
        >
          Support and Training
        </Heading>
        <div className="flex flex-col self-stretch items-center">
          <div className="flex flex-col items-start w-full mt-[18px] gap-[26px] py-[5px] mx-auto md:p-5 border-blue_gray-100 border-b border-solid max-w-[1416px]">
            <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full gap-5">
              <Heading as="h2" className="!text-gray-800_01">
                What kind of customer support does Smart-CFO provide?
              </Heading>
              <Img
                src="images/img_arrow_up.svg"
                alt="arrowup_five"
                className="self-start h-[35px] md:w-full"
              />
            </div>
            <Text
              size="6xl"
              as="p"
              className="mb-[43px] !text-blue_gray-900_01 text-justify"
            >
              Our dedicated support team is available via phone, email, and live
              chat to assist with any queries or issues you may encounter."
            </Text>
          </div>
          <div className="flex flex-col items-start justify-center w-full mt-[21px] gap-[17px] mx-auto md:p-5 border-blue_gray-100 border-b border-solid max-w-[1416px]">
            <div className="flex md:flex-col justify-between items-center w-[97%] md:w-full mt-0.5 gap-5">
              <Heading as="h2" className="self-end !text-gray-800_01">
                Does Smart-CFO offer training for new users?
              </Heading>
              <Img
                src="images/img_arrow_up.svg"
                alt="arrowup_seven"
                className="self-start h-[35px] md:w-full"
              />
            </div>
            <Text
              size="6xl"
              as="p"
              className="w-[92%] md:w-full !text-blue_gray-900_01 text-justify leading-10"
            >
              Yes, we provide comprehensive training resources, including
              webinars, how-to guides, and personalized training sessions to
              help you maximize your use of Smart-CFO.
            </Text>
          </div>
          <Text
            size="9xl"
            as="p"
            className="w-[69%] md:w-full mt-[89px] md:p-5 !text-gray-800_01 text-center !font-normal leading-[157%]"
          >
            <span className="text-gray-800_01 font-semibold">Didn’t find</span>
            <span className="text-gray-800_01">
              &nbsp;what you were looking for?&nbsp;
            </span>
            <span className="text-gray-800_01 font-semibold">Our team</span>
            <span className="text-gray-800_01">&nbsp;is ready to</span>
            <span className="text-gray-800_01 font-semibold">&nbsp;answer</span>
            <span className="text-gray-800_01">&nbsp;any other&nbsp;</span>
            <span className="text-gray-800_01 font-semibold">
              questions you might have.
            </span>
          </Text>
          <div className="flex flex-col items-center mt-[34px] gap-[13px]">
            <Heading as="h2" className="!text-gray-800_01 text-center">
              Contact us at
            </Heading>
            <div className="flex sm:flex-col self-start gap-[27px]">
              <div className="flex self-end items-center gap-[17px] sm:p-5">
                <Img
                  src="images/img_lock_gray_800_01.svg"
                  alt="lock_one"
                  className="self-start h-[22px]"
                />
                <Text
                  size="6xl"
                  as="p"
                  className="!text-gray-800_01 !font-medium"
                >
                  enquiry@poko-tech.com
                </Text>
              </div>
              <div className="flex self-start items-center gap-2.5 sm:p-5">
                <Img
                  src="images/img_call_gray_800_01.svg"
                  alt="call_one"
                  className="self-end h-[22px] w-[23px]"
                />
                <Text
                  size="6xl"
                  as="p"
                  className="!text-gray-800_01 !font-medium"
                >
                  647-355-5234
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

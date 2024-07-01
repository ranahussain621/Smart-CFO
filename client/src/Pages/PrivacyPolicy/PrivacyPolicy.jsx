import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="w-full bg-white-A700">
        <div className="flex flex-col items-start">
          <div
            className="self-stretch px-14 py-16 md:p-5 bg-[url(/public/images/heroprivacy.png)] bg-cover bg-no-repeat"
            style={{
              height: "600px",
              width: "100%",
            }}
          ></div>

          <Heading size="lg" as="h2" className="mt-[70px] ml-[190px] md:ml-0">
            Personal Information
          </Heading>
          <div className="flex flex-col items-start w-[42%] md:w-full mt-[27px] ml-[190px] gap-2 md:p-5 md:ml-0">
            <Heading as="h2">What We Collect: </Heading>
            <Text size="6xl" as="p" className="text-justify leading-10">
              <>
                Contact details such as name, email address, and phone number.
                <br />
                Professional information like company name and job title.
              </>
            </Text>
          </div>
          <div className="flex flex-col items-start w-[56%] md:w-full mt-[23px] ml-[190px] gap-2 md:p-5 md:ml-0">
            <Heading as="h2" className="ml-[7px] md:ml-0">
              How We Use It:
            </Heading>
            <Text size="6xl" as="p" className="leading-10">
              <>
                To provide and improve our services.
                <br />
                For communication purposes, including customer service and
                promotional emails.
              </>
            </Text>
          </div>
          <Heading size="lg" as="h2" className="mt-[70px] ml-[190px] md:ml-0">
            Usage Data
          </Heading>
          <Heading as="h2" className="mt-7 ml-[190px] md:ml-0">
            Details:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="mt-[13px] ml-[200px] md:ml-0 text-justify"
          >
            Information on how the service is accessed and used (e.g., page
            visits, time spent on pages).
          </Text>
          <Heading as="h2" className="mt-[38px] ml-[190px] md:ml-0">
            Purpose:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="mt-4 ml-[200px] md:ml-0 text-justify"
          >
            To understand user behavior and improve website functionality.
          </Text>
          <Heading size="lg" as="h2" className="mt-[88px] ml-[190px] md:ml-0">
            Cookies and Tracking Technologies
          </Heading>
          <Heading as="h2" className="mt-[27px] ml-[190px] md:ml-0">
            Use of Cookies:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="mt-4 ml-[200px] md:ml-0 text-justify"
          >
            We use cookies to enhance your experience, gather general visitor
            information, and track visits to our website.
          </Text>
          <Heading as="h2" className="mt-5 ml-[190px] md:ml-0">
            Control:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="w-[71%] md:w-full mt-[15px] ml-[190px] md:p-5 md:ml-0 text-justify leading-10"
          >
            You have the option to accept or decline cookies. Most web browsers
            automatically accept cookies, but you can usually modify your
            browser setting to decline cookies if you prefer.
          </Text>
          <Heading size="lg" as="h2" className="mt-[71px] ml-[190px] md:ml-0">
            Data Sharing and Disclosure
          </Heading>
          <Heading as="h2" className="mt-[30px] ml-[190px] md:ml-0">
            Not Shared With Third Parties:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="w-[71%] md:w-full mt-[17px] ml-[190px] md:p-5 md:ml-0 text-justify leading-10"
          >
            Your personal information will not be sold, exchanged, or
            transferred to any third parties without your consent, other than
            for the express purpose of delivering the purchased product or
            service requested.
          </Text>
          <Heading as="h2" className="mt-[19px] ml-[190px] md:ml-0">
            Legal Requirements:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="w-[71%] md:w-full mt-3.5 ml-[190px] md:p-5 md:ml-0 text-justify leading-10"
          >
            Smart-CFO may disclose your Personal Data if required to do so by
            law or in response to valid requests by public authorities.
          </Text>
          <Heading size="lg" as="h2" className="mt-[70px] ml-[190px] md:ml-0">
            Data Security
          </Heading>
          <Heading as="h2" className="mt-9 ml-[190px] md:ml-0">
            Security Measures:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="mt-[21px] ml-[200px] md:ml-0 text-justify"
          >
            We implement a variety of security measures to maintain the safety
            of your personal information.
          </Text>
          <Heading as="h2" className="mt-[19px] ml-[190px] md:ml-0">
            Data Transmission:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="w-[71%] md:w-full mt-[15px] ml-[190px] md:p-5 md:ml-0 text-justify leading-10"
          >
            The transmission of information via the internet is not completely
            secure. While we do our best to protect your data, we cannot
            guarantee its absolute security.
          </Text>
          <Heading size="lg" as="h2" className="mt-[71px] ml-[190px] md:ml-0">
            Your Rights
          </Heading>
          <Heading as="h2" className="mt-[31px] ml-[190px] md:ml-0">
            Data Access and Control:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="w-[71%] md:w-full mt-[21px] ml-[190px] md:p-5 md:ml-0 text-justify leading-10"
          >
            You have the right to access your personal information, request a
            correction or deletion, or restrict the processing of your data.
          </Text>
          <Heading as="h2" className="mt-[22px] ml-[190px] md:ml-0">
            Opt-Out:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="w-[71%] md:w-full mt-[18px] ml-[190px] md:p-5 md:ml-0 text-justify leading-10"
          >
            You may opt-out of receiving marketing communications from us by
            following the unsubscribe link or instructions provided in any email
            we send.
          </Text>
          <Heading size="lg" as="h2" className="mt-[71px] ml-[190px] md:ml-0">
            Changes to This Privacy Policy
          </Heading>
          <Heading as="h2" className="mt-9 ml-[220px] md:ml-0">
            Updates:
          </Heading>
          <Text
            size="6xl"
            as="p"
            className="w-[72%] md:w-full mt-2.5 ml-[220px] md:p-5 md:ml-0 text-justify leading-10"
          >
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </Text>
          <div className="flex flex-col items-start mt-[31px] ml-[220px] gap-[22px] md:ml-0">
            <Heading as="h2">Effective Date:</Heading>
            <Text size="6xl" as="p" className="ml-2.5 md:ml-0 text-justify">
              Changes to this Privacy Policy are effective when they are posted
              on this page.
            </Text>
          </div>
          <a href="#" className="mt-11 ml-[220px] md:ml-0">
            <Heading as="h2">Contact Us</Heading>
          </a>
          <Text size="6xl" as="p" className="mt-[22px] ml-[230px] md:ml-0">
            If you have any questions about this Privacy Policy, please contact
            us
          </Text>
          <div className="flex md:flex-col mt-[55px] ml-[220px] gap-[27px] md:ml-0 mb-5">
            <div className="flex self-end items-center gap-[17px] md:p-5">
              <Img
                src="images/img_lock.svg"
                alt="lock_one"
                className="self-start h-[22px]"
              />
              <Text size="6xl" as="p" className="!font-medium">
                enquiry@poko-tech.com
              </Text>
            </div>
            <div className="flex self-start items-center gap-2.5 md:p-5">
              <Img
                src="images/img_call.svg"
                alt="call_one"
                className="self-end h-[22px] w-[23px]"
              />
              <Text size="6xl" as="p" className="!font-medium">
                647-355-5234
              </Text>
            </div>
          </div>
          {/* <footer className="flex flex-col self-stretch mt-[154px] gap-12 px-14 py-20 md:p-5 bg-gray-50">
            <div className="flex md:flex-col justify-between items-start w-full gap-5 mx-auto max-w-[1403px]">
              <Img
                src="images/img_image_360.png"
                alt="image360_three"
                className="w-[15%] md:w-full object-cover"
              />
              <div className="flex md:flex-col justify-center items-start w-[80%] md:w-full mt-[11px]">
                <div className="flex flex-col items-start gap-[19px]">
                  <Text
                    size="6xl"
                    as="p"
                    className="!text-gray-800_01 !font-medium"
                  >
                    Company
                  </Text>
                  <div className="flex flex-col items-start gap-[15px]">
                    <Text
                      size="lg"
                      as="p"
                      className="!text-gray-800_01 !text-[13.78px]"
                    >
                      About
                    </Text>
                    <a href="#">
                      <Text as="p" className="!text-gray-800_01">
                        Product Roadmap
                      </Text>
                    </a>
                    <a href="#">
                      <Text as="p" className="!text-gray-800_01">
                        API Reference
                      </Text>
                    </a>
                    <a href="Integrations" target="_blank" rel="noreferrer">
                      <Text
                        size="lg"
                        as="p"
                        className="!text-gray-800_01 !text-[13.67px]"
                      >
                        Integrations
                      </Text>
                    </a>
                    <a href="Blog" target="_blank" rel="noreferrer">
                      <Text as="p" className="!text-gray-800_01">
                        Blog
                      </Text>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-start md:self-stretch ml-[196px] gap-4 md:ml-0 flex-1">
                  <Text
                    size="5xl"
                    as="p"
                    className="!text-gray-800_01 !text-[19.84px]"
                  >
                    Features
                  </Text>
                  <div className="flex sm:flex-col self-stretch justify-between items-center gap-5">
                    <div className="flex flex-col items-start">
                      <Text
                        size="lg"
                        as="p"
                        className="!text-gray-800_01 !text-[13.89px]"
                      >
                        How it Works
                      </Text>
                      <a href="#" className="mt-[15px]">
                        <Text as="p" className="!text-gray-800_01">
                          All Features
                        </Text>
                      </a>
                      <a href="#" className="mt-4">
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.78px]"
                        >
                          Conditional Logic
                        </Text>
                      </a>
                      <a href="#" className="mt-3.5">
                        <Text as="p" className="!text-gray-800_01">
                          Role Based Assignments
                        </Text>
                      </a>
                      <a href="#" className="mt-[13px]">
                        <Text as="p" className="!text-gray-800_01">
                          Due Dates & Reminders
                        </Text>
                      </a>
                      <a href="#" className="mt-[15px]">
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Data Collection
                        </Text>
                      </a>
                      <a href="#" className="mt-[15px]">
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Detailed Process Documentation
                        </Text>
                      </a>
                      <a href="#" className="mt-3.5">
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.56px]"
                        >
                          Workflow Automations
                        </Text>
                      </a>
                      <a href="#" className="mt-[17px]">
                        <Text as="p" className="!text-gray-800_01">
                          Schedule Recurring
                        </Text>
                      </a>
                      <a href="#" className="mt-[15px]">
                        <Text as="p" className="!text-gray-800_01">
                          Import Runs
                        </Text>
                      </a>
                      <a href="#" className="mt-[13px]">
                        <Text as="p" className="!text-gray-800_01">
                          API and WebHooks
                        </Text>
                      </a>
                      <a href="#" className="mt-5">
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.78px]"
                        >
                          Zapier Integrations
                        </Text>
                      </a>
                    </div>
                    <div className="h-[369px] w-[38%] md:h-auto sm:w-full relative">
                      <div className="flex flex-col items-start gap-[15px]">
                        <Text as="p" className="!text-gray-800_01">
                          Summary View
                        </Text>
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Reminders & Notifications
                        </Text>
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Customizable Dashboards
                        </Text>
                        <Text as="p" className="!text-gray-800_01">
                          Reporting & Data Exports
                        </Text>
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Calendar Integration
                        </Text>
                        <Text as="p" className="!text-gray-800_01">
                          Departments & Roles
                        </Text>
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.67px]"
                        >
                          Permissions
                        </Text>
                        <Text as="p" className="!text-gray-800_01">
                          SAML SSO
                        </Text>
                        <Text as="p" className="!text-gray-800_01">
                          Organize with Tags
                        </Text>
                        <Text as="p" className="!text-gray-800_01">
                          Searchable Activity Logs
                        </Text>
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Comments & Mentions
                        </Text>
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Built in Process Improvement
                        </Text>
                      </div>
                      <ul className="flex flex-col items-start gap-[15px] bottom-[0.39px] right-0 left-0 m-auto absolute">
                        <li>
                          <a href="#">
                            <Text
                              size="lg"
                              as="p"
                              className="!text-gray-800_01 !text-[13.89px]"
                            >
                              Reminders & Notifications
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text
                              size="lg"
                              as="p"
                              className="!text-gray-800_01 !text-[13.89px]"
                            >
                              Customizable Dashboards
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text as="p" className="!text-gray-800_01">
                              Reporting & Data Exports
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text
                              size="lg"
                              as="p"
                              className="!text-gray-800_01 !text-[13.89px]"
                            >
                              Calendar Integration
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text as="p" className="!text-gray-800_01">
                              Departments & Roles
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text
                              size="lg"
                              as="p"
                              className="!text-gray-800_01 !text-[13.67px]"
                            >
                              Permissions
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text as="p" className="!text-gray-800_01">
                              SAML SSO
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text as="p" className="!text-gray-800_01">
                              Organize with Tags
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text as="p" className="!text-gray-800_01">
                              Searchable Activity Logs
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text
                              size="lg"
                              as="p"
                              className="!text-gray-800_01 !text-[13.89px]"
                            >
                              Comments & Mentions
                            </Text>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Text
                              size="lg"
                              as="p"
                              className="!text-gray-800_01 !text-[13.89px]"
                            >
                              Built in Process Improvement
                            </Text>
                          </a>
                        </li>
                        <a href="#">
                          <Text
                            size="lg"
                            as="p"
                            className="!text-gray-800_01 !text-[13.89px]"
                          >
                            Built in Process Improvement
                          </Text>
                        </a>
                        <a href="#">
                          <Text
                            size="lg"
                            as="p"
                            className="!text-gray-800_01 !text-[13.89px]"
                          >
                            Comments & Mentions
                          </Text>
                        </a>
                        <a href="#">
                          <Text as="p" className="!text-gray-800_01">
                            Searchable Activity Logs
                          </Text>
                        </a>
                        <a href="#">
                          <Text as="p" className="!text-gray-800_01">
                            Organize with Tags
                          </Text>
                        </a>
                        <a href="#">
                          <Text as="p" className="!text-gray-800_01">
                            SAML SSO
                          </Text>
                        </a>
                        <a href="#">
                          <Text
                            size="lg"
                            as="p"
                            className="!text-gray-800_01 !text-[13.67px]"
                          >
                            Permissions
                          </Text>
                        </a>
                        <a href="#">
                          <Text as="p" className="!text-gray-800_01">
                            Departments & Roles
                          </Text>
                        </a>
                        <a href="#">
                          <Text
                            size="lg"
                            as="p"
                            className="!text-gray-800_01 !text-[13.89px]"
                          >
                            Calendar Integration
                          </Text>
                        </a>
                        <a href="#">
                          <Text as="p" className="!text-gray-800_01">
                            Reporting & Data Exports
                          </Text>
                        </a>
                        <a href="#">
                          <Text
                            size="lg"
                            as="p"
                            className="!text-gray-800_01 !text-[13.89px]"
                          >
                            Customizable Dashboards
                          </Text>
                        </a>
                        <a href="#">
                          <Text
                            size="lg"
                            as="p"
                            className="!text-gray-800_01 !text-[13.89px]"
                          >
                            Reminders & Notifications
                          </Text>
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start ml-[123px] gap-[22px] md:ml-0">
                  <Text
                    size="6xl"
                    as="p"
                    className="!text-gray-800_01 !font-medium"
                  >
                    Resources
                  </Text>
                  <ul className="flex flex-col items-start ml-[3px] gap-3.5 md:ml-0">
                    <li>
                      <a href="#">
                        <Text as="p" className="!text-gray-800_01">
                          Help
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p" className="!text-gray-800_01">
                          Getting Started Guides
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p" className="!text-gray-800_01">
                          Video Center
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p" className="!text-gray-800_01">
                          Demos
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text
                          size="lg"
                          as="p"
                          className="!text-gray-800_01 !text-[13.89px]"
                        >
                          Your Account
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p" className="!text-gray-800_01">
                          Use Cases
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p" className="!text-gray-800_01">
                          Integrations
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text as="p" className="!text-gray-800_01">
                          Process Street Alternative
                        </Text>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full mb-[31px] gap-2 mx-auto max-w-[1488px]">
              <div className="h-px w-[97%] bg-gray-300" />
              <div className="flex md:flex-col items-start">
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
                    className="w-max bottom-[2.35px] right-0 left-0 m-auto !text-gray-800_01 !font-roboto text-right !text-[13.67px] absolute"
                  >
                    © Smart CFO 2024
                  </Text>
                </div>
              </div>
            </div>
          </footer> */}
        </div>
      </div>
    </>
  );
}

import React from "react";
import { Text, Button, Img } from "./..";

export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="flex md:flex-col self-start justify-between items-start w-full gap-5 mx-auto max-w-[1403px]">
        <Img src="images/img_image_360.png" alt="image360_three" className="w-[15%] md:w-full object-cover" />
        <div className="flex flex-col items-start mt-[11px] gap-[15px]">
          <div className="flex flex-wrap">
            <Text size="6xl" as="p" className="self-end !text-gray-800_01 !font-medium">
              Company
            </Text>
            <Text size="5xl" as="p" className="self-start ml-[223px] !text-gray-800_01 !text-[19.84px]">
              Features
            </Text>
            <Text size="6xl" as="p" className="self-start ml-[546px] !text-gray-800_01 !font-medium">
              Resources
            </Text>
          </div>
          <div className="flex md:flex-col items-start">
            <div className="flex flex-col items-start mt-1 gap-[15px]">
              <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.78px]">
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
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.67px]">
                  Integrations
                </Text>
              </a>
              <a href="Blog" target="_blank" rel="noreferrer">
                <Text as="p" className="!text-gray-800_01">
                  Blog
                </Text>
              </a>
            </div>
            <div className="flex flex-col items-start ml-[196px] md:ml-0">
              <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                How it Works
              </Text>
              <a href="#" className="mt-[15px]">
                <Text as="p" className="!text-gray-800_01">
                  All Features
                </Text>
              </a>
              <a href="#" className="mt-4">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.78px]">
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
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                  Data Collection
                </Text>
              </a>
              <a href="#" className="mt-[15px]">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                  Detailed Process Documentation
                </Text>
              </a>
              <a href="#" className="mt-3.5">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.56px]">
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
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.78px]">
                  Zapier Integrations
                </Text>
              </a>
            </div>
            <div className="flex flex-col items-start ml-[100px] gap-[15px] md:ml-0">
              <Text as="p" className="!text-gray-800_01">
                Summary View
              </Text>
              <a href="#">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                  Reminders & Notifications
                </Text>
              </a>
              <a href="#">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                  Customizable Dashboards
                </Text>
              </a>
              <a href="#">
                <Text as="p" className="!text-gray-800_01">
                  Reporting & Data Exports
                </Text>
              </a>
              <a href="#">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                  Calendar Integration
                </Text>
              </a>
              <a href="#">
                <Text as="p" className="!text-gray-800_01">
                  Departments & Roles
                </Text>
              </a>
              <a href="Permissions" target="_blank" rel="noreferrer">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.67px]">
                  Permissions
                </Text>
              </a>
              <a href="#">
                <Text as="p" className="!text-gray-800_01">
                  SAML SSO
                </Text>
              </a>
              <a href="#">
                <Text as="p" className="!text-gray-800_01">
                  Organize with Tags
                </Text>
              </a>
              <a href="#">
                <Text as="p" className="!text-gray-800_01">
                  Searchable Activity Logs
                </Text>
              </a>
              <a href="#">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                  Comments & Mentions
                </Text>
              </a>
              <a href="#">
                <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
                  Built in Process Improvement
                </Text>
              </a>
            </div>
            <ul className="flex flex-col items-start mt-[5px] ml-[126px] gap-3.5 md:ml-0">
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
                  <Text size="lg" as="p" className="!text-gray-800_01 !text-[13.89px]">
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
        <a href="Terms" target="_blank" rel="noreferrer" className="mt-1 ml-[13px] md:ml-0">
          <Text size="lg" as="p" className="!text-gray-900 !font-roboto !text-[13.67px]">
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
            <Button color="gray_50_19" shape="round" className="w-[28px]">
              <Img src="images/img_list_item_link.svg" />
            </Button>
            <Button color="gray_50_19" shape="round" className="w-[28px]">
              <Img src="images/img_list_item_link_gray_50_01.svg" />
            </Button>
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
    </footer>
  );
}

import React from "react";
import { Img } from "../../components/Img";
import { Text } from "../../components/Text";
import { Heading } from "../../components/Heading";
import { Buttons } from "../../components/Buttons";
import { Input } from "../../components/Input";

const BlogPage = () => {
  return (
    <div className="flex w-full flex-col items-center bg-white-A700">
      {/* header section */}
      <div className="h-[600px] self-stretch bg-[url(/public/images/img_group_116.png)] bg-cover bg-no-repeat pb-[108px] md:h-auto md:pb-5">
        {/* hero section */}
        <div className="flex flex-col items-center gap-[117px] md:gap-[87px] sm:gap-[58px] mt-12">
          <div className="container-sm flex flex-col mt-24  items-start pl-[120px] pr-14 md:p-5 md:px-5">
            <div className="flex w-[53%] flex-col gap-[45px] md:w-full">
              <Text
                size="9xl"
                as="p"
                className="w-[100%] leading-[70px] !text-gray-800_01 md:w-full para-heading font-fam"
              >
                <>
                  Insights and Updates <br />
                  from Smart-CFO
                </>
              </Text>
              <Text
                as="p"
                className="leading-10 !text-blue_gray-900_01 paragraph font-fam"
              >
                Welcome to our Blog & News page! Stay informed with the latest
                trends in financial analytics, updates from Smart-CFO, and
                insights from industry experts. Our blog is designed to help you
                navigate the complexities of financial management in the modern
                world.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* blog posts section */}
      <div className="container-sm mt-28 flex flex-col items-start gap-11 md:p-5">
        <Heading
          size="2xl"
          as="h1"
          className="para-heading font-fam !text-gray-800_01"
        >
          Latest Blog Posts
        </Heading>
        <div className="ml-[5px] flex gap-[29px] self-stretch md:ml-0 md:flex-col">
          <div className="flex w-full flex-col gap-[53px] sm:gap-[26px]">
            <Img
              src="images/img_rectangle_38.png"
              alt="image"
              className="h-[317px] rounded-md object-cover"
            />
            <div className="flex flex-col items-start">
              <Buttons
                color="indigo_A200_0c"
                size="xs"
                shape="round"
                className="min-w-[82px] font-worksans font-medium"
                style={{
                  color: "#4B6BFB",
                  background: "rgba(75, 107, 251, 0.05)",
                }}
              >
                Finance
              </Buttons>
              <Heading
                size="s"
                as="h2"
                className="ml-[3px] mt-3 leading-9 !text-gray-900 md:ml-0"
              >
                The Future of Financial Analytics: How the AI is Changing the
                Game
              </Heading>
              <Text
                as="p"
                className="ml-[3px] leading-10 !text-blue_gray-900_01 md:ml-0"
                style={{
                  fontSize: "18px",
                }}
              >
                Explore how the AI and the ML are revolutionizing financial
                analytics, offering predictive insights, and shaping the future
                of financial decision-making.
              </Text>
            </div>
          </div>
          <div className="flex w-full flex-col gap-[53px] sm:gap-[26px]">
            <Img
              src="images/img_rectangle_6123.png"
              alt="image"
              className="h-[317px] rounded-md object-cover"
            />
            <div className="flex flex-col items-start">
              <Buttons
                color="indigo_A200_0c"
                size="xs"
                shape="round"
                className="min-w-[82px] font-worksans font-medium"
                style={{
                  color: "#4B6BFB",
                  background: "#4B6BFB0D",
                }}
              >
                Finance
              </Buttons>
              <Heading
                size="s"
                as="h3"
                className="ml-[3px] mt-3 leading-9 !text-gray-900 md:ml-0"
              >
                <>
                  Maximizing Your Financial Health: Tips from Smart-CFO Experts
                  <br />
                </>
              </Heading>
              <Text
                as="p"
                className="ml-[3px] leading-10 !text-blue_gray-900_01 md:ml-0"
                style={{
                  fontSize: "18px",
                }}
              >
                Get practical tips on financial management and optimization from
                Smart-CFO’s team of seasoned experts."
              </Text>
            </div>
          </div>
          <div className="flex w-full flex-col items-start ">
            <Img
              src="images/img_rectangle_6124.png"
              alt="image"
              className="h-[317px] w-full rounded-md object-cover md:h-auto"
            />
            <Buttons
              color="indigo_A200_0c"
              size="xs"
              shape="round"
              className="mt-[53px] min-w-[82px] font-worksans font-medium"
              style={{
                color: "#4B6BFB",
                background: "#4B6BFB0D",
              }}
            >
              Finance
            </Buttons>
            <div className="relative mt-3 h-[215px] self-stretch">
              <Text
                as="p"
                className="absolute bottom-[0.00px] left-0 right-0  w-[98%] leading-10 !text-blue_gray-900_01 mb-[-13px]"
                style={{
                  fontSize: "18px",
                }}
              >
                Discover the importance of real-time data in today’s fast-paced
                business environment and how Smart-CFO makes it accessible.
              </Text>
              <Heading
                size="s"
                as="h4"
                className="absolute left-0 right-0 top-[0.00px] m-auto leading-9 !text-gray-900"
              >
                <>
                  Understanding Real-Time Data for Agile Financial Management
                  <br />
                </>
              </Heading>
            </div>
          </div>
        </div>
      </div>

      {/* industry news section */}
      <div className="container-sm mt-[141px] md:p-5">
        <div className="flex flex-col items-start gap-[66px] sm:gap-[33px]">
          <Heading
            size="2xl"
            as="h2"
            className="para-heading font-fam !text-gray-800_01"
          >
            Industry News
          </Heading>
          <div className="ml-2 flex w-90 gap-8 self-stretch md:ml-0 md:flex-col">
            <div
              style={{
                width: "472px",
              }}
            >
              <Heading
                size="s"
                as="h3"
                className="leading-9 !text-gray-900 mb-[50px] font-fam industry"
              >
                Smart-CFO Integrates with Major ERP Systems
              </Heading>
              <Text
                as="p"
                className="leading-10 !text-blue_gray-900_01 paragraph font-fam"
              >
                Smart-CFO now offers seamless integration with leading ERP
                systems, enhancing data synchronization and workflow efficiency.
              </Text>
            </div>
            <div
              className=""
              style={{
                width: "472px",
              }}
            >
              <Heading
                size="s"
                as="h4"
                className="leading-9 !text-gray-900 mb-5 font-fam industry"
              >
                Smart-CFO at the Forefront: Attending the Global Finance Tech
                Conference
              </Heading>
              <Text
                as="p"
                className="leading-10 !text-blue_gray-900_01 paragraph font-fam"
              >
                Join us at the upcoming Global Finance Tech Conference where
                Smart-CFO will be showcasing its latest features and
                innovations.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

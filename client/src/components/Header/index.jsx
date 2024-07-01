import React from "react";
import { Button, Text, Heading, Img } from "./..";

export default function Header({ ...props }) {
  return (
    <header {...props}>
      <div className="flex md:flex-col self-stretch justify-between items-center gap-5 p-2.5 z-[1] bg-white-A700 shadow-xs">
        <Img
          src="images/img_image_360_76x206.png"
          alt="image360_one"
          className="w-[14%] md:w-full ml-[105px] md:ml-0 object-cover"
        />
        <div className="flex md:flex-col justify-between items-center w-[51%] md:w-full mr-[109px] gap-5 md:mr-0">
          <div className="flex justify-between w-[59%] md:w-full gap-5 flex-wrap">
            <a href="Home" target="_blank" rel="noreferrer">
              <Heading size="xs" as="h5" className="!text-teal-300 text-center">
                Home
              </Heading>
            </a>
            <a href="About" target="_blank" rel="noreferrer">
              <Text size="6xl" as="p" className="text-center">
                About
              </Text>
            </a>
            <a href="Services" target="_blank" rel="noreferrer">
              <Text size="6xl" as="p" className="text-center">
                Services
              </Text>
            </a>
            <a href="Features" target="_blank" rel="noreferrer">
              <Text size="6xl" as="p" className="text-center">
                Features
              </Text>
            </a>
          </div>
          <a href="Contact" target="_blank" rel="noreferrer">
            <Text size="6xl" as="p" className="text-center">
              Contact
            </Text>
          </a>
          <Button
            size="md"
            className="sm:px-5 font-poppins font-medium min-w-[121px] rounded-[35px]"
          >
            Login
          </Button>
        </div>
      </div>
      <div className="h-[3px] w-[43px] mt-[-3px] mr-[445px] md:mr-0 relative bg-teal-300" />
    </header>
  );
}

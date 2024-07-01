import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Logo from "../Assets/Images/logoUpdate.png";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
const shapes = {
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    black_900: "bg-black-900 text-gray-600",
  },
};
const sizes = {
  xs: "h-[49px] pl-[15px] pr-[35px] text-[13px]",
};

const Footer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleNavigation = (str) => {
    if (str === "home") {
      navigate("/");
    } else if (str === "about") {
      navigate("/aboutus");
    } else if (str === "services") {
      navigate("/services");
    } else if (str === "careers") {
      navigate("/careers");
    } else if (str === "news") {
      navigate("/news-blogs");
    } else if (str === "contact") {
      navigate("/contactus");
    } else if (str === "terms") {
      navigate("/privacy-policy");
    }
  };

  const handleSubscibe = () => {
    let newError = "";
    if (!data) {
      newError = "Please enter an email address.";
    } else {
      newError = "";
    }

    setError(newError);

    if (!newError) {
      setData("");
      toast.success("You have been subscribed to our newsletter!");
    }
  };

  const handleSocialLinks = (str) => {
    if (str === "facebook") {
      navigate("https://facebook.com");
    }
  };
  return (
    <div className="flex w-full flex-col items-center bg-white-A700">
      {/* footer section */}
      <Toaster />
      <footer className="mt-[59px] flex items-end justify-center self-stretch bg-black-900 py-[37px] sm:py-5">
        <div className="container-sm mt-[22px] flex justify-center md:p-5">
          <div className="flex w-full flex-col gap-11">
            <div className="flex items-end md:flex-col">
              <Img
                src={Logo}
                alt="screenshot2024"
                className="h-[88px] w-[11%] object-cover md:w-full"
              />
              <div className="ml-9 flex w-[39%] flex-col items-start gap-2.5 md:ml-0 md:w-full">
                <Text as="p" className="!font-medium">
                  Stay Ahead of the Curve
                </Text>
                <Text size="xl" as="p" className="leading-[21px]">
                  Subscribe to our newsletter for regular updates, industry
                  insights, and exclusive content from Smart-CFO.
                </Text>
              </div>
              <div className="mb-[7px] ml-[35px] flex flex-1 md:ml-0 md:self-stretch sm:flex-col">
                <div>
                  <Input
                    shape="square"
                    type="email"
                    name="email"
                    placeholder={`name@gmail.com`}
                    className="flex-grow sm:pr-5 borderbox"
                    value={data}
                    onChange={setData}
                  />
                  {error && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "red",
                        display: "flex",
                      }}
                    >
                      {error}
                    </Typography>
                  )}
                </div>
                <Button
                  size="sm"
                  shape="square"
                  className="min-w-[144px] border border-solid border-white-A700 font-medium text-black-900 w-[199px]"
                  onClick={() => handleSubscibe()}
                >
                  Subscribe Now!
                </Button>
              </div>
              <button
                size="md"
                shape="round"
                className="mb-[7px] ml-[243px] w-[65px] md:ml-0"
                style={{
                  background: "white",
                  padding: "12px 9px",
                  borderRadius: "7px",
                }}
                onClick={() => {
                  window.open("https://www.facebook.com/", "_blank");
                }}
              >
                <Img src="images/img_facebook.svg" />
              </button>
              <button
                size="md"
                shape="round"
                className="mb-[7px] ml-[22px] w-[65px] md:ml-0"
                style={{
                  background: "white",
                  padding: "15px 9px",
                  borderRadius: "7px",
                }}
                onClick={() => {
                  window.open("https://www.twitter.com/", "_blank");
                }}
              >
                <Img src="images/img_trash.svg" />
              </button>
            </div>
            <div className="flex items-start self-start md:flex-col">
              <a
                onClick={() => handleNavigation("home")}
                className="cursor-pointer"
              >
                <Text size="xl" as="p">
                  Home
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="ml-[27px] !text-[11.88px] !text-white-A700_66 md:ml-0"
              >
                /
              </Text>
              <a
                className="ml-[25px] md:ml-0 cursor-pointer"
                onClick={() => handleNavigation("about")}
              >
                <Text size="lg" as="p" className="!text-[13.67px] w-[62px]">
                  About Us
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="ml-[29px] !text-[11.88px] !text-white-A700_66 md:ml-0"
              >
                /
              </Text>
              <a
                onClick={() => handleNavigation("services")}
                className="ml-[25px] md:ml-0 cursor-pointer"
              >
                <Text size="xl" as="p">
                  Services
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="ml-[29px] !text-[11.88px] !text-white-A700_66 md:ml-0"
              >
                /
              </Text>
              <div className="mb-[3px] ml-9 flex flex-wrap items-center gap-[18px] md:ml-0">
                <a
                  onClick={() => handleNavigation("careers")}
                  className="cursor-pointer"
                >
                  <Text size="xl" as="p">
                    Careers
                  </Text>
                </a>
              </div>
              <Text
                size="s"
                as="p"
                className="self-start !text-[11.88px] !text-white-A700_66 ml-6"
              >
                /
              </Text>
              <a
                className="ml-[25px] md:ml-0 cursor-pointer"
                onClick={() => handleNavigation("news")}
                s
              >
                <Text size="lg" as="p" className="!text-[13.67px] w-[90px]">
                  News & Blogs
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="ml-[30px] !text-[11.88px] !text-white-A700_66 md:ml-0"
              >
                /
              </Text>
              <a
                className="ml-[25px] md:ml-0  cursor-pointer"
                onClick={() => handleNavigation("contact")}
              >
                <Text size="xl" as="p" className="w-[75px]">
                  Contact Us
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="ml-[27px] !text-[11.88px] !text-white-A700_66 md:ml-0"
              >
                /
              </Text>
              <a
                className="ml-[25px] md:ml-0 cursor-pointer"
                onClick={() => handleNavigation("terms")}
              >
                <Text size="xl" as="p" className="w-[107px]">
                  Privacy & Policy
                </Text>
              </a>
              <Text
                size="s"
                as="p"
                className="ml-[27px] !text-[11.88px] !text-white-A700_66 md:ml-0"
              >
                /
              </Text>
              <a
                className="ml-[25px] md:ml-0 cursor-pointer"
                onClick={() => handleNavigation("terms")}
              >
                <Text size="lg" as="p" className="!text-[13.67px]">
                  Terms
                </Text>
              </a>
              <Text
                size="lg"
                as="p"
                className="ml-[250px] text-right !text-[13.67px] !font-normal md:ml-0 w-[130px]"
              >
                © Smart CFO 2024
              </Text>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

const shapesBtn = {
  square: "rounded-[0px]",
  round: "rounded-md",
};
const variantsBtn = {
  fill: {
    deep_purple_300: "bg-deep_purple-300 text-white-A700",
    teal_300: "bg-teal-300 text-white-A700",
    white_A700: "bg-white-A700",
    indigo_A200_0c: "bg-indigo-A200_0c text-indigo-A200",
    black_900: "bg-black-900 text-white-A700",
  },
};
const sizesBtn = {
  lg: "h-[71px] px-[30px] text-[22px]",
  sm: "h-[49px] px-5 text-[13px]",
  xs: "h-[28px] px-2.5 text-base",
  md: "h-[49px] px-[9px]",
  xl: "h-[86px] px-[35px] text-[22px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  onClick,
  size = "xl",
  color = "white_A700",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${
        (shape && shapesBtn[shape]) || ""
      } ${(size && sizesBtn[size]) || ""} ${
        (variant && variantsBtn[variant]?.[color]) || ""
      }`}
      {...restProps}
      onClick={onClick}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["lg", "sm", "xs", "md", "xl"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf([
    "deep_purple_300",
    "teal_300",
    "white_A700",
    "indigo_A200_0c",
    "black_900",
  ]),
};

export { Button };

const Img = ({
  className,
  src = "defaultNoData.png",
  alt = "testImg",
  ...restProps
}) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...restProps}
      loading={"lazy"}
    />
  );
};
export { Img };

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      value,
      shape,
      variant = "fill",
      size = "xs",
      color = "black_900",
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <div
          className={`${className} flex items-center justify-center text-gray-600 text-[13.67px] font-medium border-white-A700 border border-solid bg-black-900  ${
            (shape && shapes[shape]) || ""
          } ${variants[variant]?.[color] || variants[variant] || ""} ${
            sizes[size] || ""
          }`}
          style={{
            background: "black",
          }}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            type={type}
            name={name}
            id="unique"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
            style={{
              background: "black",
              color: "#767676",
              border: "0px",
              "::placeholder": {
                color: "white",
              },
            }}
            className="borderbox"
          />
          {!!suffix && suffix}
        </div>
      </>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["black_900"]),
};

export { Input };

const sizesText = {
  "5xl": "text-[21px] font-medium",
  "6xl": "text-2xl font-medium md:text-[22px]",
  "7xl": "text-[26px] font-medium md:text-2xl sm:text-[22px]",
  "8xl": "text-3xl font-normal md:text-[28px] sm:text-[26px]",
  "2xl": "text-base font-normal",
  "3xl": "text-[17px] font-medium",
  "4xl": "text-xl font-normal",
  xs: "text-[7px] font-normal",
  lg: "text-[13px] font-medium",
  s: "text-[11px] font-medium",
  xl: "text-sm font-medium",
  "9xl": "text-[50px] font-medium md:text-[46px] sm:text-[40px]",
  md: "text-xs font-normal",
};

const Text = ({ children, className = "", as, size = "4xl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-white-A700 font-inter ${className} ${sizesText[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };

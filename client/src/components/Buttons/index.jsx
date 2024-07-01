import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-md",
};
const variants = {
  fill: {
    teal_300: "bg-teal-300 text-white-A700",
    black_900: "bg-black-900 text-white-A700",
    deep_purple_300_01: "bg-deep_purple-300_01 text-white-A700",
    gray_50_19: "bg-gray-50_19",
  },
};
const sizes = {
  lg: "h-[78px] px-[35px] text-[22px]",
  xl: "h-[86px] px-[35px] text-[22px]",
  sm: "h-[61px] px-[21px] text-xl",
  md: "h-[71px] px-[30px] text-[22px]",
  xs: "h-[28px] px-[7px]",
};

const Buttons = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "deep_purple_300_01",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${
        (shape && shapes[shape]) || ""
      } ${(size && sizes[size]) || ""} ${
        (variant && variants[variant]?.[color]) || ""
      }`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Buttons.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["lg", "xl", "sm", "md", "xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf([
    "teal_300",
    "black_900",
    "deep_purple_300_01",
    "gray_50_19",
  ]),
};

export { Buttons };

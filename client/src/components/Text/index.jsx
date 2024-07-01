import React from "react";

const sizes = {
  "5xl": "text-[19px] font-medium",
  "6xl": "text-xl font-normal",
  "7xl": "text-[21px] font-medium",
  "8xl": "text-[26px] font-medium md:text-2xl sm:text-[22px]",
  "2xl": "text-base font-normal",
  "3xl": "text-[17px] font-medium",
  "4xl": "text-lg font-normal",
  xs: "text-[7px] font-normal",
  lg: "text-[13px] font-normal",
  s: "text-[11px] font-normal",
  xl: "text-sm font-normal",
  "9xl": "text-3xl font-medium md:text-[28px] sm:text-[26px]",
  "10xl": "text-[50px] font-medium md:text-[46px] sm:text-[40px]",
  md: "text-xs font-normal",
};

const Text = ({ children, className = "", as, size = "xl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };

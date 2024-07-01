import React from "react";

const sizes = {
  "2xl": "text-6xl font-bold md:text-[52px] sm:text-[46px]",
  xl: "text-[50px] font-bold md:text-[46px] sm:text-[40px]",
  s: "text-3xl font-semibold md:text-[28px] sm:text-[26px]",
  md: "text-[40px] font-bold md:text-[38px] sm:text-4xl",
  xs: "text-xl font-bold",
  lg: "text-[45px] font-semibold md:text-[41px] sm:text-[35px]",
};

const Heading = ({ children, className = "", size = "s", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-black-900 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };

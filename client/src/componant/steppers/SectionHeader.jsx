import React from "react";
import { Box, Grid } from "@mui/material";
const SectionHeader = ({
  homeImage,
  direction,
  headingImage,
  heading,
  paragraph,
  sideImage,
  id,
}) => {
  return (
    <div
      style={{
        // position: "absolute",
        backgroundImage: `url(${homeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
      id={id && id}
    >
      <Box
        container
        className="flex align-items-center"
        style={{
          paddingLeft: "5rem",
          paddingRight: "5rem",
          flexDirection: direction,
        }}
      >
        <Box
          className="flex flex-col justify-start p-4"
          style={{
            marginLeft: "50px",
          }}
        >
          <h2 className="flex flex-row items-center sec-heading">
            <img
              src={headingImage}
              alt=""
              style={{
                width: "70px",
                height: "70px",
                marginRight: "12px",
              }}
            />
            {heading}
          </h2>
          <p className="sec-para mt-3 ">{paragraph}</p>
        </Box>
        <Box>
          <img
            src={sideImage}
            alt=""
            className="image-responsivetwo ms-md-5"
            style={{
              width: "604px",
              height: "474px",
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SectionHeader;

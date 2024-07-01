import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Typography, Grid } from "@mui/material";
import Avatar from "../src/Assets/Images/Avatar.png";
export default function Carousel() {
  const sliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
  };
  const hotelCards = [
    {
      imageSrc: "../Assets/Images/Avatar.png",
      title: "Studio Room",
      description:
        "We will asked your permission to remove unwanted subscriptions to analyzing how often you are in using them.",
      pricingText: "USD 50/Day",
      features: ["Free Wifi", "Free breakfast"],
    },
    {
      imageSrc: "../src/Assets/Images/Avatar.png",
      title: "Deluxe Room",
      description:
        "We will asked your permission to remove unwanted subscriptions to analyzing how often you are in using them.",
      pricingText: "USD 80/Day",
      features: ["Free Wifi", "Free breakfast"],
    },
    {
      imageSrc: "../src/Assets/Images/Avatar.png",
      title: "King Deluxe Room",
      description:
        "We will asked your permission to remove unwanted subscriptions to analyzing how often you are in using them.",
      pricingText: "USD 150/Day",
      features: ["Free Wifi", "Free breakfast", "Discounted Meals"],
    },
    // {
    //   imageSrc: "../src/Assets/Images/Avatar.png",
    //   title: "King Deluxe Room",
    //   description:
    //     "We will asked your permission to remove unwanted subscriptions to analyzing how often you are in using them.",
    //   pricingText: "USD 150/Day",
    //   features: ["Free Wifi", "Free breakfast", "Discounted Meals"],
    //   name: ''
    // },
  ];

  return (
    <div className="content mt-md-5">
      <Slider {...sliderSettings}>
        {hotelCards.map((card, index) => (
          <div
            className="d-flex h-100 justify-content-center space-between align-items-center "
            style={{ padding: "4px" }}
          >
            <div
              className="card border-0 "
              style={{ backgroundColor: "#F9F9F9", margin: "12px" }}
            >
              <div className="card-body">
                <div key={index}>
                  <Grid
                    container
                    sx={{ alignItems: "center", paddingY: "8px" }}
                  >
                    <Grid item md={4} lg={4}>
                      <img
                        alt={card.title}
                        src={Avatar}
                        width="100"
                        height="100"
                      />
                    </Grid>
                    <Grid item md={8} lg={8}>
                      <Typography
                        sx={{
                          fontsize: "20px",
                          color: "#000000",
                          fontWeight: "600",
                        }}
                      >
                        Sara Tencredi
                      </Typography>

                      <Typography
                        className="mt-md-3"
                        sx={{
                          fontsize: "12px",
                          color: "#222",
                          fontWeight: "600",
                        }}
                      >
                        37 y.o - Freelancer
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className="mt-md-4"
                    sx={{ alignItems: "center" }}
                  >
                    <Grid item md={6} lg={6}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "gray",
                          fontWeight: "400",
                        }}
                      >
                        Property 7-years old
                      </Typography>
                    </Grid>
                    <Grid item md={3} lg={3}>
                      <Typography sx={{ fontSize: "16px", color: "gray" }}>
                        Canada
                      </Typography>
                    </Grid>
                    <Grid item md={3} lg={3}>
                      <Typography sx={{ fontSize: "16px", color: "gray" }}>
                        $700,00
                      </Typography>
                    </Grid>
                  </Grid>
                  <hr
                    className="mt-md-3"
                    sx={{ marginTop: "1px", fontSize: "19px", color: "#222" }}
                  />

                  <Typography
                    sx={{
                      fontsize: "16px",
                      color: "#222",
                      fontWeight: "400",
                      paddingY: "12px",
                      textAlign: "justify",
                    }}
                  >
                    {card.description}
                  </Typography>
                </div>
                <div className="d-flex justify-content-start">
                  <Button
                    color="primary"
                    variant="contained"
                    className="mt-md-4 rounded-0"
                    sx={{
                      padding: "8px 28px",
                      textTransform: "capitalize",
                      letterSpacing: 0.9,
                      fontSize: "18px",
                    }}
                  >
                    See Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

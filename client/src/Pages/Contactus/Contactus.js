import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseURL } from "../../axios/axios";
import HomeBack from "../../Assets/Images/homeback.png";
import Map from "../../Assets/Images/map.png";
import Pin from "../../Assets/Images/pin.png";
import PhoneNumber from "../../Assets/Images/phonenumber.png";
import Message from "../../Assets/Images/message.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
const Contactus = () => {
  const navigate = useNavigate();

  const [faqData, setFaqData] = useState("");
  const [faqError, setFaqError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [placeholders, setPlaceholders] = useState({
    name: "Type Name",
    phone: "000 0000 000",
    email: "Type Email Address",
    message: "Type your message here",
  });

  const handleInputFocus = (field) => {
    setPlaceholders({ ...placeholders, [field]: "" });
  };

  const handleInputBlur = (field) => {
    if (!formData[field]) {
      if (field === "name") {
        setPlaceholders({
          ...placeholders,
          [field]: "Type Name",
        });
      }
      if (field === "phone") {
        setPlaceholders({
          ...placeholders,
          [field]: "000 0000 000",
        });
      }
      if (field === "email") {
        setPlaceholders({
          ...placeholders,
          [field]: "Type Email Address",
        });
      }
      if (field === "message") {
        setPlaceholders({
          ...placeholders,
          [field]: "Type your message here",
        });
      }
    }
  };

  const handleFormSubmit = async () => {
    const { name, phone, email, message } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {};
    if (!name) {
      newErrors.name = "Please enter your full name.";
    }
    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    }
    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!message) {
      newErrors.message = "Please enter your message.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post(`${baseURL}query/add-Query`, {
          ...formData,
        });

        if (res.success === true) {
          toast.success(
            "Your Email has been received! Someone will contact you soon."
          );
        }
      } catch (e) {
        console.log(e);
      }
      toast.success(
        "Your Email has been received! Someone will contact you soon."
      );
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  const handleFormSubmitDAQ = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newErrors = "";

    if (!faqData) {
      newErrors = "Please enter your email address.";
    } else if (!emailPattern.test(faqData)) {
      newErrors = "Please enter a valid email address.";
    }

    setFaqError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success(
        "Your Email has been received! Someone will contact you soon."
      );
      setFaqData("");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = () => {
    navigate("/features");
  };

  const faqSubmit = () => {
    toast.success(
      "Your Email has been received! Someone will contact you soon."
    );
  };

  return (
    <Box className="w-full bg-[url(/public/images/Vector1.png)] bg-cover bg-no-repeat  ">
      <div
        style={{
          // position: "absolute",
          backgroundImage: `url(${HomeBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container
          style={{
            paddingTop: "80px",
            paddingBottom: "15px",
          }}
        >
          <Grid container justifyContent="flex-start">
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Typography
                sx={{ fontWeight: "500", fontSize: "48px" }}
                className="mb-2"
              >
                Get in Touch with
              </Typography>
              <button className="mb-2 btn-style" onClick={handleNavigation}>
                <span>Smart CFO</span>{" "}
              </button>

              <p className="sec-para font-fam">
                Have questions, need support, or interested in learning how
                SmartCFO can solve your financial management challenges? We're
                here to help! Reach out to us using the contact information
                below, or fill out the contact form, and we'll get back to you
                promptly.
              </p>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={6}
              className="text-end"
              style={{
                padding: "40px",
              }}
            >
              <Grid item xs={12}>
                <Box className="flex flex-col justify-start items-baseline mb-2">
                  {" "}
                  <Grid xs={12}>
                    <label className="font-fam label">Full Name*</label>
                  </Grid>
                  <Grid xs={12} className="w-full">
                    <TextField
                      id="standard-basic"
                      placeholder={placeholders.name}
                      variant="standard"
                      margin="normal"
                      fullWidth
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      inputProps={{
                        style: {
                          fontSize: "30px",
                          fontWeight: "600",
                          font: "inter",
                          lineHeight: "47.1",
                          color: "black ",
                          opacity: "1",
                        },
                      }}
                      onFocus={() => handleInputFocus("name")}
                      onBlur={() => handleInputBlur("name")}
                    />
                    {errors?.name && (
                      <Typography
                        variant="body2"
                        sx={{ color: "red", display: "flex" }}
                      >
                        {errors?.name}
                      </Typography>
                    )}
                  </Grid>
                </Box>

                <Box className="flex flex-col justify-start items-baseline">
                  {" "}
                  <Grid xs={12}>
                    <label className="font-fam label">Phone Number</label>
                  </Grid>
                  <Grid xs={12} className="w-full">
                    <TextField
                      id="standard-basic"
                      placeholder={placeholders.phone}
                      variant="standard"
                      margin="normal"
                      fullWidth
                      type="number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      onFocus={() => handleInputFocus("phone")}
                      onBlur={() => handleInputBlur("phone")}
                      inputProps={{
                        style: {
                          fontSize: "30px", // Adjust the font size as needed
                          fontWeight: "600",
                          font: "inter",
                          lineHeight: "47.1",
                          color: "black ",
                          opacity: "1",
                        },
                      }}
                    />
                    {errors?.phone && (
                      <Typography
                        variant="body2"
                        sx={{ color: "red", display: "flex" }}
                      >
                        {errors?.phone}
                      </Typography>
                    )}
                  </Grid>
                </Box>
                <Box className="flex flex-col justify-start items-baseline">
                  {" "}
                  <Grid xs={12}>
                    <label className="font-fam label">Email Address</label>
                  </Grid>
                  <Grid xs={12} className="w-full">
                    <TextField
                      placeholder={placeholders.email}
                      fullWidth
                      variant="standard"
                      margin="normal"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => handleInputFocus("email")}
                      onBlur={() => handleInputBlur("email")}
                      inputProps={{
                        style: {
                          fontSize: "30px",
                          fontWeight: "600",
                          font: "inter",
                          lineHeight: "47.1",
                          color: "black ",
                          opacity: "1",
                        },
                      }}
                    />

                    {errors?.email && (
                      <Typography
                        variant="body2"
                        sx={{ color: "red", display: "flex" }}
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </Grid>
                </Box>
                <Box className="flex flex-col justify-start items-baseline">
                  {" "}
                  <Grid xs={12}>
                    <label className="font-fam label">Message</label>
                  </Grid>
                  <Grid xs={12} className="w-full">
                    <TextField
                      margin="normal"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      id="standard-multiline-static"
                      placeholder={placeholders.message}
                      multiline
                      rows={3}
                      fullWidth
                      variant="standard"
                      onFocus={() => handleInputFocus("message")}
                      onBlur={() => handleInputBlur("message")}
                      inputProps={{
                        style: {
                          fontSize: "30px",
                          fontWeight: "600",
                          font: "inter",
                          color: "black ",
                        },
                      }}
                    />
                    {errors?.message && (
                      <Typography
                        variant="body2"
                        sx={{ color: "red", display: "flex" }}
                      >
                        {errors.message}
                      </Typography>
                    )}
                  </Grid>
                </Box>

                <Grid item xs={1}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleFormSubmit}
                    className="my-4 "
                    sx={{
                      padding: "8px 20px",
                      textTransform: "capitalize",
                      letterSpacing: 0.9,
                      fontSize: "18px",
                      borderRadius: "25px",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "5rem" }}></Grid>
        </Container>
      </div>
      <div
        style={{
          backgroundImage: `url(${Map})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "723px",
        }}
      >
        <Box
          style={{
            background: "white",
            borderRadius: "20px",
            position: "relative",
            width: "604px",
            height: "328px",
            top: "12%",
            left: "15%",
            padding: "35px",
            marginBottom: "10px",
          }}
        >
          <h3 className="card-heading mb-3 font-fam">Contact Us</h3>
          <p className="card-para mb-3 font-fam">
            Email, call, or complete the form to learn how SmartCFO can solve
            your financial management challenges.
          </p>
          <p className="mb-3 font-fam card-para flex flex-row items-center">
            <img
              src={Message}
              alt=""
              className="mr-3"
              style={{
                width: "29.1px",
                height: "22.6px",
              }}
            />
            enquiry@poko-tech.com
          </p>
          <Box className="flex flex-row justify-between">
            <p className="mb-3 font-fam card-para flex flex-row items-center justify-between">
              <img
                src={PhoneNumber}
                alt=""
                className="mr-3"
                style={{
                  width: "29.1px",
                  height: "23.6px",
                }}
              />
              647-355-5234
            </p>
            <p
              className="mb-3 font-fam card-para"
              style={{
                textDecoration: "underline",
              }}
            >
              customer support
            </p>
          </Box>
        </Box>
        <Box
          style={{
            background: "white",
            borderRadius: "20px",
            position: "relative",
            width: "604px",
            height: "210px",
            top: "15%",
            left: "15%",
            padding: "35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <h3 className="card-heading mb-3 font-fam">Headquarters</h3>
          <p className="card-para mb-3 font-fam">
            Visit us at our office for a more personal interaction.
          </p>
          <p className="mb-3 font-fam card-para2 flex flex-row items-center">
            <img
              src={Pin}
              alt=""
              className="mr-3"
              style={{
                width: "24.1px",
                height: "29.6px",
              }}
            />
            205 Grandview Way, North York, ON, M2N 6V3
          </p>
        </Box>
      </div>

      <div className="p-32 w-full flex flex-row justify-between">
        <div className="w-35 flex flex-col">
          <p className=" faq font-fam ">FAQ</p>
          <h2 className="faq-heading font-fam mb-3">Have a quick question?</h2>
          <p className="faq-para font-fam mb-4">
            For immediate answers to common queries.
          </p>
          <input
            placeholder="Your Email"
            type="text"
            className="mb-3 faq-input"
            value={faqData}
            onChange={(e) => {
              setFaqData(e.target.value);
            }}
          ></input>
          {faqError && (
            <Typography
              variant="body2"
              sx={{ color: "red", display: "flex" }}
              className="mb-3"
            >
              {faqError}
            </Typography>
          )}
          <button
            style={{
              color: "white",
              border: "0px",
              width: "120px",
              padding: "13px 0px",
              borderRadius: "60px",
              background: "black",
              textTransform: "capitalize",
              letterSpacing: 0.8,
              fontSize: "18px",
              fontWeight: 600,
            }}
            onClick={() => handleFormSubmitDAQ()}
          >
            <span>Submit</span>{" "}
          </button>
        </div>
        <div className="w-65 mt-20">
          <Accordion className="mb-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h3 className="sec-heading">What is Smart CFO?</h3>
            </AccordionSummary>
            <AccordionDetails>
              Smart-CFO is an advanced financial analytics and reporting
              software that integrates AI and ML technologies to provide
              real-time insights and predictive analytics for your business’s
              financial management.
            </AccordionDetails>
          </Accordion>
          <Accordion className="mb-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h3 className="sec-heading">
                Who can benefit from using Smart-CFO?
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              Smart-CFO is an advanced financial analytics and reporting
              software that integrates AI and ML technologies to provide
              real-time insights and predictive analytics for your business’s
              financial management.
            </AccordionDetails>
          </Accordion>
          <Accordion className="mb-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h3 className="sec-heading">
                How does Smart-CFO integrate with existing systems?
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              Smart-CFO is an advanced financial analytics and reporting
              software that integrates AI and ML technologies to provide
              real-time insights and predictive analytics for your business’s
              financial management.
            </AccordionDetails>
          </Accordion>

          <Accordion className="mb-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h3 className="sec-heading">Is my data secure with Smart-CFO?</h3>
            </AccordionSummary>
            <AccordionDetails>
              Smart-CFO is an advanced financial analytics and reporting
              software that integrates AI and ML technologies to provide
              real-time insights and predictive analytics for your business’s
              financial management.
            </AccordionDetails>
          </Accordion>
          <Accordion className="mb-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h3 className="sec-heading">
                Can I customize the dashboard according to my needs?
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              Smart-CFO is an advanced financial analytics and reporting
              software that integrates AI and ML technologies to provide
              real-time insights and predictive analytics for your business’s
              financial management.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Box>
  );
};

export default Contactus;

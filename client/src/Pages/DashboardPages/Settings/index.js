import React, { useEffect, useState } from "react";
import "./style.css";
import { Typography, Grid, Box, Button } from "@mui/material";
import Avatar from "../../../Assets/Images/Avatar.png";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import UpdatedPersonalInfo from "./Modal/UpdatedPersonalInfo";

import { getUserDetail } from "../../../Redux/AuthSlice";
import { baseURL } from "../../../axios/axios";
const Index = () => {
  const [personalInfoModalIsOpen, setPersonalInfoModalOpen] = useState(false);

  const [UserValues, setUserValues] = useState();

  const dispatch = useDispatch();
  const updatedUserDetail = useSelector((state) => state.user.userData);

  var User = JSON.parse(localStorage.getItem("userDetail"));
  let user_id = User?.user?._id;

  function openModal() {
    setPersonalInfoModalOpen(true);
  }

  function closeModal() {
    setPersonalInfoModalOpen(false);
  }

  const getDetail = async () => {
    const res = await dispatch(getUserDetail(user_id));
    const value = res?.payload;

    setUserValues(value?.user);
  };
  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    if (updatedUserDetail?.user) {
      const updatedValues = updatedUserDetail?.user;
      setUserValues(updatedValues);
    }
  }, [updatedUserDetail?.user]);

  return (
    <>
      <Typography className="Main_Head fs-1">Setting</Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} sx={{minHeight:400}} className="d-flex justify-content-center mt-4" >
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="card shadow border-0">
              <div className="d-flex justify-content-between mx-4 mt-4" style={{minHeight:350}}>
 
           <div className="pt-5">
              <Grid item >
                  <Box sx={{ width: "150px", height: "150px" }}>
                    {UserValues?.image ? (
                      <img
                        src={`${baseURL}images/${UserValues?.image}`}
                        alt="no image"
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                          borderRadius: "100%",
                        }}
                      />
                    ) : (
                      <img
                        src={Avatar}
                        alt=""
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                          borderRadius: "100%",
                        }}
                      />
                    )}
                  </Box>
                </Grid>

                <Grid item  className="pt-4">
                  <Typography sx={{  color: "#5E5873", fontSize: "24px", fontWeight: "500",textTransform:'capitalize' }} > {UserValues?.firstName} {UserValues?.lastName}   </Typography>
                </Grid>
           </div>  

           <div >
           <Grid item xs={12} sm={12} lg={12} md={12}sx={{ textAlign: "end", padding: "8px" }} >
                
                  <Button

                 endIcon={<EditIcon className="fs-5 ms-2" />}
                    onClick={openModal}
                    sx={{
                       fontSize:16,
                      backgroundColor: "#2457C5",
                      color: "#fff",
                      padding: "6px",
                      width: "120px",
                      textTransform:'capitalize',
                      "&:hover": { 
                        background: "#2457C5", 
                      },
                    }}
                    className="variant rounded px-5"
                  >
                   Edit
                  </Button>
              
                  <UpdatedPersonalInfo
                    closeModal={closeModal}
                    personalInfoModalIsOpen={personalInfoModalIsOpen}
                    user={UserValues}
                    // refetch={refetch}
                  />
                </Grid>

                {/* <div className="mt-5 pt-5">
                  <p className="mt-5 pt-4 fw-semibold" style={{color:'#000000'}}>Super Admin</p>
                </div> */}

              </div>
              </div>
             
             
              
        
            </div>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="card shadow border-0">
              <Grid
                container
                sx={{ alignItems: "center", padding: "8px", height: "371px" }}
              >
                <Grid
                  item
                  xs={6}
                  sm={6}
                  lg={6}
                  md={6}
                  sx={{ textAlign: "start" }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#222222",
                    }}
                  >
                    Personal Information
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  lg={6}
                  md={6}
                  sx={{ textAlign: "end" }}
                ></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Typography className="card_subtext">First Name</Typography>
                  <Typography className="card_subtext1">
                    {UserValues?.firstName}
                  </Typography>
                  <br />
                  <Typography className="card_subtext">
                    Email Address
                  </Typography>
                  <Typography className="card_subtext1">
                    {UserValues?.email}
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                  <Typography className="card_subtext">Last Name</Typography>
                  <Typography className="card_subtext1">
                    {UserValues?.lastName}
                  </Typography>
                  <br />
                  <Typography className="card_subtext">Phone</Typography>
                  <Typography className="card_subtext1">
                    +1 123 4567 8910
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <br />
                  <Typography className="card_subtext">Bio</Typography>
                  <Typography className="card_subtext1">CFO</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid> */}
        </Grid>
       
      </div>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            paddingY: "16px",
            width: "45%",
            height: "263px",
            marginRight: "20px",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="card shadow border-0">
              <Grid
                container
                sx={{ alignItems: "center", padding: "8px", height: "263px" }}
              >
                <Grid
                  item
                  xs={6}
                  sm={6}
                  lg={6}
                  md={6}
                  sx={{ textAlign: "start" }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#222222",
                    }}
                  >
                    Card Details
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  lg={6}
                  md={6}
                  sx={{ textAlign: "end" }}
                ></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Typography className="card_subtext">Name on Card</Typography>
                  <Typography className="card_subtext1">
                    {UserValues?.country}
                  </Typography>
                  <br />
                  <Typography className="card_subtext">Expiry</Typography>
                  <Typography className="card_subtext1">06 / 2024</Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                  <Typography className="card_subtext">Card Number</Typography>
                  <Typography className="card_subtext1">
                    4444 4444 4444 4444
                  </Typography>
                  <br />
                  <Typography className="card_subtext">CVV</Typography>
                  <Typography className="card_subtext1">567</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid sx={{ paddingY: "16px", width: "55%", height: "263px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="card shadow border-0">
              <Grid
                container
                sx={{ alignItems: "center", padding: "8px", height: "263px" }}
              >
                <Grid
                  item
                  xs={6}
                  sm={6}
                  lg={6}
                  md={6}
                  sx={{ textAlign: "start" }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#222222",
                    }}
                  >
                    Address
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  lg={6}
                  md={6}
                  sx={{ textAlign: "end" }}
                ></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Typography className="card_subtext">Country</Typography>
                  <Typography className="card_subtext1">
                    {UserValues?.country}
                  </Typography>
                  <br />
                  <Typography className="card_subtext">City/State</Typography>
                  <Typography className="card_subtext1">Toronto</Typography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                  <Typography className="card_subtext">Postal Code</Typography>
                  <Typography className="card_subtext1">ABC 12364</Typography>
                  <br />
                  <Typography className="card_subtext">Tax ID</Typography>
                  <Typography className="card_subtext1">A1245677</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div> */}
    </>
  );
};

export default Index;

import React, { useEffect, useReducer, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OurData } from "./Data";
import { Link, Outlet } from "react-router-dom";
import dswhite from "../../src/Assets/Images/dswhite.png";
import dswhite4 from "../../src/Assets/Images/dswhite4.png";
import dswhite2 from "../../src/Assets/Images/dswhite2.png";
import dswhite3 from "../../src/Assets/Images/dswhite3.png";
import { FaCloudUploadAlt } from "react-icons/fa";
import SelectAccount from "../Pages/SelectAccount/SelectAccount";
import mainLogo from "../Assets/Images/MainLogo.svg";
import { addExternalSourceData } from "../Redux/SenarioPlanningSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const drawerWidth = 280;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(true);

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let quickbookToken = localStorage.getItem('quickbookToken')

  var user = JSON.parse(localStorage.getItem("userDetail"));
 

      
 


 

  useEffect(() => {
    const handleTokenExpiration = () => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const lastLoginTime = localStorage.getItem("lastLoginTime");
      if (lastLoginTime && currentTime - parseInt(lastLoginTime) >= 3600) { // 1 hour = 3600 seconds
        localStorage.clear();
        toast.error("Quickbook token expired");
        navigate('/login');
      }
    };

    const interval = setInterval(handleTokenExpiration, 1000); // Check every second

    return () => clearInterval(interval);
  }, [navigate]);
  


 

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#000047", // Set background color here
            color: "white",
            overflowX: "hidden",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          style={{
            backgroundColor: "#000047 !important",
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "block",
              paddingTop: "8px",
              paddingBottom: "12px",
              textDecoration: "none",
              margin: "20px",
            }}
          >
            <img src={mainLogo} width={"130px"} alt="" />
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {OurData.map((headerdata, index) => (
            <ListItem
              key={headerdata}
              disablePadding
              sx={{ display: "block", margin: "5% 0px" }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(headerdata.link);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && <img src={dswhite4} alt="iscon1" />}
                  {index === 1 && <img src={dswhite3} alt="iscon2" />}
                  {index === 2 && <img src={dswhite2} alt="iscon3" />}
                  {index === 3 && <FaCloudUploadAlt color="white" size={20} />}

                  {index === 4 && <img src={dswhite} alt="iscon4" />}
                </ListItemIcon>
                <ListItemText
                  primary={headerdata.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <div
          className="div"
          style={{ position: "absolute", bottom: 10, left: 0, right: 0 }}
        >
          <SelectAccount />
        </div>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "F5F5F5", height: "100%" }}
      >

      

        {quickbookToken?.length > 0 ? <Outlet /> : ""}
   
      </Box>
    </Box>
  );
}

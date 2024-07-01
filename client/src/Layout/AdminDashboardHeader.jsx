import React, { useState, useEffect } from "react";
import { styled, } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../../src/Assets/Images/SmartCFOLogo.png";
import { getMenuData } from "./Data2";
import { Link, Outlet, useNavigate } from "react-router-dom";
import dsicon1 from "../../src/Assets/Images/dswhite.png";
import users from '../Assets/Images/users.svg'
import GroupIcon from '@mui/icons-material/Group';
import SelectAccount from "../Pages/SelectAccount/SelectAccount";
import kpi from '../Assets/Images/kpi.svg'
import goals from '../Assets/Images/goals.svg'
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";




const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerLeft() {
  
  const [open, setOpen] = useState(true);

  const handleMenuIconClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function handleResize() {
      setOpen(window.innerWidth >= 760);
    }
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);


    
    

  

  const [menuItems, setMenuItems] = useState([]);


  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getMenuData();
        setMenuItems(data);
      } catch (error) {
        console.error("Error retrieving menu data:", error);
      }
    }

    fetchMenuData();
  }, []);



  const navigate = useNavigate()

  return (
    <Box sx={{ display: "flex" ,position:'relative'}}>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleMenuIconClick}
        sx={{ display: { lg: "none" }, position: "absolute", top: 0, left: 0 }}
      >
        {open ? <CloseIcon /> : <MenuIcon className="bg-none mt-3 fs-1" style={{color:'#000'}} />}
      </IconButton>
      
      <Drawer sx={{ width: open ? 280 : 0, flexShrink: 0, backgroundColor: "#F5F5F5", "& .MuiDrawer-paper": { width: open ? 280 : 0, boxSizing: "border-box", }, }} variant="persistent" anchor="left" open={open} >
        <DrawerHeader className=" ps-4 my-4" >
          <Box component={Link} to="/" sx={{ display: "block", paddingTop: "8px", paddingBottom: "12px", textDecoration: "none", }} >
            <img src={Logo} width={"140px"} alt="" />
          
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems?.map((headerdata, index) => (
            <ListItem key={headerdata} disablePadding sx={{ display: "block" }}>
              <ListItemButton onClick={ ()=> navigate(headerdata.link)} sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }} >

                {/* Icons Sidebar */}
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center", }} className="py-2" >
                  {index === 0 && <img src={users} alt="Users List" />}
                  {index === 1 && <GroupIcon className="text-white fs-3" />}
                  {index === 2 && <img src={kpi} alt="KPIs" />}
                  {index === 3 && <img src={goals} alt="Goals" />}
                  {index === 4 && <ApartmentIcon className="text-white fs-3" />}
                  {index === 5 && <HelpCenterIcon className="text-white fs-2" />}
                  {index === 6 && <img src={dsicon1}  alt="settings" style={{width:30}}/>}
                 
                </ListItemIcon>
               {/* Icons Sidebar */}


               {/* Text Sidebar */}
                <ListItemText primary={headerdata.name}  sx={{ opacity: open ? 1 : 0, color: "white" }}/>
                  {/* Text Sidebar */}
                  
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        

        <div className="div" style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}>
         <SelectAccount /> 
       </div>


      </Drawer>

     

      {/* //// Right Side Component */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#F5F5F5" ,transition: "margin-left 0.2s ease",}} >
        <DrawerHeader />
        <Outlet />
      </Box>
          {/* //// Right Side Component */}

       


    </Box>
  );
}

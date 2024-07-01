import React, { useEffect, useReducer, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import { DatePicker } from '@material-ui/pickers';
import Paper from "@mui/material/Paper";
import DirectionsIcon from "@mui/icons-material/Directions";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { alpha } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Logo from "../../src/Assets/Images/logo1.png";
import { CompanyData } from "./Data3";
import { Link, Outlet, useNavigate } from "react-router-dom";
import notificationlogo from "../../src/Assets/Images/notification.svg";
import dsicon1 from "../../src/Assets/Images/dsicon1.png";
import dsicon2 from "../../src/Assets/Images/dsicon2.png";
import dsicon3 from "../../src/Assets/Images/dsicon3.png";
import dsicon4 from "../../src/Assets/Images/dsicon4.png";
import dswhite from "../../src/Assets/Images/dswhite.png";
import dswhite4 from "../../src/Assets/Images/dswhite4.png";
import dswhite2 from "../../src/Assets/Images/dswhite2.png";
import dswhite3 from "../../src/Assets/Images/dswhite3.png";
import { DateTimePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { toast } from "react-hot-toast";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../axios/axios";
import { getUserDetail } from "../Redux/AuthSlice";
import SelectAccount from "../Pages/SelectAccount/SelectAccount";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NewLogo from "../Assets/Images/newlogo.png";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import './style.css'

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "black",
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

  const [userImage, setuserImage] = useState();
  const dispatch = useDispatch();

  const updatedUserDetail = useSelector((state) => state.user.userData);

  var User = JSON.parse(localStorage.getItem("userDetail"));
  let user_id = User?.user?._id;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // logout user
  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload(true);
    forceUpdate();
    toast.success("User logout successfully");
  };

  const getUserImage = async () => {
    const res = await dispatch(getUserDetail(user_id));
    const value = res.payload;
    setuserImage(value?.user?.image);
  };
  useEffect(() => {
    getUserImage();
  }, []);

  useEffect(() => {
    if (updatedUserDetail?.user?.image) {
      const updatedValues = updatedUserDetail?.user?.image;
      setuserImage(updatedValues);
    }
  }, [updatedUserDetail?.user?.image]);


  const [selectedIndex, setSelectedIndex] = useState(null);

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#000047", 
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
             
              paddingBottom: "12px",
              textDecoration: "none",
              margin: "15px 20px",
            }}
          >
            <img src={NewLogo} width={"180px"} alt="" />
            {/* <Typography
              variant="h6"
              sx={{ color: "white", fontSize: "16px", mb: "10px" }}
            >
              Secure Financial Tool
            </Typography> */}
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {CompanyData?.map((headerdata, index) => (
            <ListItem
              key={headerdata}
              disablePadding
              sx={{ display: "flex", margin: "5% 0px" ,alignItems:'center'}}
            >
           <ListItemButton
           disablePadding
          
         key={index}
       selected={selectedIndex === index}
       onClick={() => {
        setSelectedIndex(index);
        navigate(headerdata.link); 
      }}
        className={selectedIndex === index ? 'selected-item' : ''}
          >

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && <img src={dswhite4} alt="iscon1"   className={selectedIndex === index ? 'selected-img' : ''}/>}
                  {index === 1 && <PeopleAltIcon  style={{opacity:0.8}}  className={selectedIndex === index ? 'selected-icon' : 'text-white'}/>}
                  {index === 2 && <img src={dswhite} alt="iscon3"   className={selectedIndex === index ? 'selected-img' : ''}/>}
                </ListItemIcon>
                <ListItemText
                  primary={headerdata.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      

       <div className="div" style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}>
         <SelectAccount /> 
       </div>
      
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#F5F5F5" }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

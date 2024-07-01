import React, { useReducer } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import CssBaseline from '@mui/material/CssBaseline';
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../src/Assets/Images/SmartCFOLogo.png";
import NewLogo from "../../src/Assets/Images/logoUpdate.png";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
const drawerWidth = 240;
const navItems = [
  "Home",
  "About",
  "Contact",
  "Sign Up",
  "Services",
  "Features",
];

const styles = {
  header: {
    backgroundColor: "white",
  },
};
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const token = localStorage.getItem("access-token");

    const navigate = useNavigate()
  let quickbookToken = localStorage.getItem('quickbookToken')


  const location = useLocation();
  const currentUrl = location.pathname;
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  // logout user
  const handleLogOut = () => {
    localStorage.clear();
    forceUpdate();
    toast.success("User logout successfully");
    navigate('/login')
  };
  //get user role
  var User = JSON.parse(localStorage?.getItem("userDetail"));

  let userRole = User?.Role?.title;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img
        src={NewLogo}
        alt=""
        className="mt-3"
        style={{ maxWidth: "100px", minHeight: "30px" }}
      />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{ display: "flex" }}
      style={
        {
          // marginBottom: "15px",
          // boxShadow: "none !important",
        }
      }
    >
      <AppBar
        className=""
        // component="nav"
        // style={{
        //   color: "white",
        //   backgroundColor: "white",

        // }}
        style={styles.header}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            boxShadow: "0px 2px 20px 0px #00000014",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                textDecoration: "none",
                display: "block",
                marginLeft: "8%",
              },
            }}
          >
            <img
              src={NewLogo}
              alt=""
              style={{ maxWidth: "450px", height: "75px" }}
            />
          </Box>
          <Box
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{
              marginRight: "6%",
            }}
          >
            <Button
              component={Link}
              to="/"
              style={{
                font: "poppins",
                fontWeight: 400,
                fontSize: "18px",
                marginRight: "10px",
                textTransform: "capitalize",
              }}
              className={`font-fam ${
                currentUrl === "/" ? "additional-class" : ""
              }`}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/aboutus"
              style={{
                font: "poppins",
                fontWeight: 400,
                fontSize: "18px",
                marginRight: "10px",
                textTransform: "capitalize",
              }}
              className={`font-fam ${
                currentUrl === "/aboutus" ? "additional-class" : ""
              }`}
            >
              About Us
            </Button>
            <Button
              component={Link}
              to="/services"
              style={{
                font: "poppins",
                fontWeight: 400,
                fontSize: "18px",
                marginRight: "10px",
                textTransform: "capitalize",
              }}
              className={`font-fam ${
                currentUrl === "/services" ? "additional-class" : ""
              }`}
            >
              Services
            </Button>
            <Button
              component={Link}
              to="/careers"
              style={{
                font: "poppins",
                fontWeight: 400,
                fontSize: "18px",
                marginRight: "10px",
                textTransform: "capitalize",
              }}
              className={`font-fam ${
                currentUrl === "/features" ? "additional-class" : ""
              }`}
            >
              Careers
            </Button>
            <Button
              component={Link}
              to="/news-blogs"
              style={{
                font: "poppins",
                fontWeight: 400,
                fontSize: "18px",
                marginRight: "10px",
                textTransform: "capitalize",
              }}
              className={`font-fam ${
                currentUrl === "/features" ? "additional-class" : ""
              }`}
            >
              News/Blogs
            </Button>

            <Button
              component={Link}
              to="/contactus"
              style={{
                font: "poppins",
                fontWeight: 400,
                fontSize: "18px",
                marginRight: "10px",
                textTransform: "capitalize",
              }}
              className={`font-fam ${
                currentUrl === "/contactus" ? "additional-class" : ""
              }`}
            >
              Contact us
            </Button>

            {token ? (
              <>
                {userRole === "CFO" ? quickbookToken && (

                  <Button
                    component={Link}
                    to="/userdashboard/dashboard"
                    className="font-fam"
                    style={{
                      font: "poppins",
                      fontWeight: 400,
                      fontSize: "18px",
                      textTransform: "capitalize",
                    }}
                  >
                    Dashboard
                  </Button>
                ) : userRole === "superAdmin" ? (
                  <Button
                    component={Link}
                    to="/admindashboard/users"
                    className="font-fam"
                    style={{
                      font: "poppins",
                      fontWeight: 400,
                      fontSize: "18px",
                      textTransform: "capitalize",
                    }}
                  >
                    Dashboard
                  </Button>
                ) : userRole === "user" ? (
                  <Button
                    component={Link}
                    to="/admindashboard/adminSetting"
                    className="font-fam"
                    style={{
                      font: "poppins",
                      fontWeight: 400,
                      fontSize: "18px",
                      textTransform: "capitalize",
                    }}
                  >
                    Dashboard
                  </Button>
                ) : userRole === "admin" ? (
                  <Button
                    component={Link}
                    to="/CompanyDashboard/Companies"
                    className="font-fam"
                    style={{
                      font: "poppins",
                      fontWeight: 400,
                      fontSize: "18px",
                      textTransform: "capitalize",
                    }}
                  >
                    Dashboard
                  </Button>
                ) : (
                  ""
                )}

                <button
                className="px-4 btn btn-dark rounded-0"
                  sx={{
                   
                    borderRadius: "0",
                    marginLeft: "20px",
                    textTransform: "capitalize",
                  }}
                  variant="contained"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                className="font-fam"
                style={{
                  border: "none",
                  borderRadius: "30px",
                  color: "white",
                  background: "#928EDB",
                  padding: "10px 20px",
                  textTransform: "capitalize",
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav-drawer">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;

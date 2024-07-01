import { Box, TextField, Typography, alpha, styled } from "@mui/material";

export const ButtonTextWrapper = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: "500",
  color: "#00000099",
  marginRight: "20px",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
    marginRight: "10px",
  },
}));

export const LogoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginTop: "20px",
  marginRight: "20px",
  width: {
    xs: "200px",
    lg: "380px",
  },
}));

export const TextInputField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#FAFAFA" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    height: "30px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    width: "100%",
    boxShadow: `3px 4px 12px -7px black`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },

    "&:hover": {
      backgroundColor: "#F3F6F9",
      borderLeftColor: "#F3F6F9",
    },
    "&:focus": {
      // backgroundColor: 'transparent',
      // boxShadow: `${alpha(theme.palette.light.main, 0.25)} 0 0 0 2px`,
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      // borderColor: theme.palette.light.main,
      borderLeftColor: theme.palette.light.main,
      borderLeftWidth: 8,
      // outline: "none"
    },
  },
}));

export const FormTitleText = styled(Typography)(({ theme }) => ({
  fontSize: "43px",
  color: "#00000099",
  fontWeight: "600",
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "26px",
  },
}));

export const FormSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#00000099",
  fontWeight: "400",
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
}));

export const FormContentWrapper = styled(Box)(({ theme }) => ({
  height: "80vh",
  display: "flex",
  alignItems: "center",
  paddingRight: "150px",
  [theme.breakpoints.down("md")]: {
    paddingRight: "0px",
  },
}));

export const FromNavigateLinkWrapper = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "400",
  color: "#000000",
  paddingTop: "31px",
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
}));

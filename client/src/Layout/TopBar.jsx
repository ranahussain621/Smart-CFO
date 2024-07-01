import React, { useState } from 'react';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";

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

const drawerWidth = 280;

const TopBar = ({ getDateData }) => {
  const [open, setOpen] = useState(true);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [filterOption, setFilterOption] = useState('');



  const handleStartDateChange = (date) => {
    if (date <= new Date()) {
      setDateRange(prevRange => ({ ...prevRange, startDate: date, endDate: date }));
    } else {
      toast.error('Invalid Date Selection');
    }
  };
  
  const handleEndDateChange = (date) => {
    const today = new Date();
    if (date <= today && date >= dateRange.startDate) {
      setDateRange(prevRange => ({ ...prevRange, endDate: date }));
    } else if (date > today) {
      toast.error('Invalid Date Selection');
    } else {
      toast.error('Invalid Date Selection');
    }
  };
  


  const handleFilterOptionChange = event => {
    const value = event.target.value;
    setFilterOption(value);
  
    switch (value) {
      case "today":
        const today = new Date();
        setDateRange({ startDate: today, endDate: today });
        break;
      case "this-week":
        const todayOfWeek = new Date();
        const startOfWeek = new Date(todayOfWeek);
        startOfWeek.setDate(todayOfWeek.getDate() - todayOfWeek.getDay());
        const endOfWeek = new Date(todayOfWeek);
        endOfWeek.setDate(todayOfWeek.getDate() - todayOfWeek.getDay() + 6);
        setDateRange({ startDate: startOfWeek, endDate: endOfWeek });
        break;
      case "this-month":
        const todayOfMonth = new Date();
        const startOfMonth = new Date(todayOfMonth.getFullYear(), todayOfMonth.getMonth(), 1);
        const endOfMonth = new Date(todayOfMonth.getFullYear(), todayOfMonth.getMonth() + 1, 0);
        setDateRange({ startDate: startOfMonth, endDate: endOfMonth });
        break;
      case "custom":
        // Do nothing for custom range
        break;
      default:
        break;
    }
  
    getDateData(value);
  };


  
  
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay() + 6);
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const dateOptions = [
    { value: "today", label: "Today", startDate: today, endDate: today },
    { value: "this-week", label: "This Week", startDate: startOfWeek, endDate: endOfWeek },
    { value: "this-month", label: "This Month", startDate: startOfMonth, endDate: endOfMonth },
    { value: "custom", label: "Custom Range" }
  ];

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#F5F5F5" }} className=''>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className='pe-4'>
            <div className="input-group mt-2">
              <IconButton type="button" aria-label="search">
                <SearchIcon sx={{ color: "#000000" }} />
              </IconButton>
              <input
                type="text"
                className="form-control"
                placeholder="Search Here..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ border: "none", outline: "none" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} lg={4} md={4} xl={4} sx={{display:'flex',justifyContent:'end' }} className='mt-2'>
            <FormControl sx={{ minWidth: 490, borderBlock: "none", outline: "none" ,background:'white'}} size="small">
              <Select
                value={filterOption}
                onChange={handleFilterOptionChange}
                displayEmpty
              >
                <MenuItem value="">Select Date Range</MenuItem>
                {dateOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>

              {filterOption === "custom" && (
                <div style={{ marginTop: 10 }}>
                  <DatePicker
                    placeholderText='Start Date'
                    selected={dateRange.startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    className="form-control"
                    
                  />
                  <DatePicker
                    placeholderText='End Date'
                    selected={dateRange.endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    className="form-control ms-4"
                   
                  />
                </div>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

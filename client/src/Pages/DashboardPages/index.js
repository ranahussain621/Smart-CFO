import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Redux/SenarioPlanningSlice";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Index = () => {
  const Deatils = JSON.parse(localStorage.getItem("userDetail"));
  const token = localStorage.getItem("quickbookToken");
  const dispatch = useDispatch();
  const { isLoading, DashboardData } = useSelector(
    (state) => state.SenarioPlanning
  );

  const numberWithComma = (number) => {
    if (number == null || isNaN(number)) {
      return "No Data";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const getDashboardDat = async () => {
      if (token)
        await dispatch(
          getDashboardData({
            company_id: Deatils?.company_ids[0]?._id,
            token: token,
          })
        );
    };
    getDashboardDat();
  }, [token, dispatch]);

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString("en-US", options);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid container className="top-head d-flex justify-content-start">
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center p-5 w-100 mt-64">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="">
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "36px",
                  textTransform: "uppercase",
                }}
              >
                {Deatils?.company_ids?.length > 0
                  ? Deatils?.company_ids[0]?.title
                  : null}
              </h2>
            </div>

            <Grid item sm={12} md={12} lg={12} className="mb-4">
              <h2
                style={{
                  fontWeight: 500,
                  fontSize: "18px",
                  textTransform: "lowercase",
                  color: "#000000",
                  margin: 0,
                }}
              >
                As of{" "}
                <span style={{ textTransform: "capitalize" }}>
                  <em>{formattedDateTime}</em>
                </span>
              </h2>
            </Grid>

            <Grid
              container
              item
              className="mt-2 d-flex justify-content-between"
            >
              <Grid container spacing={7} sm={12} md={7} lg={8} xl={8}>
                {isLoading ? (
                  <></>
                ) : DashboardData?.data?.quickbook?.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <h2 className="p-5 fs-4 w-100">No Data</h2>
                  </div>
                ) : (
                  DashboardData?.data?.quickbook
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((item) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          lg={12}
                          xl={6}
                          md={12}
                          key={item.title}
                        >
                          <Box
                            className="shadow-lg"
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "0",
                              padding: "16px",
                              background: "white",
                              height: "250px",
                            }}
                          >
                            <div
                              className="mt-4 ms-4"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "8px",
                              }}
                            >
                              <h2
                                className="ps-3"
                                style={{
                                  fontWeight: 700,
                                  fontSize: "20px",
                                  textTransform: "uppercase",
                                  color: "#000000",
                                  marginBottom: "8px",
                                }}
                              >
                                {item.title}
                              </h2>
                            </div>

                            <div
                              className="mt-5 me-4"
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                                marginBottom: "8px",
                              }}
                            >
                              <h2
                                style={{
                                  fontWeight: 600,
                                  fontSize: "48px",
                                  textTransform: "uppercase",
                                  color: "#000000",
                                  marginBottom: "8px",
                                }}
                              >
                                $ {numberWithComma(item.value)}
                              </h2>
                            </div>
                          </Box>
                        </Grid>
                      );
                    })
                )}
              </Grid>

              <Grid container item sm={12} md={5} lg={4} xl={4} >
                <Box
                  sx={{
                    background: "white",
                    boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
                    borderRadius: 0,
                    border: "1px solid #ccc",
                    padding: 2,
                    width:'95%'
                  }}
                >
                  {isLoading ? (
                    <div></div>
                  ) : DashboardData?.data?.exel?.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <h2 className="p-5 fs-4 w-100">No Data</h2>
                    </div>
                  ) : (
                    DashboardData?.data?.exel?.map((item, ind) => {
                      return (
                        <>
                          <Box
                            sx={{
                              background: "#F8F6FF",
                              padding: "30px",
                              color: "#000000",
                            }}
                            key={ind}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontFamily: "poppins",
                                  fontSize: 30,
                                  fontWeight: 600,
                                }}
                              >
                                Sales Data
                              </Typography>
                            </Box>
                            {/* <Box> <Typography sx={{fontFamily:'poppins',fontSize:18,fontWeight:500,marginTop:1}}>Last update from 12 May 2024 from CSV File</Typography></Box> */}
                            <Box sx={{ marginTop: 4 }}>
                              <hr />
                            </Box>
                            <Grid>
                              <Grid
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  {" "}
                                  <Typography
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize: 18,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    Total Sales
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                  className="ms-5"
                                >
                                  {" "}
                                  <Typography
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize: 18,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    Total Invoices
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                               className="row"
                                sx={{
                                  display: "flex",
                                
                                  alignItems: "center",
                                }}
                              >
                                <Box className="col text-end">
                                  {" "}
                                  <Typography
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize:
                                        item.totalsale === null ? 18 : 42,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    {" "}
                                    {item.totalsale === null
                                      ? "No Data"
                                      : "$" + numberWithComma(item.totalsale)}
                                  </Typography>
                                </Box>
                                <Box className="col text-end" >
                                  {" "}
                                  <Typography
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize:
                                        item.invoices === null ? 18 : 42,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    {item.invoices === null
                                      ? "No Data"
                                      : item.invoices}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>

                          <Box
                            sx={{
                              background: "#F8F6FF",
                              padding: "30px",
                              color: "#000000",
                            }}
                            key={ind}
                            className="mt-5"
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontFamily: "poppins",
                                  fontSize: 30,
                                  fontWeight: 600,
                                }}
                              >
                                Employee Data
                              </Typography>
                            </Box>
                            {/* <Box> <Typography sx={{fontFamily:'poppins',fontSize:18,fontWeight:500,marginTop:1}}>Last update from 12 May 2024 from CSV File</Typography></Box> */}
                            <Box sx={{ marginTop: 4 }}>
                              <hr />
                            </Box>
                            <Grid className="mt-4">
                              <Grid
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  {" "}
                                  <Typography
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize: 18,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    Total Employees
                                  </Typography>
                                </Box>
                                <Box>
                                  {" "}
                                  <Typography
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize: 18,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    Leaves
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                className="row"
                                sx={{
                                  display: "flex",
                                 
                                  alignItems: "center",
                                }}
                              >
                                <Box className="col text-end me-5">
                                 
                                  <Typography
                                  justifyContent='end'
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize:
                                        item.totalemplyee === null ? 18 : 42,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    {item.totalemplyee === null
                                      ? "No Data"
                                      : item.totalemplyee}
                                  </Typography>
                                </Box>
                                <Box className="col text-end">
                                  {" "}
                                  <Typography
                                    sx={{
                                      fontFamily: "poppins",
                                      fontSize: item.leaves === null ? 18 : 42,
                                      fontWeight: 600,
                                      marginTop: 2,
                                    }}
                                  >
                                    {item.leaves === null
                                      ? "No Data"
                                      : item.leaves}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      );
                    })
                  )}

                  {/* <Box sx={{background:'#F8F6FF',padding:'30px',color:'#000000',marginTop:2}}>
                    <Box>
                     <Typography sx={{fontFamily:'poppins',fontSize:30,fontWeight:600}}>Employee Data</Typography>  
                    </Box>
                   <Box> <Typography sx={{fontFamily:'poppins',fontSize:18,fontWeight:500,marginTop:1}}>Last update from 12 May 2024 from CSV File</Typography></Box>
                   <Box sx={{marginTop:4}}><hr /></Box>
                   <Grid>
                   <Grid sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:22,fontWeight:500,marginTop:2}}>Total Sale</Typography></Box>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:22,fontWeight:500,marginTop:2}}>Total Invoice</Typography></Box>
                   </Grid>
                   <Grid sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:42,fontWeight:600,marginTop:2}}>9640</Typography></Box>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:42,fontWeight:600,marginTop:2}}>9460</Typography></Box>
                   </Grid>
                  </Grid>

                  <Grid>
                   <Grid sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:22,fontWeight:500,marginTop:2}}>Total Sale</Typography></Box>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:22,fontWeight:500,marginTop:2}}>Total Invoice</Typography></Box>
                   </Grid>
                   <Grid sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:42,fontWeight:600,marginTop:2}}>9640</Typography></Box>
                   <Box > <Typography sx={{fontFamily:'poppins',fontSize:42,fontWeight:600,marginTop:2}}>9460</Typography></Box>
                   </Grid>
                  </Grid>


                   </Box> */}
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              textAlign="end"
              className="w-100 d-flex justify-content-start"
            >
              <TablePagination
                rowsPerPageOptions={[6, 12, 24, { label: "All", value: -1 }]}
                colSpan={4}
                count={DashboardData?.data?.output?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Index;

import  React , {useState} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead, Tooltip } from '@mui/material';
import deleteIcon from '../../Assets/Images/delete.svg'
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {  deleteQueries, getAllQueries,  } from '../../Redux/AdminSlice';
import QueryModal from './QueryModal'
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Typography } from "@mui/material";


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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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






export default function QueriesList() {


    const [list, setlist] = useState([]);
    const [userPlanModalOpen, setUserPlanModalOpen] = useState(false);
    const [userId, setuserId] = useState();
    const dispatch = useDispatch();



  
    //get updated data through useSelector
    const {QueriesList,isLoading} = useSelector((state) => state.Admin);

  
    function UserPlanModalScreen (id) {
      setUserPlanModalOpen(!userPlanModalOpen);
      setuserId(id)
    }
  
   
    useEffect(() => {
        const getData = async () => {
        const response = await dispatch(getAllQueries());
        const value = response?.payload;
        setlist(value?.data);
      }; 
        getData();
      }, []);
   

    useEffect(() => {
      if (QueriesList?.data) {
        setlist(QueriesList?.data || []);

      }
    }, [QueriesList]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


   const deleteQue = async (id) => {
    await dispatch(deleteQueries({id:id}))
    .then(async (res)=>{
        if(res?.payload?.success === true){
         toast.success(res?.payload?.message)   
        }
        await dispatch(getAllQueries());
    })
   }

 

  

  return (
    <>

<div className="row mt-4 ">
    <div className="col-6">
      <Typography className="Main_Head fs-2">Queries</Typography>
    </div>
    <div className="col-6 text-end"></div>
  </div>

      <TableContainer  className='bg-white mt-4 me-5'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className='my-5 border-0'>
        <TableHead sx={{background:'#00003A',}}>
          <TableRow>
            <TableCell  className='text-white'>Name</TableCell>
            <TableCell  className='text-white'>Email</TableCell>
            <TableCell  className='text-white'>Phone</TableCell>
            <TableCell  className='text-white'>View</TableCell>
            <TableCell  className='text-white'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          isLoading ? ( <div className="d-flex justify-content-center p-5">
          <div class="spinner-border text-primary" role="status">
<span class="visually-hidden">Loading...</span>
</div>
    </div>
      ) : list === 0 ? <div className="d-flex justify-content-center p-5">No Data</div> :                  
          list?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {          
            return (
             <TableRow key={row?.name}>
              <TableCell sx={{textTransform:'uppercase'}}>{row?.name}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell> {row?.phone}</TableCell>
              <TableCell onClick={()=>UserPlanModalScreen(row)} sx={{cursor:'pointer'}}> <Tooltip title='View Query' sx={{letterSpacing:1.3}}><VisibilityIcon /> </Tooltip> </TableCell>
              <TableCell className='fw-semibold'><Tooltip title='Delete Query'> <img src={isLoading ? "Deleting" : deleteIcon} style={{cursor:'pointer'}} alt='Delete'  onClick={()=>deleteQue(row?._id)} /> </Tooltip></TableCell>
            </TableRow>     
            )
           
             }
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={list?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

      <QueryModal
        queryData={userId}
        closeModal={UserPlanModalScreen}
        ModalIsOpen={userPlanModalOpen}
      /> 


    </TableContainer>  
    
    </>

  );
}

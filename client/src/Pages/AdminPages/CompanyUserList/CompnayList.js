import React, {useState,useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Typography, Box,  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { companiesList} from '../../../Redux/AdminSlice'
import DeleteModal from './DeleteModal';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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
import { TableHead } from '@mui/material';
import deleteIcon from '../../../Assets/Images/delete.svg'




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







const CompnayList = () => {
    const [list, setlist] = useState()
    const [userId, setuserId] = useState()
    const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  
    const updatedList = useSelector((state)=>state.Admin.adminData)

    const {isLoading} = useSelector((state)=>state.Admin)
    
 const dispatch = useDispatch()



    const getData = async () => {
        const response = await dispatch(companiesList())
        const value = response?.payload;
        setlist(value?.data)
      }
      //get the user data when initialy component is render
      useEffect(() => {
        getData()
      }, [])

      useEffect(()=>{
        if(updatedList)
        setlist(updatedList?.data)
      },[updatedList])


      function deleteModalScreen() {
        setdeleteModalOpen(!deleteModalOpen)
      }


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
  
  return (
    <>

  
<div className="row mt-4">
        <div className="col-6">
          <Typography className="Main_Head fs-2">List of All Companies</Typography>

  </div>
       
      </div>

      <TableContainer  className='bg-white mt-4 me-5'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className='my-5 border-0'>
        <TableHead sx={{background:'#00003A',}}>
          <TableRow>
            <TableCell  className='text-white'>Companies Name</TableCell>
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
             <TableRow key={row?.title}>
              <TableCell sx={{textTransform:'uppercase'}}>{row?.title}</TableCell>
              <TableCell className=''>
                <img src={isLoading ? "Deleting" : deleteIcon} style={{cursor:'pointer'}} alt='Delete'
                  onClick={ ()=>{
          deleteModalScreen()
          setuserId(row._id)
        }}
         /> 
       
                </TableCell>
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

    

    </TableContainer> 


         <DeleteModal  user_id = {userId}
        closeModal={deleteModalScreen}
        ModalIsOpen={deleteModalOpen}/>
  </>
  )
}

export default CompnayList
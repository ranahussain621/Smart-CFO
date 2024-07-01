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
import { TableHead } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';
import { Typography } from "@mui/material";

import CancelSubscriptionModal from './CancelSubscriptionModal';
import { getAllUser } from '../../Redux/AdminSlice';





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






export default function UsersTable() {


    const [list, setlist] = React.useState();

    const [userPlanModalOpen,setUserPlanModalOpen] = useState(false)

    const [userId,setUserId] = useState('')
   



    const dispatch = useDispatch();

    const updatedUser = useSelector((state) => state.Admin.adminData);
  
  
   
    useEffect(() => {
      const getData = async () => {
      const response = await dispatch(getAllUser());
      const value = response?.payload;
      setlist(value?.data);
    }; 
      getData();
    }, []);


  const filteredList = list?.filter(user => user.subscription);



  const UserPlanModalScreen = (id) =>{
    setUserPlanModalOpen(!userPlanModalOpen)
    setUserId(id)
  }


  

    useEffect(() => {
      if (updatedUser) {
        setlist(updatedUser?.data);
      }
    }, [updatedUser]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const {isLoading} = useSelector((state)=>state.Admin)




  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredList?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  function formatDate(dateString) {
    if (!dateString) return ""; // Handle cases where dateString is undefined or null
    const date = new Date(dateString);
    const options = { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true
    };
    return date.toLocaleDateString('en-US', options) 
}

 

  

  return (
    <>

<div className="row mt-4 ">
    <div className="col-6">
      <Typography className="Main_Head fs-2">List of All Subscribers</Typography>
    </div>
    <div className="col-6 text-end"></div>
  </div>

      <TableContainer  className='bg-white mt-4 me-5'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className='my-5 border-0'>
        <TableHead sx={{background:'#00003A',}}>
          <TableRow>
            <TableCell  className='text-white'>Name</TableCell>
            <TableCell  className='text-white'>Email</TableCell>
            <TableCell  className='text-white'>Company</TableCell>
            <TableCell  className='text-white'>Status</TableCell>
            <TableCell  className='text-white'>Amount</TableCell>
            <TableCell  className='text-white ps-5'>Action</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          isLoading ? ( <div className="d-flex justify-content-center p-5">
          <div class="spinner-border text-primary" role="status">
<span class="visually-hidden">Loading...</span>
</div>
    </div>
      ) : filteredList === 0 ? <div className="d-flex justify-content-center p-5">No Data</div> :
          
          
          filteredList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
           const name = `${row?.firstName} ${row?.lastName}`
           
            return (
             <TableRow key={row?.title}>
              <TableCell sx={{textTransform:'uppercase'}}>{name}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell> {row?.company?.map(company => ( <div key={company} style={{textTransform:'capitalize'}}>{company}</div> ))}</TableCell>
              <TableCell> 
                {
                    row?.subscription?.amount ? ( 
                <>        
                <div className="d-flex align-items-center rounded-pill justify-content-center" style={{width:80,background:'#CDFFCD'}}>
                <div className="rounded-circle" style={{width:10,height:10,background:"#007F00"}}></div>
                <div className="px-2" style={{fontSize:12,color:'#007F00'}}>Paid</div>
              </div> 
             
              <div className="div">
                <p className='fw-semibold mt-2' style={{color:'#0B0915',fontSize:12}}>Paid on { row?.subscription?.purchaseDate?.length > 0 ? formatDate(row?.subscription?.purchaseDate) : 'Not paid'}</p>
              </div>
                </>  
             )  : ""   }
              </TableCell>
             {/* <TableCell>
            <VisibilityIcon  style={{cursor:'pointer'}} onClick={()=>UserPlanModalScreen(row._id)} />
              </TableCell>  */}
              <TableCell className='fw-semibold'> $ { row?.subscription?.amount ? row?.subscription?.amount/100 : 'NIL'}</TableCell>
              <TableCell><button className='btn btn-dark rounded-0 '  style={{cursor:'pointer'}} onClick={()=>UserPlanModalScreen(row._id)} >Cancel Subscription</button></TableCell>
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
              count={filteredList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

      <CancelSubscriptionModal
        id={userId}
        closeModal={UserPlanModalScreen}
        ModalIsOpen={userPlanModalOpen}
      />  


    </TableContainer>  
    
    </>

  );
}

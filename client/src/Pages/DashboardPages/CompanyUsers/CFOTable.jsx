import * as React from 'react';
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
import { TableHead, Checkbox } from '@mui/material';
import deleteIcon from '../../../Assets/Images/delete.svg'
import {getCompaniesCFO, getUserCompanies} from '../../../../src/Redux/SenarioPlanningSlice'
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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






export default function CustomPaginationActionsTable({onCheckboxClick,companyId}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const [selectAllChecked, setSelectAllChecked] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);




  const dispatch = useDispatch();
  const {CFO,isLoading}  = useSelector((state) => state.SenarioPlanning);





  useEffect(() => {
      const fetchCompaniesCFO = async () => {
        try {
         await dispatch(getCompaniesCFO(companyId));
        } catch (error) {
          console.error("Error fetching user companies:", error);
        }
      };
      fetchCompaniesCFO();

  }, []);



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CFO?.data?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedRows = CFO?.data?.map((row) => row.title);
      setSelectedRows(newSelectedRows);
      setSelectAllChecked(true);
    } else {
      setSelectedRows([]);
      setSelectAllChecked(false);
    }
  };



  const handleCheckboxClick = (event, name, id) => {
    const selectedIndex = selectedRows.indexOf(name);
    let newSelectedRows = [];
    if (selectedIndex === -1) {
      newSelectedRows.push(name); 
    }
    setSelectedRows(newSelectedRows);
    setSelectAllChecked(newSelectedRows.length === CFO?.data?.length);
    onCheckboxClick(id);
  };

  


  return (
    <TableContainer  className='bg-white mt-4'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className='my-5 border-0 '>
        <TableHead sx={{background:'#00003A',}}>
          <TableRow className=''>
            <TableCell padding="checkbox" >
              <Checkbox
                {...label}
                className='text-white'
                checked={selectAllChecked}
                indeterminate={selectedRows.length > 0 && selectedRows.length < CFO?.data?.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell  className='text-white'>Name</TableCell>
            <TableCell  className='text-white'>Email</TableCell>
            <TableCell  className='text-white'>Country</TableCell>
          <TableCell  className='text-white'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className=''>
          {
          isLoading ? (<div className="d-flex justify-content-center p-5">
            <div class="spinner-border text-primary" role="status">
         <span class="sr-only">Loading...</span>
          </div>
          </div>) : CFO?.data?.length  === 0 ? <div className='d-flex justify-content-center p-5 fs-4 fw-semibild' style={{minWidth:300}}>No Data</div> :      
          CFO?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const title = `${row?.firstName} ${row?.lastName}`
            return (
              <TableRow key={title} className=''>
              <TableCell padding="checkbox">
                <Checkbox
                
                  {...label}
                  checked={selectedRows.indexOf(row.title) !== -1}
                  onChange={(event) => handleCheckboxClick(event, row.title,row._id)}
                />
              </TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>
                {/* <div className="d-flex align-items-center p-2 rounded-5 justify-content-center" style={{width:140,background:'#FCE0BE'}}>
               <div className="rounded-circle " style={{width:15,height:15,background:'#FE8C00'}}></div>
               <div className="div px-2" style={{color:'#FE8C00',fontWeight:600}}><p>Requested</p></div>
                </div> */} {row?.email}
              </TableCell>
              <TableCell>{row.country}</TableCell>

              <TableCell><img src={deleteIcon} alt='delete-Icon' style={{width:25,height:25}} /></TableCell>
            </TableRow>  
            )
          
})}
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
              count={CFO?.data?.length}
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
  );
}

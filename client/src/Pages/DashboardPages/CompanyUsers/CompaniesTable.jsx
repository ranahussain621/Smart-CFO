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
import { TableHead, Checkbox, Button } from '@mui/material';
import deleteIcon from '../../../Assets/Images/delete.svg'
import {DeleteCompany, getCompaniesCFO, getUserCompanies} from '../../../Redux/SenarioPlanningSlice'
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import CFOTable from './CFOTable'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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






export default function CustomPaginationActionsTable({onCheckboxClick,onCheckbox}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Checkbox state for header and body
  const [selectAllChecked, setSelectAllChecked] = React.useState(false);
  const [selectAllCheckedUser, setSelectAllCheckedUser] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedRowsUser, setSelectedRowsUser] = React.useState([]);



    const [CompaniesList,setCompaniesList] = React.useState([])
    const [UsersList,setUsersList] = React.useState([])


  const dispatch = useDispatch();


const [viewUser,setViewUser] = React.useState(false)


  const {isLoading}  = useSelector((state) => state.SenarioPlanning);

  const [companyId,setCompanyId] = React.useState('')
  console.log("🚀 ~ CustomPaginationActionsTable ~ companyId:", companyId)

    const storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));

  useEffect(() => {
    if (storedUserDetail?.user?._id) {
      const fetchUserCompanies = async () => {
        try {
         const res = await dispatch(getUserCompanies({ user_id: storedUserDetail?.user?._id }));
         setCompaniesList(res.payload.data)

        } catch (error) {
          console.error("Error fetching user companies:", error);
        }
      };
      fetchUserCompanies();
    }
    if(companyId){
      const fetchCompaniesCFO = async () => {
        try {
        const res = await dispatch(getCompaniesCFO(companyId));
        setUsersList(res.payload.data)
        } catch (error) {
          console.error("Error fetching user companies:", error);
        }
      };
      fetchCompaniesCFO();
    }
  }, [companyId]);



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CompaniesList?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedRows = CompaniesList?.map((row) => row.title);
      setSelectedRows(newSelectedRows);
      setSelectAllChecked(true);
    } else {
      setSelectedRows([]);
      setSelectAllChecked(false);
    }
  };

  const handleSelectAllClickUser = (event) => {
    if (event.target.checked) {
      const newSelectedRows = UsersList?.map((row) => row.title);
      selectedRowsUser(newSelectedRows);
      setSelectAllCheckedUser(true);
    } else {
      selectedRowsUser([]);
      setSelectAllCheckedUser(false);
    }
  };




  const handleCheckboxClick = (event, name, id) => {
    const selectedIndex = selectedRows.indexOf(name);
    let newSelectedRows = [];
  
    if (selectedIndex === -1) {
      newSelectedRows.push(name); 
    }
  
    setSelectedRows(newSelectedRows);
    setSelectAllChecked(newSelectedRows.length === CompaniesList?.length);
    onCheckboxClick(id);
  };

  const handleCheckboxClickUser = (event, name, id) => {
    const selectedIndex = selectedRows.indexOf(name);
    let newSelectedRows = [];
  
    if (selectedIndex === -1) {
      newSelectedRows.push(name); 
    }
  
    setSelectedRowsUser(newSelectedRows);
    setSelectAllCheckedUser(newSelectedRows.length === CompaniesList?.length);
    onCheckboxClick(id);
  };

  
  const deleteCompany  = async (id) => {
     await dispatch(DeleteCompany({id:id?._id}))
      .then(async (res)=> {
      if(res.payload?.message === "Company deleted successfully!")  {
        toast.success("Deleted Successfully!")
        window.location.reload()
        await dispatch(getUserCompanies({ user_id: storedUserDetail?.user?._id }));
      }
      else {
        toast.error(res.payload?.data?.message)
      }
      
      })
  }




 const View = (item) => {
  setViewUser(!viewUser)
  onCheckbox(item?._id)
  setCompanyId(item?._id)
 }



  return (

     <>

{viewUser ? (
      <div className='mx-5 w-100'>
        <IconButton onClick={View}>
          <ArrowBackIcon />
        </IconButton>
        <TableContainer  className='bg-white mt-4'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className='my-5 border-0 '>
        <TableHead sx={{background:'#00003A',}}>
          <TableRow className=''>
           {/* <TableCell padding="checkbox" >
              <Checkbox
                {...label}
                className='text-white'
                checked={selectAllCheckedUser}
                indeterminate={selectedRowsUser.length > 0 && selectedRowsUser.length < UsersList?.length}
                onChange={handleSelectAllClickUser}
              />
            </TableCell>  */}
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
          </div>) : UsersList?.length  === 0 ? <div className='d-flex justify-content-center p-5 fs-4 fw-semibild' style={{minWidth:300}}>No Data</div> :      
          UsersList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const title = `${row?.firstName} ${row?.lastName}`
            return (
              <TableRow key={title} className=''>
              {/* <TableCell padding="checkbox">
                <Checkbox
                
                  {...label}
                  checked={selectedRowsUser.indexOf(row.title) !== -1}
                  onChange={(event) => handleCheckboxClickUser(event, row.title,row._id)}
                />
              </TableCell>  */}
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
              count={UsersList?.length}
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
      </div>
    ) : (
      <TableContainer  className={'bg-white mt-4 mx-5'}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className='my-5 border-0'>
        <TableHead sx={{background:'#00003A',}}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
               className='text-white'
                {...label}
                checked={selectAllChecked}
                indeterminate={selectedRows.length > 0 && selectedRows.length < CompaniesList?.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell  className='text-white'>Name</TableCell>
            {/* <TableCell  className='text-white'>User Status</TableCell> */}
            <TableCell  className='text-white'>CFO's List</TableCell>
            <TableCell  className='text-white'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          isLoading ? (<div className="d-flex justify-content-center p-5">
          <div class="spinner-border text-primary" role="status">
<span class="visually-hidden">Loading...</span>
</div>
    </div>) : CompaniesList?.length === 0 ? <div className="d-flex justify-content-center align-items-center p-5 fs-2"><p>No Data</p></div> :    
          CompaniesList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
          return (
            <TableRow key={row?.title}>
              <TableCell padding="checkbox">
                <Checkbox      
                  {...label}
                  checked={selectedRows.indexOf(row.title) !== -1}
                  onChange={(event) => handleCheckboxClick(event, row.title,row._id)}
                />
              </TableCell>
              <TableCell>{row?.title}</TableCell>
              {/* <TableCell>
                <div className="d-flex align-items-center p-2 rounded-5 justify-content-center" style={{width:140,background:'#FCE0BE'}}>
               <div className="rounded-circle " style={{width:15,height:15,background:'#FE8C00'}}></div>
               <div className="div px-2" style={{color:'#FE8C00',fontWeight:600}}><p>Requested</p></div>
                </div>
              </TableCell> */}
              <TableCell className='fs-6 ps-4 cursor-pointer' ><Button variant='outlined' sx={{textTransform:'capitalize',padding:'5px 30px'}} onClick={()=>View(row)}>View</Button></TableCell>

              <TableCell><img src={deleteIcon} alt='delete-Icon' style={{width:25,height:25,cursor:'pointer'}} onClick={()=>deleteCompany(row)} /></TableCell>
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
              count={CompaniesList?.length}
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
    )}



    
     </>

    
  );
}

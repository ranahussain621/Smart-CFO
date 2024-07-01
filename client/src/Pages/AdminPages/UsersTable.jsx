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
import { TableHead,  } from '@mui/material';
import deleteIcon from '../../Assets/Images/delete.svg'
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BlockUser, UnBlockUser, deleteUser, getAllUser } from '../../Redux/AdminSlice';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import UserPlans from './UserPlans';
import { Typography } from "@mui/material";


const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 70,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(30px)', // Adjusted value
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

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






export default function UsersTable({onCheckboxClick}) {


    const [list, setlist] = React.useState();
    const [userPlanModalOpen, setUserPlanModalOpen] = useState(false);
    const [userId, setuserId] = useState();
    const dispatch = useDispatch();


   const {isLoading} = useSelector((state)=>state.Admin)
     
    //get updated data through useSelector
    const updatedUser = useSelector((state) => state.Admin.adminData);
  
    function UserPlanModalScreen() {
      setUserPlanModalOpen(!userPlanModalOpen);
    }
  
   

    useEffect(() => {
       const getData = async () => {
      const response = await dispatch(getAllUser());
      const value = response?.payload;
      setlist(value?.data);
    };
      getData();
    }, []);


  const filteredList = list?.filter(user => user.email !== 'talha@cognuitive.com');


    const toggleUserStatus = async (id, userStatus) => {
      if (userStatus === "1") {
        dispatch(
          BlockUser({
            id,
          })
        ).then(() => {
          dispatch(getAllUser());
          toast.success("User has been Blocked", { duration: 1000 });
        });
      } else if (userStatus === "0") {
        dispatch(
          UnBlockUser({
            id,
          })
        ).then(() => {
          dispatch(getAllUser());
          toast.success("User has been UnBlocked", { duration: 1000 });
        });
      }
    };
  

    useEffect(() => {
      if (updatedUser) {
        setlist(updatedUser?.data);
      }
    }, [updatedUser]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);







  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredList?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


const DeleteUser = async (id) => {
  await dispatch(deleteUser({id:id}))
  .then(async (res)=>{
    toast.success(res?.payload?.message)
    await dispatch(getAllUser());
  })

}

  

 

  

  return (
    
    <>

     <div className="row mt-4 ">
    <div className="col-6">
      <Typography className="Main_Head fs-2">List of All Users</Typography>
    </div>
    <div className="col-6 text-end"></div>
  </div>


    <TableContainer  className='bg-white mt-4 '>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className='my-5 border-0'>
        <TableHead sx={{background:'#00003A',}}>
          <TableRow>
            <TableCell  className='text-white'>Name</TableCell>
            <TableCell  className='text-white'>Email</TableCell>
            <TableCell  className='text-white'>Company</TableCell>
            <TableCell  className='text-white'>Status</TableCell>
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
            ) : filteredList === 0 ? <div className="d-flex justify-content-center p-5">No Data</div> :
          filteredList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
           const name = `${row?.firstName} ${row?.lastName}`
            return (
             <TableRow key={row?.title}>
              <TableCell sx={{textTransform:'uppercase'}}>{name}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell> {row?.company?.map(company => ( <div key={company} style={{textTransform:'capitalize'}}>{company}</div> ))}</TableCell>
              <TableCell>
              <FormGroup>
              <label
                                class="form-check-label"
                                for="flexSwitchCheckChecked"
                              >
                                {row.status === "1" ? "Active" : "InActive"}
                              </label>
      <FormControlLabel control={<IOSSwitch className="ms-2"  onChange={() => { toggleUserStatus(row._id, row.status); }}   checked={row.status === "1"}  sx={{width:55}} />} />
    </FormGroup>
              </TableCell>
              <TableCell>
            <img src={deleteIcon} alt='Delete' style={{cursor:'pointer'}} onClick={()=>DeleteUser(row._id)} />
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

      <UserPlans
        user_id={userId}
        closeModal={UserPlanModalScreen}
        ModalIsOpen={userPlanModalOpen}
      />
    </TableContainer>
    </>
   
  );
}

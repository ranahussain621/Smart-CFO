import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import invite from '../../../Assets/Images/invite.png';
import CFOTable from './CFOTable';
import AssignCompany from './AssignCompany';


const UsersList = () => {



  const [userID, setUserID] = useState('');

  const [assign, setAssign] = useState(false)
     




  const assignModal = () => {
    setAssign(!assign);
  };

  const handleCheckboxClick = (selectedRowId) => {
    setUserID(selectedRowId)
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} className='ps-5'>
        <Typography className="" sx={{ fontSize: '24px', fontWeight: 600, color: '#525256' }}>Company CFO's List</Typography>
        {/* <Typography className="Main_subHead">Thu, 25 May, 2023, 10.30 PM </Typography> */}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} className='text-end pe-5'>

         <Button sx={{ textTransform: 'capitalize', fontWeight: 600, fontFamily: "poppins", borderRadius: 0 }}  variant="outlined" startIcon={<img src={invite} alt="invite" />} onClick={assignModal}>
          Assign Company
        </Button> 

      </Grid>

      

    
        <CFOTable onCheckboxClick={handleCheckboxClick}    />
   

    <AssignCompany
        companyModal={assignModal}
        addCompanyModalIsOpen={assign}
        userID={userID}
      />

    </Grid>
  );
}

export default UsersList;

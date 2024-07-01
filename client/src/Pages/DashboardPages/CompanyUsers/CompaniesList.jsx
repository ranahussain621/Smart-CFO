import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import invite from '../../../Assets/Images/invite.png';
import CompaniesTable from './CompaniesTable';
import InviteModal from './InviteModal';
import AddCompanyModal from './AddCompanyModal';
import AssignCompany from './AssignCompany';


const CompaniesList = () => {

  const [openModal, setOpenModal] = useState(false);
  const [openCompanyModal, setOpenCompanyModal] = useState(false);

  const [companyId, setCompanyId] = useState('');

    const [assignId,setAssignId] = useState('')
    const [assignIdUser,setAssignIdUser] = useState('')
   



    const [assign, setAssign] = useState(false)
    
    const assignModal = () => {
      setAssign(!assign);
    };
  
     
  const open = () => {
    setOpenModal(!openModal);
  };

  const openCompany = () => {
    setOpenCompanyModal(!openCompanyModal);
  };



  const handleCheckboxClick = (selectedRowId) => {
    setCompanyId(selectedRowId)
    if (companyId === selectedRowId) {
      setCompanyId('');
    } else {
      setCompanyId(selectedRowId);
    }
  };





  const handleCheckbox = (selectedRowId) => {
       
    setAssignId(selectedRowId)
    if (assignId === selectedRowId) {
      setAssignId('');
      setAssignIdUser('')
    } else {
      setAssignId(selectedRowId);
      setAssignIdUser(selectedRowId)
      
    }
  };




  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} className='ps-5'>
        <Typography className="" sx={{ fontSize: '24px', fontWeight: 600, color: '#525256' }}>Companies List</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} className='text-end '>
      
        {companyId && ( 
    <Button className='me-5 px-5' sx={{ textTransform: 'capitalize', fontWeight: 600, fontFamily: "poppins", borderRadius: 0  }}  variant="outlined"  startIcon={<img src={invite} alt="invite" />} onClick={open} > Invite  </Button>
        )}

        {
          assignIdUser && (
            <Button sx={{ textTransform: 'capitalize', fontWeight: 600, fontFamily: "poppins", borderRadius: 0 }} className='mx-4'  variant="outlined" startIcon={<img src={invite} alt="invite" />} onClick={assignModal}>
          Assign Company
        </Button> 
          )
        }
     <Button className='me-5' sx={{ textTransform: 'capitalize', fontWeight: 600, fontFamily: "poppins", borderRadius: 0 }} variant="outlined" startIcon={<img src={invite} alt="invite" />} onClick={openCompany}>
          add company
        </Button>
      </Grid>

      

   
        <CompaniesTable onCheckboxClick={handleCheckboxClick} onCheckbox = {handleCheckbox}  />
  

      <InviteModal
        closePlanModal={open}
        addPlanModalIsOpen={openModal}
        companyId={companyId}
   
      />

     <AddCompanyModal
        companyModal={openCompany}
        addCompanyModalIsOpen={openCompanyModal} 
      />


<AssignCompany
        companyModal={assignModal}
        addCompanyModalIsOpen={assign}
        userID={assignId}
      />
   

    </Grid>
  );
}

export default CompaniesList;

import React, {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Typography, Box, Button } from '@mui/material';
const data = [
    {
        companyname:'COde with node',
        card:'Master Card',
        nameoncard:'Franklin Jr.',
        lastTransaction:'$78.52',
        lastTransactionDate:'Mar 3, 2023',
        status:'Done',
        endDate:'Mar 3, 2023',
       
    },
    {
        companyname:'COde with node',
        card:'Master Card',
        nameoncard:'Franklin Jr.',
        lastTransaction:'$78.52',
        lastTransactionDate:'Mar 3, 2023',
        status:'Done',
        endDate:'Mar 3, 2023',
       
    },
    {
        companyname:'COde with node',
        card:'Master Card',
        nameoncard:'Franklin Jr.',
        lastTransaction:'$78.52',
        lastTransactionDate:'Mar 3, 2023',
        status:'Done',
        endDate:'Mar 3, 2023',
       
    },

]
const Payments = () => {

  return (
    <>
    <Grid container sx={{alignItems:"center"}}>
    <Grid item sm={9} md={9} lg={9}>
    <Typography className="Main_Head">Payments</Typography>
  <Typography className="Main_subHead">Thu, 25 May, 2023, 10.30 PM </Typography>
    </Grid>
  
   </Grid>
   <Grid container spacing={3}>
    <Grid item md={2.5}>
        <Box sx={{backgroundColor:"#FA9317", marginY:"2rem", color:"white", padding:"20px",alignItems:"center", textAlign:"center"}}>
            <Typography>
Amount Spent
            </Typography>
            <Typography>$56,998</Typography>
        </Box>
    </Grid>
    <Grid item md={2.5}>
        <Box sx={{backgroundColor:"#FC4349", marginY:"2rem", color:"white", padding:"20px",alignItems:"center", textAlign:"center"}}>
            <Typography>
Upcoming Payment
            </Typography>
            <Typography>$56,998</Typography>
        </Box>
    </Grid>
    <Grid item md={2.5}>
        <Box sx={{backgroundColor:"#2BAA3F", marginY:"2rem", color:"white", padding:"20px",alignItems:"center", textAlign:"center"}}>
            <Typography>
Total Balance
            </Typography>
            <Typography>$56,998</Typography>
        </Box>
    </Grid>
   </Grid>
           <div className="card shadow border-0">

<div className='card-body d-flex justify-content-center'>
    <div className='w-100'>
    <div class="container mt-3">
    <div className="table-responsive">
       <table class="table">
    <thead>
      <tr className='text-muted shadow' style={{backgroundColor:'#4545501A'}}>
      <th className='p-3'>
          <div> <input
           type="checkbox" 
           className="form-check-input mx-2" 
        //    value={planId}
        //    onChange={(e)=>setplanId(item._id)}
           /></div></th>
        <th className='p-3'>Company Name </th>
        <th className='p-3'>Card</th>
        <th className='p-3'>Name on Card</th>
        <th className='p-3'>Last Transaction</th>
        <th className='p-3'>Status</th>
        <th className='p-3'>End Date</th>
      </tr>
    </thead>
    <tbody>
    {data?.map((item, index) => (
    <tr key={index} className='text-muted shadow '>
       
      <td className='p-3'><div> <input
           type="checkbox" 
           className="form-check-input mx-2" 
        //    value={planId}
        //    onChange={(e)=>setplanId(item._id)}
           /></div></td>
           
            <td className='p-3'>{item. companyname}</td>
             <td className='p-3'>{item.card}</td>
        <td className='p-3'>{item.nameoncard}</td>
            <td className='p-3'>{item.lastTransaction}
            <br/>
            <span>{item.lastTransactionDate}</span>
            </td>
               
                    <td className='p-3'>{item.status}</td>
                        <td className='p-3'>{item.endDate}</td>
     
    
    </tr>
  ))}
    </tbody>
  </table>
      </div>  
   
  </div>
  </div>
  </div>
  </div>
 
  </>
  )
}

export default Payments
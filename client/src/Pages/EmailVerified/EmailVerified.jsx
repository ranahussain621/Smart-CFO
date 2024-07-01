import { Button, Container, Grid } from '@mui/material';
import React from 'react';
import logo from "../../Assets/Images/logo.png";
// import celeb from "../../Assets/Images/celeb.jpg";
import { FormSubTitle } from '../../globalStyle/global.style';
import './style.css'
import { Link } from 'react-router-dom';

const EmailVerified = () => {
  return (

    // <div className="email-verified-container">
    // <img src={celeb} alt="Success Background" className="background-image" />
    <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center"  className='card p-5 ms-2 pt-0' sx={{bgcolor:'lightgray'}}>
        <Grid item xs={12} textAlign="center">
          <img src={logo} alt="Logo" className='img-fluid' />
        </Grid>

        <Grid item xs={12} textAlign="center">
          <FormSubTitle className='fw-bolder' sx={{fontSize:'30px'}}>Enjoy The Best Experience!</FormSubTitle>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <h2 style={{ fontSize: '34px', color: '#FA9317', fontWeight: 600, textTransform: 'capitalize' }}>
            Hurrah! Your email address has been verified
          </h2>
        </Grid>

        <Grid item xs={12} textAlign="center" className='mb-3'>
       <Link to='/'>  <Button className='rounded-0 px-5 py-3 fw-bold' variant='contained'>Back to Home</Button></Link> 
        </Grid>
      </Grid>
    </Container>
    // {/* </div> */}
  );
};

export default EmailVerified;

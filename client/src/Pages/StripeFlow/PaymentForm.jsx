import { Box,Container, Grid, Typography } from "@mui/material";
import React,{useState} from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import {useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SubscribeUser } from "../../Redux/subscriptionSlice";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './style.css'


const Form = () => {

 
  const stripe = useStripe();
  const elements = useElements();

  const { state } = useLocation();

  const planId = state ? state?.planId : null;

  
  const { userData } = useSelector((state) => state.user);


  const {isLoading} = useSelector((state) => state.subscription);

  const [data, setData] = useState({
    user_name: "",
  });


  
  

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleChange = (e, field) => {
    let value = e.target ? e.target.value : e;
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
 
  const submit = async (e) => {
    e.preventDefault();
  

  
// Perform form validation
let formValid = true;
const newErrors = {};


if (data.user_name === '') {
  newErrors.user_name = 'Name is required';
  formValid = false;
}



if (!formValid) {
  setErrors(newErrors);
  return; 
}
  

   if(formValid){
   await stripe.createPaymentMethod({ type: 'card',card: elements.getElement(CardNumberElement,CardExpiryElement,CardCvcElement), billing_details: { name: data.user_name,  },})
   .then(async (resp)=>{
        await dispatch(SubscribeUser({
          user_id:userData?.user?._id,
            planId,
            paymentMethodId:resp?.paymentMethod?.id
        }))
        .then((res)=>{
          if(res?.payload?.success===false){
          
            toast.error(res?.payload?.message)
          }else{
              toast.success("Congratulations for signing up! Please login again.",{autoClose:2000})
         navigate('/login')   
          setData({ user_name: "", });
          }
       
        }) 
    
    })
 
    } 
 
  };

  const regularMove = () =>{
    navigate('/subscription-plans')
  }

  return (
   
   
      <Box className="mt-5" >
        <Container className="mt-5">
       
       

          <Grid
            spacing={3}
            container
            className="m-0 shadow-lg border-0 card"
            alignItems="center"
            sx={{
               background:'white',
              borderRadius: "8px",
              border: "3px solid #9f9f9f",
              borderTop: "none",
              padding: {
                xs: "20px",
                lg: "20px 50px",
              },
             
            }}
          >
            
            <Grid item xs={12} md={12}>
            <div className="row">
        <KeyboardBackspaceIcon className='' style={{fontSize:'4rem',cursor:'pointer', color:'#000'}} onClick={regularMove} />
        </div>

              <Box  sx={{ mt: "30px", }} >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#1A1F36",
                  }}
                >
                  Credit/Debit Card Details
                </Typography>

                <Box component="form">
                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                     * Name (as it appears on your card) 
                    </label>
                    <input type="text" 
                    style={{padding:'15px 15px',border:'1px solid black'}}
                    className="w-100  rounded form-control"
                    name="cardName"
                    value={data.user_name}
                    onChange={(e) => handleChange(e, "user_name")}
                    autoComplete="none"
                    placeholder = "Name"
                    />
                   
                     {errors.user_name && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.user_name}
                </span>
              )}
                  </Box>

                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                      * Card number 
                    </label>
                 

              <CardNumberElement
                style={{padding:'10px 15px',border:'2px solid black'}}
                id="card_number"
                name="card_number"
                value={data.card_number}
                className="payment-input rounded-2  bg-white p-3 form-control"
                onChange={(e) => handleChange(e, 'cardNo')}
                options={{ placeholder: '#' }}
              />
                   
                  </Box>

                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                      * Expiration date 
                    </label>
                  

<CardExpiryElement
                      style={{padding:'10px 15px'}}
                    id="account_expire"
                    autoComplete="none"
                    name="card_expiry"
                    value={data.card_expiry}
                    className="payment-input  rounded bg-white p-3 border"
                    onChange={(e) => handleChange(e, 'cardDate')}
                    options={{ placeholder: 'MM/YYYY' }}
                   
                   />

                  </Box>

                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                      * Security code 
                    </label>
                  

<CardCvcElement
                   
                    id="account_CVC"
                    name="card_cvc"
                    value={data.card_cvc}
                    className="payment-input  border rounded bg-white p-3"
                    onChange={(e) => handleChange(e, 'cardCVC')}
                    options={{ placeholder: 'CVC' }}
                  />
               
                  </Box>
               

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      mt: "25px",
                    }}
                  >
                    <button   type="button"  className="px-5 btn btn-dark rounded-0" style={{letterSpacing:1.3}} onClick={submit} > {isLoading ? "loading..." : "Pay"} </button> 
                  </Box>
                </Box>
              </Box>
            </Grid>

           
          </Grid>
        </Container>
      </Box>
  

  );
};

export default Form;

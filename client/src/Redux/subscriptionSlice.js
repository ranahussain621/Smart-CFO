import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  Myaxios, baseURL } from "../axios/axios";

export const getAllSubscriptionPlans = createAsyncThunk("getAllSubscription-Plans",async () => {
    const res = await axios.get(`${baseURL}auth/get-all-plans`);
    return res.data;
  }
);

export const SubscribeUser = createAsyncThunk("SubscribeUsers",async (data) => {

    const res = await axios.post(`${baseURL}auth/subscribe-customer-and-buy-plan`,data);
    return res.data;
  }
);



export const UnsubscribeUser = createAsyncThunk("auth/UnsubscribeUser", async (data, thunkAPI) => {
  try {
    const res = await Myaxios.post(`auth/unsubscribe-customer`, data);

    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);



export const getUserSubscription = createAsyncThunk("getUserSubscription",async (data) => {
 
    const res = await axios.post(`${baseURL}auth/get-user-subscription`,data);
    return res.data;
  }
);


const subscriptionSlice = createSlice({
  name: "subscriptionSlice",
  initialState: {
    isLoading: false,
    SubscriptionPlans: {},
    Subscribers:[],
    error: null,
    message: "",
    token: "",
  },
  extraReducers: (builder) => {

    builder.addCase(getAllSubscriptionPlans.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubscriptionPlans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.SubscriptionPlans = action.payload;
      state.error = null;
      state.message = action.payload.message;
      state.token = action.payload.token;
    });
    builder.addCase(getAllSubscriptionPlans.rejected, (state, action) => {
      state.isLoading = false;
      state.SubscriptionPlans = {};
      state.error = action?.payload?.message;
   
    });


    builder.addCase(SubscribeUser.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(SubscribeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Subscribers = action.payload;
        state.error = null;
        state.message = action.payload.message;
        state.token = action.payload.token;
      });
      builder.addCase(SubscribeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.Subscribers = {};
        state.error = action?.payload?.message;
     
      });

  
      builder.addCase(UnsubscribeUser.pending, (state) => {
        state.isLoading = true;
      });
  
      builder.addCase(UnsubscribeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Subscribers = action.payload;
        state.error = null;
        state.message = action.payload?.message;
      });
      builder.addCase(UnsubscribeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload?.error;
      });
  



   
  },
});

export default subscriptionSlice.reducer;

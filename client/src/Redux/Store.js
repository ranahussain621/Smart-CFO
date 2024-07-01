import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/AuthSlice"
import SenarioPlanningSlice from "./SenarioPlanningSlice";
import AdminSlice from "./AdminSlice";
import subscriptionSlice from "./subscriptionSlice";
const store = configureStore({
    reducer:{
        user: authReducer,
        SenarioPlanning:SenarioPlanningSlice,
        Admin:AdminSlice,
        subscription:subscriptionSlice
    }
})

export default store
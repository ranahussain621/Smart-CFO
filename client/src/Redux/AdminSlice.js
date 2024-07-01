import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-hot-toast";
import { Myaxios } from "../axios/axios";
// var storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
// console.log(storedUserDetail);
// let user_id = storedUserDetail?.user?._id;
// const token = localStorage.getItem("access-token");

//add kpi
export const AddKpis = createAsyncThunk(
  "admin/AddKpi",
  async (data, thunkAPI) => {
   
    try {
      const res = await Myaxios.post(`quickbook/add-Kpi`, data);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Invite CFO
export const InviteCFO = createAsyncThunk(
  "admin/InviteCFO",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/invit-cfo`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add plans goals
export const AddGoals = createAsyncThunk(
  "admin/Getplans",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/add-scenerio-planing-goals`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add plans goals
export const getAllPlans = createAsyncThunk(
  "admin/getAllPlans",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.get(`plan/get-plans`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add plans goals
export const getAllUser = createAsyncThunk(
  "admin/getAllUser",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.get(`auth/users`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




export const getAllQueries = createAsyncThunk(
  "admin/getAllQueries",
  async (_, thunkAPI) => {
    try {
      const res = await Myaxios.get(`query/get-Queries`, {
        headers: {
            authorization: `Bearer ${JSON.parse(
                localStorage.getItem("access-token")
            )}`
        }
    },);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//get My CFO
export const getMyCFO = createAsyncThunk(
  "admin/getMyCFO",
  async (id, thunkAPI) => {
    try {
      const res = await Myaxios.get(`auth/get-my-cfos/${id}`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }

    //invite acception
  }
);

export const deleteMyCFO = createAsyncThunk(
  "admin/getMyCFO",
  async (_, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/remove-cfo-from-team`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }

    //invite acception
  }
);
export const InvidedCFOData = createAsyncThunk(
  "admin/InvidedCFOData",
  async (id, thunkAPI) => {
    try {
   
      const res = await Myaxios.get(`auth/get-invitation-data/${id}`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add plans goals
export const getAllCompanyUser = createAsyncThunk(
  "admin/getAllUser",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.get(`auth/users`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//block user
export const BlockUser = createAsyncThunk(
  "admin/BlockUser",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`access/bolck-user`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//unBock user
export const UnBlockUser = createAsyncThunk(
  "admin/UnBlockUser",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`access/unbolck-user`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete kpi
export const DeleteKpi = createAsyncThunk(
  "admin/DeleteKpi",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`quickbook/delete-kpi`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Remove company
export const DeleteCompany = createAsyncThunk(
  "admin/DeleteCompany",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/company-delete`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete Goal
export const DeleteGoal = createAsyncThunk(
  "admin/DeleteGoal",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/delete-scenerio-planing-goal`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const deleteUser = createAsyncThunk(
  "admin/DeleteUser",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/delete-user`, data);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteQueries = createAsyncThunk("admin/deleteQueries", async (data, thunkAPI) => {
  try {
      const res = await Myaxios.post(
          `query/delete-query`, 
          data,
          {
              headers: {
                  authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
              }
          }
      );
      return res.data;
  } catch (error) {
      const message = error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
  }
});



//get company list
export const companiesList = createAsyncThunk(
  "admin/companiesList",
  async (_, thunkAPI) => {
    try {
      const res = await Myaxios.get(`auth/company-list`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const invotedCFODetail = createAsyncThunk(
  "auth/get-invited-cfo-detail",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/get-invited-cfo-detail`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    adminData: {
      cfoList: {},
    },
    QueriesList:[],
    error: null,
    message: "",
  },
  extraReducers: (builder) => {
    /*
     * addExternalSourceData
     */

    builder.addCase(InviteCFO.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(InviteCFO.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(InviteCFO.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
    builder.addCase(AddKpis.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(AddKpis.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(AddKpis.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
    /*
     * addExternalSourceData
     */

    builder.addCase(AddGoals.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(AddGoals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(AddGoals.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
    /*
     * get plans
     */

    builder.addCase(getAllPlans.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllPlans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getAllPlans.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
    /*invitation accept*/

    builder.addCase(InvidedCFOData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(InvidedCFOData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(InvidedCFOData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
    /* 
        get my cfo
        */

    builder.addCase(getMyCFO.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMyCFO.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData.cfoList = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getMyCFO.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
    /*
     * get all user
     */

    builder.addCase(getAllUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });


  

    
    builder.addCase(getAllQueries.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllQueries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.QueriesList = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getAllQueries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });

    /*
     * Block user
     */

    builder.addCase(BlockUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(BlockUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(BlockUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });

    /*
     * unBlock user
     */

    builder.addCase(UnBlockUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(UnBlockUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(UnBlockUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });

    /*
     * Delete CFO
     */

    builder.addCase(DeleteCompany.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(DeleteCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(DeleteCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
    /*
     * Delete kpi
     */

    builder.addCase(DeleteKpi.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(DeleteKpi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(DeleteKpi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });

    /*
     *delete goal
     */

    builder.addCase(DeleteGoal.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(DeleteGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(DeleteGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });

    /*
     *list of all companies
     */

    builder.addCase(companiesList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(companiesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(companiesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api issue", { duration: 6000 });
    });
  },
});

export default adminSlice.reducer;

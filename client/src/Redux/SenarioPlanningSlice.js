import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-hot-toast";
import { FormData, Myaxios } from "../axios/axios";

export const addExternalSourceData = createAsyncThunk(
  "senarioPlanning/addExternalSourceData",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(
        `quickbook/add-external-source-data`,
        data
      );

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get a list of all plans
export const Getplans = createAsyncThunk(
  "senarioPlanning/Getplans",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.get(`plan/get-company-plans/${data}`);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add plan
export const addPlan = createAsyncThunk(
  "senarioPlanning/addPlan",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/add-plan`, data);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getScoreCardPlan = createAsyncThunk(
  "senarioPlanning/addScoreCardPlan",
  async (id, thunkAPI) => {
    try {
      const res = await Myaxios.get(
        `balanced-card/get-balanced-score-cards/${id}`
      );
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addScoreCardPlan = createAsyncThunk(
  "senarioPlanning/addScoreCardPlan",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(
        `balanced-card/add-balanced-score-card`,
        data
      );
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateScoreCardPlan = createAsyncThunk(
  "senarioPlanning/UpdateScoreCardPlan",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(
        `balanced-card/add-balanced-score-card`,
        data
      );
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changePlanStatus = createAsyncThunk(
  "senarioPlanning/changePlanStatus",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.get(`plan/change-plan-status/${data}`);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add plan
export const addNewGoal = createAsyncThunk(
  "senarioPlanning/addNewGoal",
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

//add scenario planning
export const addScenaioPlan = createAsyncThunk(
  "senarioPlanning/addScenaioPlan",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/add-scenerio-planing`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  "senarioPlanning/deletePlan",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.delete(`plan/delete-plan/${data}`);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteScoreCardPlan = createAsyncThunk(
  "senarioPlanning/deleteScoreCardPlan",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.get(`balanced-card/delete-score-card/${data}`);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get a list of all senario planning goals
export const getGoals = createAsyncThunk(
  "senarioPlanning/getGoals",
  async (_, thunkAPI) => {
    try {
      const res = await Myaxios.get(`plan/get-scenerio-planing-goals`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add scenario goal to plan
export const addScenarioGoalToPlan = createAsyncThunk(
  "senarioPlanning/addScenarioGoalToPlan",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/add-scenerio-goals-to-plan`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adddScoreCardKPI = createAsyncThunk(
  "senarioPlanning/adddScoreCardKPI",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`balanced-card/add-score-card-kpi`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateScoreCardKPI = createAsyncThunk(
  "senarioPlanning/UpdateScoreCardKPI",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(
        `balanced-card/update-score-card-kpi`,
        data
      );
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getScoreCardKPI = createAsyncThunk(
  "senarioPlanning/getScoreCardKPI",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.get(
        `balanced-card/get-score-card-kpis/${data}`
      );
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get a list of all senario KPI
export const getSenarioKPI = createAsyncThunk(
  "senarioPlanning/getSenarioKPI",
  async (_, thunkAPI) => {
    try {
      const res = await Myaxios.get(`quickbook/getKpis`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoalsKPI = createAsyncThunk(
  "senarioPlanning/getGoalsKPI",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/get-goal-kpi`, data);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add scenario planning
export const addScenaioKPI = createAsyncThunk(
  "senarioPlanning/addScenaioKPI",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/add-plan-kpi`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get a selected list plan KPI
export const getSelectedKPI = createAsyncThunk(
  "senarioPlanning/getSelectedKPI",
  async ({ plan_id }, thunkAPI) => {
    try {
      const res = await Myaxios.get(`plan/get-plan-kpi/${plan_id}`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add senario plan quater data
export const addPlanQuaterData = createAsyncThunk(
  "senarioPlanning/addPlanQuaterData",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/add-plan-data`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add senario plan quater data
export const getPlanData = createAsyncThunk(
  "senarioPlanning/getPlanData",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`plan/get-plan-data`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add company data
export const addCompany = createAsyncThunk(
  "auth/invit-cfo",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/add-company`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add company data
export const assignCompanytoCFO = createAsyncThunk(
  "auth/assignCompanytoCFO",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/assign-company`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add company data
export const DeleteCompany = createAsyncThunk(
  "auth/DeleteCompany",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`auth/remove-company`, data);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get a user's company
export const getUserCompanies = createAsyncThunk(
  "auth/get-user-companies",
  async ({ user_id }, thunkAPI) => {
    try {
      const res = await Myaxios.get(`auth/get-user-companies/${user_id}`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get a user's company
export const getCompaniesCFO = createAsyncThunk(
  "auth/get-Companies-cfo",
  async (id, thunkAPI) => {
    try {
      const res = await Myaxios.get(`auth/get-my-cfos/${id}`);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// send invitation data
export const sendInvite = createAsyncThunk(
  "auth/add-company",
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

// send invitation data
export const quickbookBalanceScoreCard = createAsyncThunk(
  "quickbook/get-quickbook-data-balance-scorecard",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(
        `quickbook/get-quickbook-data-balance-scorecard`,
        data
      );
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCfosCompany = createAsyncThunk(
  "auth/get-cfos-company",
  async (data, thunkAPI) => {
    try {
      const res = await Myaxios.post(`/auth/get-cfos-company`, data);
      console.log(res, "response");
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCompanyDetail = createAsyncThunk(
  "authentication/getCompanyDetail",
  async (id) => {
    const res = await Myaxios.get(`auth/company-details/${id}`);
    return res.data;
  }
);

export const fetchQuickbookPlan = createAsyncThunk(
  "authentication/fetchQuickbookPlan",
  async (data) => {
    const res = await Myaxios.post(
      `quickbook/get-quickbook-data-scenario-plan`,
      data
    );
    return res.data;
  }
);

export const getDashboardData = createAsyncThunk(
  "authentication/getDashboardData",
  async (data) => {
    const res = await Myaxios.post(
      `quickbook/get-quickbook-data-dashboard`,
      data
    );
    return res.data;
  }
);

export const UploadCSVFile = createAsyncThunk(
  "authentication/UploadCSVFile",
  async (data) => {
    const res = await FormData.post(`excel/upload`, data);
    return res.data;
  }
);

const senarioPlanningSlice = createSlice({
  name: "senarioPlanning",
  initialState: {
    isLoading: false,
    senarioPlanData: {
      userSelectedkpi: {},
    },
    PlanData: [],
    GoalsData: {},
    error: null,
    message: "",
    usersCompanies: {},
    CFO: {},
    companyDetail: {},
    balanceScoreCard: {},
    scoreCardPlan: {},
    scoreCardKPI: {},
    DashboardData: {},
  },
  extraReducers: (builder) => {
    /*
     * addExternalSourceData
     */

    builder.addCase(addExternalSourceData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addExternalSourceData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(addExternalSourceData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(
        state.error
          ? state.error
          : "User credential is wrong!, Please try agin",
        { duration: 6000 }
      );
    });
    /*
     * getplans
     */

    builder.addCase(Getplans.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(Getplans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(Getplans.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "not getting list", {
        duration: 6000,
      });
    });

    builder.addCase(getScoreCardPlan.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getScoreCardPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.scoreCardPlan = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getScoreCardPlan.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "not getting list", {
        duration: 6000,
      });
    });

    builder.addCase(changePlanStatus.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(changePlanStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(changePlanStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "not getting list", {
        duration: 6000,
      });
    });

    /*
     * addPlans
     */

    builder.addCase(fetchQuickbookPlan.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addPlan.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(addPlan.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(
        state.error
          ? state.error
          : "User credential is wrong!, Please try agin",
        { duration: 6000 }
      );
    });

    builder.addCase(getUserCompanies.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersCompanies = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getUserCompanies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    builder.addCase(getCompanyDetail.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCompanyDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companyDetail = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getCompanyDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    builder.addCase(getCompaniesCFO.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCompaniesCFO.fulfilled, (state, action) => {
      state.isLoading = false;
      state.CFO = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getCompaniesCFO.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    builder.addCase(addNewGoal.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addNewGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.GoalsData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(addNewGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(
        state.error
          ? state.error
          : "User credential is wrong!, Please try agin",
        { duration: 6000 }
      );
    });

    /*
     * addScenarioPlans
     */

    builder.addCase(addScenaioPlan.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addScenaioPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(addScenaioPlan.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(
        state.error
          ? state.error
          : "User credential is wrong!, Please try agin",
        { duration: 6000 }
      );
    });

    /*
     * get senario planning goals
     */

    builder.addCase(getGoals.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(
        state.error
          ? state.error
          : "User credential is wrong!, Please try agin",
        { duration: 6000 }
      );
    });

    //    add scenario gaol to plan

    builder.addCase(addScenarioGoalToPlan.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addScenarioGoalToPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(addScenarioGoalToPlan.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    //    get scenario KPI

    builder.addCase(getSenarioKPI.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSenarioKPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getSenarioKPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    builder.addCase(adddScoreCardKPI.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getScoreCardKPI.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getScoreCardKPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.scoreCardKPI = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getScoreCardKPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    builder.addCase(getGoalsKPI.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGoalsKPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getGoalsKPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    //    add scenario KPI

    builder.addCase(addScenaioKPI.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addScenaioKPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(addScenaioKPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    //    get selected kpi list

    builder.addCase(getSelectedKPI.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSelectedKPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData.userSelectedkpi = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getSelectedKPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });

    //    get selected kpi list

    builder.addCase(addPlanQuaterData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addPlanQuaterData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.senarioPlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(addPlanQuaterData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 1500,
      });
    });

    builder.addCase(quickbookBalanceScoreCard.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(quickbookBalanceScoreCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.balanceScoreCard = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(quickbookBalanceScoreCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 1500,
      });
    });

    //    get plan data

    builder.addCase(getPlanData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPlanData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.PlanData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getPlanData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 1500,
      });
    });

    builder.addCase(getDashboardData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.DashboardData = action.payload;
      state.error = null;
      state.message = action.payload?.message;
    });
    builder.addCase(getDashboardData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      toast.error(state.error ? state.error : "api problem", {
        duration: 6000,
      });
    });
  },
});

export default senarioPlanningSlice.reducer;

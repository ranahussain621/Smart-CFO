import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuickbookPlan } from "../../Redux/SenarioPlanningSlice";
import { useLocation, useNavigate } from "react-router-dom";

const FetchQuickbookData = (props) => {
  const location = useLocation();
  const plan_id = location.state?.plan_id;

  const DataShowInTable = location.state?.DataShowInTable;

  const user = JSON.parse(localStorage?.getItem("userDetail"));
  const quickBookToken = localStorage?.getItem("quickbookToken");

  const { isLoading } = useSelector((state) => state.SenarioPlanning);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getQuickBookData = async () => {
    await dispatch(
      fetchQuickbookPlan({
        plan_id: plan_id,
        company_id: user?.company_ids[0]?._id,
        token: quickBookToken,
      })
    ).then((res) => {
      if (res.payload.success === true) {
        navigate("/userdashboard/KpiPlan", {
          state: { plan_id: plan_id, DataShowInTable: DataShowInTable },
        });
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      {isLoading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only fs-1">Loading...</span>
        </div>
      ) : (
        <button
          className="btn btn-dark px-4 rounded-0 py-2"
          onClick={getQuickBookData}
        >
          Fetch Quickbook Data
        </button>
      )}
    </div>
  );
};

export default FetchQuickbookData;

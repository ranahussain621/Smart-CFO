import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  addScenaioKPI,
  getGoals,
  getGoalsKPI,
  getSelectedKPI,
  getSenarioKPI,
} from "../../Redux/SenarioPlanningSlice";

const StepperScreen3 = (props) => {
  const [kpiId, setKpiId] = useState([]);
  

  
  const [goalKpiData, setGoalKpiData] = useState({});



  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.SenarioPlanning);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getGoals());
      const goals = response?.payload?.data;
      const selectedGoals = goals.filter((goal) =>
        props.goalTitle.includes(goal.title)
      );
      if (selectedGoals?.length === props.goalTitle?.length) {
        const res = await dispatch(getGoalsKPI({ goalType: props.goalTitle }));
        setGoalKpiData(res.payload.data);
      } else {
        const response = await dispatch(getSenarioKPI());
        setGoalKpiData(response?.payload?.data);
      }
    };
    fetchData();
  }, [props.goalTitle,dispatch]);

  const handleGoalChange = (e, Id) => {
    if (e.target.checked) {
      setKpiId([...kpiId, Id]);
    } else {
      setKpiId(kpiId.filter((id) => id !== Id));
    }
  };

  const sendKPI = () => {
    if (kpiId.length > 0) {
      dispatch(addScenaioKPI({ plan_id: props.plan_id, kpi_id: kpiId }))
        .then(async (res) => {
          if (res.payload.success === true) {
            dispatch(getSelectedKPI(props.plan_id));
            toast.success("Plan KPIs assigned successfully!");
            props.nextwindow(3);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast.error("Please select KPIs", { duration: 1500 });
    }
  };

  return (
    <div className="pt-3 d-flex justify-content-center">
      <div className="row justify-content-center w-100">
        {isLoading ? (
          <div className="d-flex justify-content-center p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          Object.keys(goalKpiData).map((goalType, i) => (
            <div className="col-md-6 mt-5 ps-4" key={i}>
              <h4 className="fs-5 ps-4 font-bold  mb-3 mt-2">{goalType}</h4>

              {goalKpiData[goalType].map((kpi, j) => (
                <div className=" col-md-12 form-check form-check-inline" key={j}>
                  <label className="checker">
                    {kpi.title}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`inlineCheckbox${i}${j}`}
                      value={kpi._id}
                      checked={kpiId.includes(kpi._id)}
                      onChange={(e) => handleGoalChange(e, kpi._id)}
                    />
                    <span
                      className="checkmark"
                      style={{
                        borderRadius: "20px",
                        background: "#2BAA3F",
                      }}
                    ></span>
                  </label>
                </div>
              ))}
            </div>
          ))
        )}
        <div className="d-flex align-items-center justify-content-end mb-4 text-end py-4 me-4">
          <div className="">
            {/* <button
              type="button"
              disabled
              className="btn btn-light ps-5 pe-5"
              style={{ border: "1px solid black" }}
              onClick={() => {
                props.nextwindow(1);
              }}
            >
              Back
            </button> */}
          </div>
          <div className="text-center px-3">
            <button
              type="button"
              style={{background:'#2457C5',}}
              className="btn text-white px-4 rounded"
              onClick={sendKPI}
            >
              {isLoading ? "Loading" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperScreen3;

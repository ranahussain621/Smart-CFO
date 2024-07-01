import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Getplans, deletePlan } from "../../Redux/SenarioPlanningSlice";
import AddPlanModal from "./AddPlanModal";
import deleteIcon from "../../Assets/Images/delete.svg";
import toast from "react-hot-toast";
import "./style.css";

const ScenrioPlanning2 = ({ CompanySwitchDta }) => {
  const [addPlanModalOpen, setaddPlanModalOpen] = useState(false);
  const [planId, setplanId] = useState();

  const { isLoading } = useSelector((state) => state.SenarioPlanning);
  const updateData = useSelector((state) => state.SenarioPlanning.PlanData);

  const [data, setData] = useState([]);

  const userDetail = JSON.parse(localStorage.getItem("userDetail"));

  const handleCheckboxClick = (item) => {
    if (planId === item._id) {
      setplanId(null);
    } else {
      setplanId(item._id);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (updateData?.length > 0) {
      setData(updateData?.data);
    }
  }, [updateData]);

  useEffect(() => {
    const getInitialValues = async () => {
      const userDetail = JSON.parse(localStorage.getItem("userDetail"));
      if (userDetail?.company_ids?.length > 0) {
        await dispatch(Getplans(userDetail?.company_ids[0]?._id)).then(
          (res) => {
            setData(res.payload.data);
          }
        );
      } else {
        console.error("company_id is undefined or empty.");
      }
    };
    getInitialValues();
  }, []);

  function addPlanModalScreen() {
    setaddPlanModalOpen(!addPlanModalOpen);
  }
  const handleClick = (item) => {
    item?.editingStatus === true
      ? navigate("/userdashboard/steppers", { state: { planId: planId ,name:item.name} })
      : navigate("/userdashboard/KpiPlan", { state: { plan_id: planId ,name:item.name } });
  };

  const deletePlans = async (item, e) => {
    e.preventDefault();
    await dispatch(deletePlan(item?._id)).then(async () => {
      toast.success("Plan Deleted Successfully !", { autoClose: 2000 });
      await dispatch(Getplans(userDetail?.company_ids[0]?._id)).then((res) => {
        setData(res.payload.data);
      });
    });
  };

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    // hour: "numeric",
    // minute: "2-digit",
    // hour12: true,
  };

  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString("en-US", options);

  return (
    <div className="mx-2 mb-5 mt-4">
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <h2
            style={{
              fontWeight: 600,
              fontSize: "30px",
              textTransform: "capitalize",
              color: "#000000",
            }}
          >
            Scenario Listing
          </h2>
          <h2
              style={{
                fontWeight: 500,
                fontSize: "18px",
                textTransform: "lowerCase",
                color: "#000000",
                margin: 0,
              }}
            >
              As of{" "}
              <span style={{ textTransform: "capitalize" }}>
                <em>{formattedDateTime}</em>
              </span>
            </h2>
        </div>
        <div className="col-md-6 text-end">
          <button
            type="button"
            class="btn rounded px-4 py-2 text-white shadow"
            style={{ background:'#2457C5' }}
            onClick={addPlanModalScreen}
          >
         <span className="pt-3 me-2 fs-6">+</span> <span>Add  Scenario Plan</span> 
          </button>
        </div>
      </div>
      <div className="card shadow border-0">
        <div className="card-body d-flex justify-content-center px-0">
          <div className="w-100">
            <div class=" mt-3 px-0 mx-0">
              <div className="table-responsive">
                <table class="table table-borderless">
                  <thead>
                    <tr
                      className=" fw-semobold shadow-lg"
                      style={{ backgroundColor: "#00003A", }}
                    >
                      <th
                        className="p-4"
                        style={{
                          color: "white",
                        }}
                      >
                        Name
                      </th>
                      <th
                        className="p-4"
                        style={{
                          color: "white",
                        }}
                      >
                        Type
                      </th>
                      <th
                        className="p-4"
                        style={{
                          color: "white",
                        }}
                      >
                        Goal
                      </th>
                      {/* <th
                        className="p-4"
                        style={{
                          color: "white",
                        }}
                      >
                        Dashboard
                      </th> */}
                      {/* <th
                        className="p-4"
                        style={{
                          color: "white",
                        }}
                      >
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <div className="d-flex justify-content-center p-5">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>{" "}
                        </div>
                      </div>
                    ) : data?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <p className="fw-bold fs-5">No plan</p>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {data?.map((item, index) => {
                          return (
                            <>
                              <tr
                                key={index}
                                style={{borderBottom:'1px solid #D9D5EC'}}
                                className="shadow-sm rounded-4 fw-semibold"
                              >
                                <td className="p-4">
                                  <div className="d-flex">
                                    <div>
                                      {" "}
                                      <input
                                        type="checkbox"
                                        className="form-check-input mx-2"
                                        value={planId}
                                        checked={planId === item._id}
                                        onChange={() =>
                                          handleCheckboxClick(item)
                                        }
                                      />
                                    </div>
                                    <div
                                      className="px-4"
                                      // onClick={() => handleClick(item)}
                                    >
                                      {item.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">{item.type}</td>
                                <td className="p-4">{item.Goal}</td>
                                {/* <td className="p-4">View</td> */}
                                {/* <td className="p-4">
                                  <img
                                    onClick={(e) => deletePlans(item, e)}
                                    src={deleteIcon}
                                    style={{
                                      width: 25,
                                      height: 25,
                                      cursor: "pointer",
                                    }}
                                    alt="delete-icon"
                                  />
                                </td> */}
                              </tr>
                            </>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <button
                className="m-3 mt-5 rounded shadow"
                disabled={!data || data?.length === 0}
                style={{
                  backgroundColor: "#2457C5",
                  color: "#fff",
                  padding: "10px",
                  width: "90px",
                  
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleClick(data.find((item) => item._id === planId))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddPlanModal
        closePlanModal={addPlanModalScreen}
        addPlanModalIsOpen={addPlanModalOpen}
      />
    </div>
  );
};

export default ScenrioPlanning2;

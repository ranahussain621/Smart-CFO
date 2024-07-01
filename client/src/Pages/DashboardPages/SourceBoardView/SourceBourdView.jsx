import React from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import deleteIcon from "../../../Assets/Images/delete.svg";
// import edit from "../../../Assets/Images/edit.svg";
import toast from "react-hot-toast";
import "./style.css";
import AddScenarioModal from "./AddScenarioModal";
import { deleteScoreCardPlan, getScoreCardPlan } from "../../../Redux/SenarioPlanningSlice";
import UpdateScenarioModal from "./UpdateScenarioModal";


const SourceBourdView = () => {
  const [addPlanModalOpen, setaddPlanModalOpen] = useState(false);
  const [planId, setplanId] = useState();

  const { isLoading } = useSelector((state) => state.SenarioPlanning);
  const updateData = useSelector((state) => state.SenarioPlanning.PlanData);

  const [data, setData] = useState([]);


  const location = useLocation();
  const updateCardKPI = location.state?.edit;
  console.log("🚀 ~ SourceBourdView ~ update:", updateCardKPI)

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

      const userDetail = JSON.parse(localStorage.getItem("userDetail"));

  useEffect(() => {
    const getInitialValues = async () => {
      if (userDetail?.company_ids?.length > 0) {
        await dispatch(getScoreCardPlan(userDetail?.company_ids[0]?._id)).then(
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
    console.log("🚀 ~ handleClick ~ item:", item)
    
    navigate("/userdashboard/addbalancesourceboard", { state: { scoreCardId: item?._id , updateCardKPI:updateCardKPI ,name:item?.name} })
  };

  const deletePlans = async (item, e) => {
    e.preventDefault();
    await dispatch(deleteScoreCardPlan(item?._id)).then(async () => {
      toast.success("Plan Deleted Successfully !", { autoClose: 2000 });
      await dispatch(getScoreCardPlan(userDetail?.company_ids[0]?._id)).then((res) => {
        setData(res.payload.data);
      });
    });
  };

 
   const [updateModal,setUpdateModal] = useState(false)
   const [planData,setPlanData]=useState({})
 

   
  const updatePlans = (item) => {
    setUpdateModal(!updateModal)
    setPlanData(item)
  }


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
    <div className="mb-5 mt-4">
      <div className="row justify-content-center mb-4 w-100 mx-1">
        <div className="col-md-6">
          <h2
            style={{
              fontWeight: 600,
              fontSize: "30px",
              textTransform: "capitalize",
              color: "#000000",
            }}
          >
            Score Card Plans Listing
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
      
        <div className="col-md-6 text-end px-0">
          <button
            type="button"
            class="btn rounded px-4 py-2 text-white shadow"
            style={{ background:'#2457C5' }}
         onClick={addPlanModalScreen}
          >  <span className="pt-3 me-2 fs-6">+</span> <span>Add Score Card Plan</span> 
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
                      className="shadow"
                      style={{ backgroundColor: "#00003A" }}
                    >
                      <th
                        className="p-3"
                        style={{
                          color: "white",
                        }}
                      >
                        Sr #
                      </th>
                      <th
                        className="p-3"
                        style={{
                          color: "white",
                        }}
                      >
                        Title
                      </th>
                      <th
                        className="p-3"
                        style={{
                          color: "white",
                        }}
                      >
                        Fiscal Year
                      </th>
                      

                      <th
                        className="p-3"
                        style={{
                          color: "white",
                        }}
                      >
                        Action
                      </th>
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
                       
                        
                        const endDateYear = new Date(item.endDate).getFullYear();
                          return (
                            <>
                              <tr
                                key={index}
                                style={{borderBottom:'1px solid #D9D5EC'}}
                                className="shadow-sm fw-semibold rounded-4 "
                              >  <td className="p-4 mt-5 pt-4">{index + 1}</td>
                                <td className="">
                                  <div className="d-flex">
                                     <div>
                                      {" "}
                                      <input
                                        type="checkbox"
                                        className="form-check-input mx-2 mt-3"
                                        value={planId}
                                        checked={planId === item._id}
                                        onChange={() =>
                                          handleCheckboxClick(item)
                                        }
                                      />
                                    </div> 
                                    <div
                                      className="px-2 mt-3"
                                      // onClick={() => handleClick(item)}
                                    >
                                      {item.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 mt-5 pt-4">{endDateYear}</td>
                               
                               
                                <td className="p-4 d-flex align-items-center">
                               {/* <div>
                                   <img
                                     onClick={() => updatePlans(item)}
                                    src={edit}
                                    style={{
                                      width: 25,
                                      height: 25,
                                      cursor: "pointer",
                                    }}
                                    alt="delete-icon"
                                  />
                               </div> */}
                               <div className="mx-3">
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
                               </div>
                             
                                 
                                </td>
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

   <div className="d-flex align-items-center">
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
      </div>


      <AddScenarioModal
        closePlanModal={addPlanModalScreen}
        addPlanModalIsOpen={addPlanModalOpen}
      />

       <UpdateScenarioModal
        closePlanModal={updatePlans}
        addPlanModalIsOpen={updateModal}
        planData={planData}
      />
    </div>
  );
};

export default SourceBourdView;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addScenarioGoalToPlan,
  getGoals,
} from "../../Redux/SenarioPlanningSlice";
import { toast } from "react-hot-toast";
import AddNewGoalModal from "./AddNewGoalModal";

const StepperScreen2 = (props) => {



  const [goalsId,setGoalsId] = useState([]);
  


  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)=>state.SenarioPlanning)      
     const SenarioPlanning = useSelector((state)=>state.SenarioPlanning)

  const getData = () => {
     dispatch(getGoals()).then((response) => {
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleGoalChange = (e, goalId, goalTitle) => {
    if (e.target.checked) {
      setGoalsId([...goalsId, goalId]);
      props.updateGoalTitle([...props.goalTitle, goalTitle]);
    } else {
      setGoalsId(goalsId.filter((id) => id !== goalId));
      props.updateGoalTitle(props.goalTitle.filter((title) => title !== goalTitle));
    }
  };


  const sendGoads = () => {
    if (goalsId?.length > 0) {
      dispatch( addScenarioGoalToPlan({
          plan_id: props?.plan_id,
          scenerio_goal_id: goalsId,
        })
      ).then(() => {
        toast.success("Scenerio Planing Goal assigned successfully!");
        props.nextwindow(2);
      });
    } else {
      toast.error("please select Goals", { duration: 1500 });
    }
    props.nextwindow(2);
  };

   const [openMODAL,setOpenModal] = useState(false)
  const addPlanModalScreen = () => {
    setOpenModal(!openMODAL)
  }
  return (
    <div className="d-flex justify-content-end w-100 mx-4">
      
      <div className="row w-100 p-5 px-0">
        <div className="mb-4 ps-0 text-end" >
       {/* <button
            type="button"
            class="btn btn-light me-4"
            style={{ border: "1px solid grey" }}
            onClick={addPlanModalScreen}
          >
            Add New Goal
          </button>     */}
        </div>
     
        {SenarioPlanning?.senarioPlanData?.data?.map((item, i) => (
         <div className="col-md-12 mx-3" key={i}>
              <div className="form-check form-check-inline w-100">
                <label class="checker d-flex align-items-center"> {item.title}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={item._id}
                    checked={goalsId.includes(item._id)}
                    onChange={(e) => handleGoalChange(e, item._id,item.title)}
                  />
                  <span class="checkmark"style={{ borderRadius: "20px",background:'#2BAA3F' }} ></span>
                </label>
              </div>
         
          </div>
        ))} 
    
        <div className="d-flex align-items-center justify-content-end mb-4  mt-5 me-4">
          <div className="">
            <button
              
              type="button"
              class="btn btn-light px-4 rounded"
              style={{ border: "1px solid black" }}
              onClick={() => {
                props.nextwindow(0);
              }}
            >
              Back
            </button>
          </div>
          <div className="text-center px-3">
            <button
              type="button"
              className="btn text-white px-4 rounded"
              style={{background:'#2457C5',}}
              onClick={sendGoads}
              disabled={SenarioPlanning?.senarioPlanData?.data?.length === 0}
            >
             {isLoading ? "Loading":'Next'} 
            </button>
          </div>
        </div>
      </div>

      <AddNewGoalModal
        closePlanModal={addPlanModalScreen}
        addPlanModalIsOpen={openMODAL}
      />
    </div>

    
  );
};

export default StepperScreen2;

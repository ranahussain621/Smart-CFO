import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Getplans, addScenaioPlan } from "../../Redux/SenarioPlanningSlice";


const StepperScreen1 = (props) => {

  const [name, setname] = useState("");
  const [type, setType] = useState();
  const [industryName, setindustryName] = useState("");
  const dispatch = useDispatch();

     const {isLoading} = useSelector((state)=>state.SenarioPlanning)
   const [plans,setPlans] = useState('')

    const userDetail = JSON.parse(localStorage.getItem("userDetail"))
   const company_id = userDetail?.company_id?.company_id
 

      useEffect(()=>{
        const getPlans = async() =>{
         const res = dispatch(Getplans(company_id))

      setPlans(res?.payload?.data)
        }
    getPlans()
      
      },[company_id])

  const sendData = () => {
    if (name === "" || type === "" || industryName === "") {
      toast.error("please fill all credentials");
    } else { 
      dispatch(
        addScenaioPlan({
          plan_id:props.plan_id,
          name,
          type,
          industryName,
        })
      ).then(() => {
        toast.success("Scenerio Planing added successfully!");
        props.nextwindow(1);
      });
    }
  };

  return (
    <div className="container mb-5 px-0 mx-0">
      <div className="card border-0">
        <div className="card-body d-flex justify-content-center me-0 pe-0">
          <div className="row w-100">
            <div className="row justify-content-center mb-4 mt-5 me-0 pe-0">
              <div className="col-md-12">
                <label htmlFor="textInput" className="form-label">
                  Name
                </label>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  id="textInput"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mb-4 me-0 pe-0">
              <div className="col-md-12">
                <label htmlFor="numberInput" className="form-label">
                  Industry
                </label>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Industry Name"
                  className="form-control"
                  id="numberInput"
                  value={industryName}
                  onChange={(e) => setindustryName(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mb-4 me-0 pe-0">
              <div className="col-md-12">
                <label className="form-label">Type</label>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Type"
                  className="form-control"
                  id="numberInput"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-5 text-end">
              {/* <div className="">
                <button
                  type="button"
                  class="btn btn-light px-5"
                  style={{ border: "1px solid black" }}
                >
                  Back
                </button>
              </div> */}
              <div className="text-end me-2">
                <button
                  type="button"
                  class="btn  px-4 rounded text-white"
                  style={{background:'#2457C5',}}
                  onClick={sendData}
                >
                  {isLoading ? "Loading...":"Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperScreen1;

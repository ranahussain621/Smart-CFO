import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExternalSourceData } from "../../Redux/SenarioPlanningSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import ModalTable from "../../componant/steppers/ModalTable";
import { FaPlus } from "react-icons/fa6";


const ScenrioPlanning = (props) => {
  const [clientId, setclientId] = useState("");
  const [dataSource, setdataSource] = useState("");
  const [clientSecret, setclientSecret] = useState("");
  const [user_id, setuserId] = useState("");
  const [environment, setEnvironment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
     const location = useLocation()
     const plan_id = location.state?.plan_id;
     
     const userDetail = JSON.parse(localStorage.getItem("userDetail"))
     const company_id = userDetail?.company_ids


     const companyData = JSON.parse(localStorage.getItem("company-data"))



  useEffect(() => {
    var storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
    setuserId(`${storedUserDetail?.user?._id}`);
  }, []);

  const handleSubmit = async () => {
    if (
      dataSource === "" ||
      clientId === "" ||
      clientSecret === "" ||
      environment === ""
    ) {
      toast.error("please fill all credentials");
    } else {
      const response = await dispatch(
        addExternalSourceData({
          user_id,
          dataSource,
          clientSecret,
          clientId,
          environment,
          company_id: companyData?._id ? companyData?._id : company_id[0]?.company_id 
        })
      );
      const data = response.payload;
      if (data) { window.open(data, "_blank"); }
      navigate("/userdashboard/balancesourceboard");
    }
  };

  const [templateDataModalOpen, setTemplateDataModalOpen] = useState(false);
  function templateModalScreen() {
    setTemplateDataModalOpen(!templateDataModalOpen)
  } 

  return (
     <>
    <ModalTable  closePlanModal={templateModalScreen} planId = {plan_id}
    addPlanModalIsOpen={templateDataModalOpen}/>
    
    <div className="container mb-5">
      <div className="mb-4" style={{
        display : "flex",
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div className="col-md-6">
          <p className="fw-bold m-0">Add External Data Source</p>
          <small className="text-muted">Thu, 25 May, 2023, 10.30 PM</small>
        </div>
        <div className="mb-4text-end pe-5">
              <button className="btn btn-dark flex flex-row" style={{ alignItems: 'center',
            justifyContent: 'center', 
            borderRadius: '0px'}} onClick={handleSubmit}><FaPlus size={20}/>Add Source</button>
            </div>
      </div>
      <div className="card shadow border-0">
        <div className="card-body d-flex justify-content-center">
          <div className="w-100">
           
            <div className="row justify-content-center mb-4 mt-5">
              <div className="col-md-12">
                <label htmlFor="textInput" className="form-label">
                  Client Id
                </label>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Client Id"
                  className="form-control"
                  id="textInput"
                  value={clientId}
                  onChange={(e) => setclientId(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mb-4">
              <div className="col-md-12">
                <label htmlFor="numberInput" className="form-label">
                  Data Source
                </label>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Data Source"
                  className="form-control"
                  id="numberInput"
                  value={dataSource}
                  onChange={(e) => setdataSource(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mb-4">
              <div className="col-md-12">
                <label htmlFor="dateInput" className="form-label">
                  Client Secret
                </label>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Client Secret"
                  className="form-control"
                  id="dateInput"
                  value={clientSecret}
                  onChange={(e) => setclientSecret(e.target.value)}
                />
              </div>
            </div>

            <div className="row justify-content-center mb-4">
              <div className="col-md-12">
                <label htmlFor="dateInput" className="form-label">
                  Environment
                </label>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Environment"
                  className="form-control"
                  id="dateInput"
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                />
              </div>
            </div>

    <div className="d-flex justify-content-start">
        <div className='mb-4  mb-4 text-end pe-5'>
        <button className="btn btn-dark px-5" style={{
          borderRadius: "0px",
          
        }} onClick={templateModalScreen} >View</button>
                            </div>
        
    </div>
          
          </div>
        </div>
      </div>
    </div>  
     </>
   
  );
};

export default ScenrioPlanning;

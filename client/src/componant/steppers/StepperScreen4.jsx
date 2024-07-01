import React, { useState } from "react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlanQuaterData,
  changePlanStatus,
  getPlanData,
  getSelectedKPI,
} from "../../Redux/SenarioPlanningSlice";
import { toast } from "react-hot-toast";
import ModalTable from "./ModalTable";
import { useNavigate } from "react-router-dom";
import "./stepper.css";
import TemplateTable from "./TemplateTable";

const StepperScreen4 = (props) => {


  const [selectedKpi, setselectedKpi] = useState();

  const [selectedkpiId, setselectedkpiId] = useState({
    title: "",
    id: "",
  });
  const [templateDataModalOpen, setTemplateDataModalOpen] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [kpiDataType, setkpiDataType] = useState("");
  const [QuaterValues, setQuaterValues] = useState({
    quater1: "",
    quater2: "",
    quater3: "",
    quater4: "",
  });
  const navigate = useNavigate();
  const [DataShowInTable, setDataShowInTable] = useState([]);
 


  // const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const getUpdatedSelectedKpi = useSelector(
    (state) => state.SenarioPlanning.senarioPlanData.userSelectedkpi
  );

  //    get selected kpi vlaues from api
  const getSelectedList = async () => {
    const response = await dispatch(
      getSelectedKPI({ plan_id: props?.plan_id })
    );
    const value = response.payload;
    setselectedKpi(value?.data);
  };
  // call api function in useEffect
  useEffect(() => {
    getSelectedList();
  }, [dispatch]);

  // get updated value of selected kpi values
  useEffect(() => {
    if (getUpdatedSelectedKpi?.data?.length > 0) {
      setselectedKpi(getUpdatedSelectedKpi?.data);
    }
  }, [getUpdatedSelectedKpi?.data]);

  const isDuplicateIdeal = DataShowInTable.some(
    (item) => item.name === selectedkpiId.title && item.type === "ideal"
  );

  const isDuplicateAverage = DataShowInTable.some(
    (item) => item.name === selectedkpiId.title && item.type === "Average"
  );

  const isDuplicateWorst = DataShowInTable.some(
    (item) => item.name === selectedkpiId.title && item.type === "wrost"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (
      QuaterValues.quater1 === "" ||
      QuaterValues.quater2 === "" ||
      QuaterValues.quater3 === "" ||
      QuaterValues.quater4 === "" ||
      kpiDataType === "" ||
      selectedkpiId.id === ""
    ) {
      return toast.error("please fill all credentials");
    }

    const newDataObject = {
      name: selectedkpiId.title,
      kpi_id: selectedkpiId.id,
      type: kpiDataType,
      quater1: QuaterValues.quater1,
      quater2: QuaterValues.quater2,
      quater3: QuaterValues.quater3,
      quater4: QuaterValues.quater4,
    };

    // API call to add plan quarter data
    dispatch(
      addPlanQuaterData({
        plan_id: props?.plan_id,
        kpi_id: selectedkpiId.id,
        type: kpiDataType,
        q1: QuaterValues.quater1,
        q2: QuaterValues.quater2,
        q3: QuaterValues.quater3,
        q4: QuaterValues.quater4,
      })
    ).then(() => {
      // Update DataShowInTable with new data (using spread operator)
      setDataShowInTable((prevData) => {
        // Check if the data already exists (optional)
        const isDuplicate = prevData.some(
          (item) =>
            item.name === newDataObject.name && item.type === newDataObject.type
        );
        return isDuplicate ? prevData : [...prevData, newDataObject];
      });

      // Alternative update with concat (optional)
      // setDataShowInTable(prevData => prevData.concat(newDataObject));

      toast.success("Data added successfully!");
      dispatch(getPlanData({ plan_id: props?.plan_id }));
      setselectedkpiId({ title: "", id: "" });
      setkpiDataType("");
      setQuaterValues({
        quater1: "",
        quater2: "",
        quater3: "",
        quater4: "",
      });
    });

    // Reset form values
  };
  function templateModalScreen() {
    setTemplateDataModalOpen(!templateDataModalOpen);
    props.setStepperDisplay(!props.stepperDisplay);
    // localStorage.setItem("kpiPlan", props?.plan_id);
    // navigate(`/userdashboard/KpiPlan/${props?.plan_id}`);
  }


  
  const move = async () => {

    const requiredKpiIds = selectedKpi.flatMap((item) =>
      item.data.map((innerItem) => innerItem.kpi_id)
    );
  
    // Get all KPI ids that have been added to DataShowInTable
    const selectedKpiIds = DataShowInTable.map((item) => item.kpi_id);
  
    // Check if all required KPIs have been selected
    const allKpisSelected = requiredKpiIds.every((id) =>
      selectedKpiIds.includes(id)
    );
  
    // If not all KPIs are selected, show an error message and prevent navigation
    if (!allKpisSelected) {
      toast.error("Please select all KPIs from the list");
      return;
    }

    navigate("/userdashboard/KpiPlan", {
      state: { plan_id: props?.plan_id ,DataShowInTable:DataShowInTable,truee:'direct'}
    });
        await dispatch(changePlanStatus(props?.plan_id))

  };

  return (
    <>
      {!templateDataModalOpen ? (
        <div className="container mb-5">
          <div className="row">
            <div className="card border-0 mx-0 px-0">
              <div className="card-body p-0 m-0 mx-5">
                <form action="" onSubmit={handleSubmit}>
                  {/* selected kpi values */}
                  <div className="row justify-content-center mb-4 mt-5">
                    <div className="col-md-12">
                      <label className="form-label fw-bold ">Select KPI</label>
                    </div>
                    <div className="col-md-12">
                      <select
                        id="selectInput"
                        className="form-select"
                        value={selectedkpiId.id}
                        onChange={(e) => {
                          setselectedkpiId({
                            title:
                              e.target.options[e.target.selectedIndex].text,
                            id: e.target.value,
                          });
                          setIsInputDisabled(!e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select KPI
                        </option>
                        {selectedKpi?.map((item, i) => (
   
    <React.Fragment key={i}>
      {item.data.map((innerItem, j) => { 
        return (
           <option value={innerItem.kpi_id} key={j}>
          {innerItem.kpi_title}
        </option> 
        )
   
      
}
      
      )}
    </React.Fragment>
  ))}
                      </select>
                    </div>
                  </div>
                  {/* quater values type */}
                  <div className="row justify-content-center mb-4 mt-4">
                    <div className="col-md-2"></div>
                    <div className="col">
                      <div class="form-check form-check-inline">
                        <input
                          className="form-check-input"
                         
                          type="checkbox"
                          id={`inlineCheckbox`}
                          value="ideal"
                          disabled={isInputDisabled || isDuplicateIdeal}
                          checked={kpiDataType === "ideal"}
                          onChange={(e) => setkpiDataType(e.target.value)}
                        />
                        <label class="form-check-label" for="inlineCheckbox1">
                          Ideal Target
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div class="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`inlineCheckbox`}
                          value="Average"
                          checked={kpiDataType === "Average"}
                          disabled={isInputDisabled || isDuplicateAverage}
                          onChange={(e) => setkpiDataType(e.target.value)}
                        />
                        <label class="form-check-label" for="inlineCheckbox1">
                          Average Target
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div class="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`inlineCheckbox`}
                          value="wrost"
                          disabled={isInputDisabled || isDuplicateWorst}
                          checked={kpiDataType === "wrost"}
                          onChange={(e) => setkpiDataType(e.target.value)}
                        />
                        <label class="form-check-label" for="inlineCheckbox1">
                          Worst Target
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Quater input values */}
                  <div className="row justify-content-center mb-4">
                    <div className="col-md-12">
                      <label htmlFor="textInput" className="form-label fw-bold">
                        Q1
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="number"
                        placeholder="Quarter 1"
                        className="form-control"
                        id="textInput"
                        value={QuaterValues.quater1}
                        onChange={(e) => {
                          setQuaterValues({
                            ...QuaterValues,
                            quater1: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mb-4">
                    <div className="col-md-12">
                      <label htmlFor="textInput" className="form-label fw-bold">
                        Q2
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="number"
                        placeholder="Quarter 2"
                        className="form-control"
                        id="textInput"
                        value={QuaterValues.quater2}
                        onChange={(e) => {
                          setQuaterValues({
                            ...QuaterValues,
                            quater2: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mb-4">
                    <div className="col-md-12">
                      <label htmlFor="textInput" className="form-label fw-bold">
                        Q3
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="number"
                        placeholder="Quarter 3"
                        className="form-control"
                        id="textInput"
                        value={QuaterValues.quater3}
                        onChange={(e) => {
                          setQuaterValues({
                            ...QuaterValues,
                            quater3: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mb-4">
                    <div className="col-md-12">
                      <label htmlFor="textInput" className="form-label fw-bold">
                        Q4
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="number"
                        placeholder="Quarter 4"
                        className="form-control"
                        id="textInput"
                        value={QuaterValues.quater4}
                        onChange={(e) => {
                          setQuaterValues({
                            ...QuaterValues,
                            quater4: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-end pe-3">
                    <button
                      className="btn text-white w-auto px-3 "
                      style={{background:'#2457C5',}}
                      type="submit"
                    >
                      {" "}
                      <span className="pt-3 me-1 fs-6">+</span> <span>Add </span> 
                    </button>
                    {/* <button className='btn  w-auto px-4 ' style={{
                          borderRadius: "0px"
                      }} type='submit'> Back</button> */}
                  </div>
                </form>
              </div>

              {/* table for show values */}
              <div className="card-body p-0 m-0 mt-2 mx-5">
                <div className="row w-100 m-0 p-0">
                  <div className="table-responsive m-0 p-0">
                    <table class="table">
                      <thead>
                        <tr
                          className="text-muted shadow"
                          style={{ backgroundColor: "#00003A", color: "white" }}
                        >
                          <th className="p-3" style={{ color: "white" }}>
                            KPI
                          </th>
                          <th className="p-3" style={{ color: "white" }}>
                            Type
                          </th>
                          <th className="p-3" style={{ color: "white" }}>
                            Q1
                          </th>
                          <th className="p-3" style={{ color: "white" }}>
                            Q2
                          </th>
                          <th className="p-3" style={{ color: "white" }}>
                            Q3
                          </th>
                          <th className="p-3" style={{ color: "white" }}>
                            Q4
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {DataShowInTable?.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              <p className="fw-bold ">No data</p>
                            </td>
                          </tr>
                        ) : (
                          DataShowInTable.map((item, index) => (
                            <tr key={index} className="text-muted shadow">
                              <td className="p-3">{item.name}</td>
                              <td className="p-3">{item.type}</td>
                              <td className="p-3">{item.quater1}</td>
                              <td className="p-3">{item.quater2}</td>
                              <td className="p-3">{item.quater3}</td>
                              <td className="p-3">{item.quater4}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row mb-4 text-end pe-0">
                <div className="col d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-light px-4 rounded"
                    style={{ border: "1px solid black" }}
                    onClick={() => {
                      props.nextwindow(2);
                    }}
                  >
                    Back
                  </button>
                </div>
                {/* <div className="col-2  text-center"> */}
                  {/* <button
                    style={{
                      backgroundColor: "#222222",
                      color: "#fff",
                      padding: "10px",
                      width: "90px",
                    }}
                    className="move-btn text-white rounded"
                    onClick={templateModalScreen}
                  >
                    View
                  </button> */}
                  {/* <button type="button" class="btn btn-dark ps-5 pe-5"  onSubmit={() => {
                                  handleOpenModel();}}>Next</button> */}
                {/* </div> */}
                <div className="col-2  text-center ">
                  <button
                   style={{background:'#2457C5',padding:'10px'}}
                    className="text-white rounded px-4 rounded"
                    onClick={move}
                    disabled={selectedKpi?.length === 0 || !selectedKpi}
                  >
                    Next
                  </button>
                  {/* <button type="button" class="btn btn-dark ps-5 pe-5"  onSubmit={() => {
                                  handleOpenModel();}}>Next</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {templateDataModalOpen ? (
        <TemplateTable
          planId={props.plan_id}
          closePlanModal={templateModalScreen}
          addPlanModalIsOpen={templateDataModalOpen}
        />
      ) : (
        ""
      )}
      {/* <ModalTable
        closePlanModal={templateModalScreen}
        planId={props.plan_id}
        addPlanModalIsOpen={templateDataModalOpen}
      /> */}
    </>
  );
};

export default StepperScreen4;

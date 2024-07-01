import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getPlanData } from "../../Redux/SenarioPlanningSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "85%",
    maxWidth: "95%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
};

const ModalTable = ({ addPlanModalIsOpen, closePlanModal, planId }) => {
  const [ShowData, setShowData] = useState();

  const updateddata = useSelector((state) => state?.SenarioPlanning?.PlanData);

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await dispatch(getPlanData({ plan_id: planId }));
    const data = response?.payload;
    setShowData(data?.data);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  useEffect(() => {
    if (updateddata) {
      setShowData(updateddata?.data);
    }
  }, [updateddata]);
  return (
    <>
      <Box>
        <Modal
          isOpen={addPlanModalIsOpen}
          onRequestClose={closePlanModal}
          style={{ overlay: { zIndex: 9999 }, content: customStyles.content }}
          contentLabel="Example Modal"
        >
          <div style={{ padding: "20px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="fw-bold mb-4 fs-3">Template Data</p>
              </div>
              <div>
                <IconButton onClick={closePlanModal} aria-label="delete">
                  <CloseIcon sx={{ color: "#000" }} />
                </IconButton>
              </div>
            </div>

            <Box>
              <div></div>
              <div className="table-responsive mt-md-3">
                <table className="table table-bordered">
                  <thead
                    className="  "
                    style={{ background: "#00003A", color: "white" }}
                  >
                    <tr>
                      <th>KPI</th>
                      <th>Quater 1</th>
                      <th>Quater 2</th>
                      <th>Quater 3</th>
                      <th>Quater 4</th>
                      <th>Quater 1</th>
                      <th>Quater 2</th>
                      <th>Quater 3</th>
                      <th>Quater 4</th>
                      <th>Quater 1</th>
                      <th>Quater 2</th>
                      <th>Quater 3</th>
                      <th>Quater 4</th>
                      <th>Quater 1</th>
                      <th>Quater 2</th>
                      <th>Quater 3</th>
                      <th>Quater 4</th>
                    </tr>
                    <tr>
                      <th rowSpan="2" className="pb-2">
                        KPI
                      </th>
                      <th
                        colSpan="4"
                        className="py-2"
                        style={{ padding: "0px 0px 0px 10rem" }}
                      >
                        Actual
                      </th>
                      <th
                        colSpan="4"
                        className="py-2"
                        style={{ padding: "0px 0px 0px 10rem" }}
                      >
                        Ideal
                      </th>
                      <th
                        colSpan="4"
                        className="py-2"
                        style={{ padding: "0px 0px 0px 10rem" }}
                      >
                        Average
                      </th>
                      <th
                        colSpan="4"
                        className="py-2"
                        style={{ padding: "0px 0px 0px 10rem" }}
                      >
                        Worst
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ShowData?.map((item, i) => {
             
                      let actual = {};
                      let ideal = {};
                      let average = {};
                      let worst = {};
                 
                      item.kpi_data.forEach((values) => {
                 
                        if (values.type === "actual") {
                          actual["q1"] = values.data[0].q1;
                          actual["q2"] = values.data[0].q2;
                          actual["q3"] = values.data[0].q3;
                          actual["q4"] = values.data[0].q4;
                        } else if (values.type === "ideal") {
                          ideal["q1"] = values.data[0].q1;
                          ideal["q2"] = values.data[0].q2;
                          ideal["q3"] = values.data[0].q3;
                          ideal["q4"] = values.data[0].q4;
                        } else if (values.type === "Average") {
                          average["q1"] = values.data[0].q1;
                          average["q2"] = values.data[0].q2;
                          average["q3"] = values.data[0].q3;
                          average["q4"] = values.data[0].q4;
                        } else if (values.type === "wrost") {
                          worst["q1"] = values.data[0].q1;
                          worst["q2"] = values.data[0].q2;
                          worst["q3"] = values.data[0].q3;
                          worst["q4"] = values.data[0].q4;
                        }
                      });

                      return (
                        <tr key={i}>
                          <td>{item.kpi_title} </td>
                          <td>{actual.q1}</td>
                          <td>{actual.q2}</td>
                          <td>{actual.q3}</td>
                          <td>{actual.q4}</td>
                          <td>{ideal.q1}</td>
                          <td>{ideal.q2}</td>
                          <td>{ideal.q3}</td>
                          <td>{ideal.q4}</td>
                          <td>{average.q1}</td>
                          <td>{average.q2}</td>
                          <td>{average.q3}</td>
                          <td>{average.q4}</td>
                          <td>{worst.q1}</td>
                          <td>{worst.q2}</td>
                          <td>{worst.q3}</td>
                          <td>{worst.q4}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Box>
          </div>
        </Modal>
      </Box>
    </>
  );
};

export default ModalTable;

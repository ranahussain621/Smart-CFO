import { Box, IconButton, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Getplans, addPlan } from "../../Redux/SenarioPlanningSlice";
import { toast } from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minWidth: "700px",
    maxWidth: "800px",
    transform: "translate(-50%, -50%)",
  },
};

const AddPlanModal = ({ addPlanModalIsOpen, closePlanModal }) => {
  const currentYear = new Date().getFullYear();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [goal, setGoal] = useState("");
  const [fiscalYear, setFiscalYear] = useState(currentYear);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const userDetail = JSON.parse(localStorage.getItem("userDetail"));

  const submitData = async () => {
    if (title === "" || type === "" || goal === "" || fiscalYear === "") {
      toast.error("please fill all credentials");
      return
    } 
  
    setLoading(true);
     await dispatch(
        addPlan({
          user_id: userDetail?.company_ids[0]?.user_id,
          name: title,
          type,
          Goal: goal,
          company_id: userDetail?.company_ids[0]?._id,
          fiscal_year: fiscalYear,
        })
      ).then(async () => {
        await dispatch(Getplans(userDetail?.company_ids[0]?._id));

        setGoal("");
        setTitle("");
        setType("");
        setFiscalYear("");
        toast.success("plan add successfully!");
        closePlanModal();
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  
  };

  return (
    <Modal
      isOpen={addPlanModalIsOpen}
      onRequestClose={closePlanModal}
      style={{ overlay: { zIndex: 9999 }, content: customStyles.content }}
      contentLabel="Example Modal"
    >
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={closePlanModal} aria-label="delete">
            <CloseIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>

        <Box>
          <Typography
            variant="h5"
            className="text-start mb-3 px-5"
            sx={{ fontWeight: "600", color: "#000" }}
          >
            Add Plan
          </Typography>

          <Box variant="div" className="">
            <div className="d-flex  " style={{ minWidth: 200 }}>
              <div className="d-flex align-items-center">
                <label className="px-5" htmlFor="exampleInputEmail1">
                  Title
                </label>
              </div>

              <input
                type="text"
                style={{ marginLeft: 5 }}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="d-flex my-4 " style={{ minWidth: 200 }}>
              <div className="d-flex align-items-center">
                <label className="px-5" htmlFor="exampleInputEmail1">
                  Type
                </label>
              </div>

              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="d-flex my-4" style={{ minWidth: 200 }}>
              <div className="d-flex align-items-center">
                <label className="px-5" htmlFor="exampleInputEmail1">
                  Goal
                </label>
              </div>

              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="d-flex " style={{ minWidth: 200 }}>
              <div className="d-flex align-items-center">
                <label className="py-1 " htmlFor="exampleInputEmail1" style={{width:'102px'}}>
                  Fiscal Year
                </label>
              </div>

              <select
                name=""
                id="fiscalYearSelect"
                className=" rounded-0 w-100"
                value={fiscalYear}
                style={{ marginLeft: "2rem" }}
                onChange={(e) => setFiscalYear(e.target.value)}
              >
                {Array.from({ length: 20 }, (_, i) => currentYear + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="d-flex justify-content-end w-100 mt-4">
              <button
              disabled={loading}
                className="btn text-white rounded px-4 py-1 shadow"
                style={{background:'#2457C5'}}
                onClick={submitData}
              >
                Add
              </button>
            </div>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPlanModal;

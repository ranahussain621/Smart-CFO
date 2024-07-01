import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Typography, Box, Button } from "@mui/material";
import AddGoalModal from "./InviteModal";
import { useDispatch, useSelector } from "react-redux";
import { getMyCFO } from "../../../Redux/AdminSlice";

import DeleteCFO from "./DeleteCFO";
// import DeleteModal from './DeleteModal';

const CfoList = () => {
  const [list, setlist] = useState([]);

  const [userId, setuserId] = useState();
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [addPlanModalOpen, setaddPlanModalOpen] = useState(false);

  const updatedList = useSelector((state) => state.Admin.adminData.cfoList);

  const dispatch = useDispatch();

  var User = JSON.parse(localStorage.getItem("userDetail"));
  let userid = User?.company_id?.company_id;


  const getData = async () => {
    const response = await dispatch(getMyCFO(userid));
    const value = response?.payload;
    setlist(value?.data);
  };
  //get the user data when initialy component is render
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (updatedList) setlist(updatedList?.data);
  }, [updatedList]);
  function deleteModalScreen() {
    setdeleteModalOpen(!deleteModalOpen);
  }
  function addPlanModalScreen() {
    setaddPlanModalOpen(!addPlanModalOpen);
  }

  function deleteModalScreen() {
    setdeleteModalOpen(!deleteModalOpen);
  }
  return (
    <>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item sm={9} md={9} lg={9}>
          <Typography className="Main_Head">CFO List</Typography>
          <Typography className="Main_subHead">
            Thu, 25 May, 2023, 10.30 PM{" "}
          </Typography>
        </Grid>
        <Grid item sm={3} md={3} lg={3} sx={{ textAlign: "end" }}>
          <Button variant="outlined" onClick={addPlanModalScreen}>
            Invite
          </Button>
        </Grid>
      </Grid>
      <div className="card shadow-sm border">
        <div className="card-body d-flex justify-content-center">
          <div className="w-100">
            <div class="container mt-3">
              <div className="table-responsive">
                <table class="table table-borderless">
                  <thead>
                    <tr
                      className="text-muted shadow border"
                      style={{ backgroundColor: "#00003A" }}
                    >
                      <th className="p-3 text-white	">Sr. </th>
                      <th className="p-3 text-white	">CFO Name </th>
                      <th className="p-3 text-white	">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <p className="fw-bold fs-5">No CFO</p>
                        </td>
                      </tr>
                    ) : (
                      list?.map((item, index) => (
                        <tr
                          key={index}
                          className="text-muted shadow-sm border rounded-3 "
                        >
                          <td className="p-3 ">{index}</td>

                          <td className="p-3">
                            {item.firstName} {item.lastName}
                          </td>
                          <td className="p-3">{item.email}</td>
                          <td className="p-3">
                            <Box sx={{ display: "flex" }}>
                              <DeleteIcon
                                sx={{ color: "red" }}
                                onClick={() => {
                                  deleteModalScreen();
                                  setuserId(item._id);
                                }}
                              />
                            </Box>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddGoalModal
        user_id={userId}
        closePlanModal={addPlanModalScreen}
        addPlanModalIsOpen={addPlanModalOpen}
      />

      <DeleteCFO
        user_id={userId}
        closeModal={deleteModalScreen}
        ModalIsOpen={deleteModalOpen}
      />
    </>
  );
};

export default CfoList;

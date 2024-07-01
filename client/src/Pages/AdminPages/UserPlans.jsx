import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getUserSubscription } from "../../Redux/subscriptionSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minWidth: "900px",
    maxWidth: "1300px",
    transform: "translate(-50%, -50%)",
  },
};

const UserPlans = ({ user_id, ModalIsOpen, closeModal }) => {
  
  const [list, setlist] = useState([]);


    const {isLoading} = useSelector((state)=>state.SenarioPlanning)

  const dispatch = useDispatch();

 
 const getInitalValues = async () => {
    await dispatch(getUserSubscription({user_id:user_id}))
    .then((res)=>{
      setlist(res?.payload?.subscriptions)
    })
  }
  useEffect(() => {
    getInitalValues();
  }, []);

  return (
    <Box>
      <Modal
        isOpen={ModalIsOpen}
        onRequestClose={closeModal}
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
            <IconButton onClick={closeModal} aria-label="delete" className="mb-4">
              <CloseIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
          <div className="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr
                  className="text-muted shadow"
                  style={{ backgroundColor: "#4545501A" }}
                >
                  <th className="p-3">Plans</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Goals</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <p className="fw-bold">Loading...</p>
                    </td>
                  </tr>
                ) : list?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <p className="fw-bold mt-5">No data</p>
                    </td>
                  </tr>
                ) : (
                  list?.map((item, index) => (
                    <tr key={index} className="shadow-sm border rounded-3">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.type}</td>
                      <td className="p-3">{item.Goal}</td>
                      <td className="p-3">
                        <Box sx={{ display: "flex" }}>
                          <DeleteIcon sx={{ color: "red" }} />
                          <ErrorOutlineIcon />
                        </Box>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserPlans;

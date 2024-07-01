import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addCompany,assignCompanytoCFO,getUserCompanies } from "../../../Redux/SenarioPlanningSlice";
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

const AssignCompany = ({ addCompanyModalIsOpen, companyModal ,userID}) => {
    const [formData, setFormData] = useState({
        company_id: '',
        // user_id: userID
        user_id: "662f9841e0accd439de40d28"
    });

    const dispatch = useDispatch();



  const {usersCompanies}  = useSelector((state) => state.SenarioPlanning);


  useEffect(() => {
    if (usersCompanies?.data?.length > 0) {
        setFormData(prevState => ({
            ...prevState,
            company_id: usersCompanies.data[0]._id 
        }));
    }
}, [usersCompanies]);


    const storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));

  useEffect(() => {
      const fetchUserCompanies = async () => {
        try {
         await dispatch(getUserCompanies({ user_id: storedUserDetail?.user?._id }));
        } catch (error) {
          console.error("Error fetching user companies:", error);
        }
      };
      fetchUserCompanies();
  }, [dispatch,storedUserDetail?.user?._id]);

   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitData = () => {
            dispatch(assignCompanytoCFO(formData))
                .then(() => {
                    setFormData(prevState => ({
                        ...prevState,
                        company_id: ''
                    }));
                    dispatch(getUserCompanies({ user_id: storedUserDetail?.user?._id}));
                    toast.success("Company added successfully!");
                    companyModal();
                })
                .catch((error) => {
                    toast.error("Error adding company: " + error.message);
                });
        
    };

    return (
        <Modal
            isOpen={addCompanyModalIsOpen}
            onRequestClose={companyModal}
            style={{ overlay: { zIndex: 9999 }, content: customStyles.content }}
            contentLabel="Assign Company Modal"
        >
            <Box sx={{ padding: "20px" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                    }}
                >
                    <IconButton onClick={companyModal} aria-label="delete">
                        <CloseIcon sx={{ color: "#000" }} />
                    </IconButton>
                </Box>

                <Box>
                    <Typography variant="h5"
                        className="text-start mb-3 px-5 mb-4"
                        sx={{ fontWeight: "600", color: "#000" }}>
                        Assign Company
                    </Typography>

                    <Box variant='div' className=''>
                        <div className="ms-5">

                            <select name="company_id" id="" className="form-control"  value={formData.company_id} onChange={handleChange}>
                                {
                                    usersCompanies?.data?.map((item,i)=>{
                                      
                                        return (
                                            <option value={item?._id} key={i}>{item.title}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                  

                        <div className="d-flex justify-content-end w-100 mt-5 ">
                            <button className="btn btn-dark rounded-0" onClick={submitData}>
                                Submit
                            </button>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AssignCompany;

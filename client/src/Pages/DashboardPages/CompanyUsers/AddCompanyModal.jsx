import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, getUserCompanies } from "../../../Redux/SenarioPlanningSlice";
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
    datePickerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: 300,
        marginLeft: "10rem"
    }
};

const AddCompanyModal = ({ addCompanyModalIsOpen, companyModal }) => {
    const [formData, setFormData] = useState({
        title: '',
        user_id: '',
    });
    
    const [loading, setLoading] = useState(false);

    const { isLoading } = useSelector((state) => state.SenarioPlanning);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
        setFormData(prevState => ({
            ...prevState,
            user_id: storedUserDetail?.user?._id
        }));
    }, []);

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            title: e.target.value
        }));
    };

    const submitData = () => {
        if (!formData.title) {
            toast.error('Title is required', { autoClose: 2000 });
            companyModal();
            return;
        }

        setLoading(true);

        const { title, user_id, financialYearstart, financialYearend } = formData;
        const payload = {
            user_id: user_id,
            title: title,
            financialYearstart: financialYearstart,
            financialYearend: financialYearend
        };

        dispatch(addCompany(payload))
            .then(() => {
                setFormData(prevState => ({
                    ...prevState,
                    title: ''
                }));

                dispatch(getUserCompanies({ user_id: user_id }));
                toast.success("Company added successfully!");
                companyModal();
                window.location.reload()
            })
            .catch((error) => {
                toast.error("Error adding company: " + error.message);
            })
            .finally(() => {
                setLoading(false);
              });
    };

    return (
        <Modal
            isOpen={addCompanyModalIsOpen}
            onRequestClose={companyModal}
            style={{ overlay: { zIndex: 9999 }, content: { ...customStyles.content } }}
            contentLabel="Add Company Modal"
        >
            <Box sx={{ padding: "30px" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                    }}
                >
                    <IconButton onClick={companyModal} aria-label="close">
                        <CloseIcon sx={{ color: "#000" }} />
                    </IconButton>
                </Box>

                <Box>
                    <Typography variant="h5"
                        className="text-start mb-3 px-5 mb-4"
                        sx={{ fontWeight: "600", color: "#000" }}>
                        Add Company
                    </Typography>

                    <Box>
                        <div className="d-flex align-items-center justify-content-between mx-5">
                            <div>
                                <label htmlFor="exampleInputEmail1">Title</label>
                            </div>
                            <div className="d-flex">
                                <input type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Title"
                                    name="title"
                                    style={{ minWidth: 300 }}
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end w-100 mt-5">
                            <button className="btn btn-dark rounded-0" onClick={submitData} disabled={loading}>
                                {isLoading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddCompanyModal;

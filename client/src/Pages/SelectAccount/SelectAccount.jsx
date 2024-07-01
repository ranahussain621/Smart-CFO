import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import logoutImg from '../../Assets/logout.png'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, } from "@mui/material";
import Button from '@mui/material/Button';
import { getUserDetail } from "../../Redux/AuthSlice";
import logoutIMG from '../../Assets/Images/Logout.svg'
import Dashboard from '../../Assets/Images/dashboardOne.svg'
import './style.css'
import { getCompanyDetail } from "../../Redux/SenarioPlanningSlice";



const SelectAccount = () => {

  const [visible, setVisible] = useState(false);
  const [isCustomClass, setIsCustomClass] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const openLogout = () => {
    setOpenModal(!openModal);
    open()
  };

  const open = () => {
    setVisible(!visible);
    setIsCustomClass(!isCustomClass);
  };

  var user = JSON.parse(localStorage.getItem("userDetail"));




  var companyData = JSON.parse(localStorage.getItem("company-data"));



 



  const USER = useSelector((state) => state.auth);


 


  const dispatch = useDispatch()

  const navigate = useNavigate()

  // useEffect(() => {
  //   const getData = async () => {
  //      await dispatch( getUserDetail(user?.user?._id) );
  //      companyData?._id?.length > 0 ?  await dispatch(getCompanyDetail(companyData?._id)) :  await dispatch(getCompanyDetail(user?.company_ids[0]?._id))
  //   };
  //   getData();
  // }, []);

 

  const logout = (e) => {
    e.stopPropagation();
    window.localStorage.clear();
    toast.success("Successfully logged out!", {
      position: "top-center",
      autoClose: 1000,
    });
    navigate("/login");
  };

 


  const SwitchCompany = (item, e) => {
    e.preventDefault();
    let userDetail = JSON.parse(localStorage.getItem("userDetail"));
    userDetail.company_ids = [item]; 
    localStorage.setItem('userDetail', JSON.stringify(userDetail));
    window.location.reload();
  }
  
  
  return (

      <div  className="mx-3 rounded" style={{background:'#464692'}}>


        <div className={`py-3 ps-4   ${isCustomClass ? 'custome-css-class' : 'text-white'}`} style={{ display: "flex", alignItems: 'center' }}> 
         <div>
          <img
            style={{ borderRadius: "50%", width: "32px", height: "32px" }}
            src={
              USER?.userData?.data?.image
                ? USER?.userData?.data?.image
                : "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt=""
          />
        </div>  
          <div style={{ textAlign: 'left', padding: '0px 15px' }}>
        {/* {name?.slice(0, 15)} */}
          <p className={` ${isCustomClass ? 'custome-css-class fw-bold' : 'text-white fw-bold'}`} style={{ padding: '0px', margin: '0px', fontSize: '14px', textTransform: 'capitalize', letterSpacing: 0.5 , color: 'white'}}>{user?.user?.firstName}</p>
        </div>
           <div>
          {visible ? (
            <ExpandLessIcon className="" style={{ color: '#fff', stroke: '#fff', strokeWidth: '0.5px', margin: '0 0 0 4rem' ,cursor:'pointer'}} onClick={open} />
          ) : (
            <ExpandMoreIcon className="" style={{ color: '#fff', stroke: '#fff', strokeWidth: '0.5px', margin: '0 0 0 4rem' ,cursor:'pointer'}} onClick={open} />
          )}   
        </div>

        </div>


        <div className="">

        {

user?.Role?.title ==='CFO' && visible ? user?.company_ids?.map((item, index) => {
    return (
     <div key={index} className="ps-4 mx-2 py-3 d-flex align-items-center rounded company-account" onClick={(e)=>SwitchCompany(item,e)}>
      <img src={item.image?.length > 0 ? item.image : Dashboard } style={{ width: 22, height: 22 }} alt="" />
      <span  style={{ padding: '0px 15px', color: '#fff', fontSize: '14px', textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer' }}>{item.title}</span>
     
    </div>  
    )
   
  }
  ) 

:    "" 
 
} 

 
          </div>
      
 
        <div>
          
      {
        visible && (

          <div className="ps-4 py-3 d-flex align-items-center rounded" onClick={openLogout} >
            <img src={logoutIMG} style={{ width: 28, height: 28 }} alt="" /> 
            <span className="" style={{ padding: '0px 15px', color: '#fff', fontSize: '14px', textTransform: 'capitalize', letterSpacing: 1,cursor:'pointer' }} >Logout</span>
          </div>

        )
      }
      </div>
    



      <Dialog
        open={openModal}
        onClose={openLogout}
        className="logout-dialog"
        style={{
          background: 'rgba(38, 38, 87, 0.7)',
        width: '100%',
        }}
      >
        <div style={{
          padding: '30px',
          borderRadius: '30px'
        }}>
        <DialogTitle className="logout-dialog-title fw-bold d-flex justify-content-center main-head" style={{ letterSpacing: 0.9 , font: "poppins",}}>
          Logout Confirmation
        </DialogTitle>
        <div className="logout-dialog-content pb-0 mb-0">
          <div className="fw-bold d-flex mt-4 justify-content-center" style={{ color:'black', fontSize: '24px', letterSpacing: 0.5, fontFamily: 'poppins' }}>
            Are You Sure! You Want To Logout ?
          </div>
        </div>


        <div className="d-flex justify-content-center my-4">
          <Button variant="contained"
            onClick={openLogout}
            className="fw-bold px-4" style={{ display: "flex", padding: '7px 20px', background: '#fff', color: '#152A4F', border: '1px solid #152A4F' }}
          >
            Cancel
          </Button>


          <Button variant=""
            onClick={logout}
            className="btn-custom-btn px-4 text-white ms-5" style={{ display: "flex", padding: '8.5px 20px', background: 'black' }}
          >
            Logout
          </Button>
        </div>
        </div>
      </Dialog>
    </div>





  )
}

export default SelectAccount

import React from 'react'
import thanks from '../../Assets/Images/thankyo.svg'
import { addExternalSourceData } from '../../Redux/SenarioPlanningSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const LoginWithQuickbook = () => {


    var user = JSON.parse(localStorage.getItem("userDetail"));

      const dispatch = useDispatch()
      const navigate = useNavigate()
      

    const handleButtonClick = async () => {

        await dispatch(
          addExternalSourceData({
            user_id: user?.company_ids[0]?.user_id,
            company_id: user?.company_ids[0]?._id,
          })
        ).then((res) => {
          window.open(res?.payload);
          navigate('/login')
        });
 
      };




 
    return (
    
    
          <div className='d-flex justify-content-center' style={{height:'57.9vh'}}>
            <div className="d-flex justify-content-center align-items-center ">
          <button className="btn btn-dark rounded-0 px-5 py-3 cursor-pointer fs-5 fw-bold" style={{letterSpacing:'1.3px'}}  onClick={handleButtonClick}   > Login With Quickbook </button>
        </div> 
        
        
        
      
    
    
        </div>
      );
}

export default LoginWithQuickbook
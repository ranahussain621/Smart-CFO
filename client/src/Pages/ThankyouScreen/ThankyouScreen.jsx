import React, { useEffect, useState } from 'react';
import Thank from '../../Assets/Images/thankyo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { getCfosCompany } from '../../Redux/SenarioPlanningSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const ThankyouScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const [useEffectFinished, setUseEffectFinished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = Math.floor(Date.now() / 1000);
    
      
      localStorage.setItem('quickbookToken', id)
      localStorage.setItem('lastLoginTime', currentTime.toString());

      let userDetail = JSON.parse(localStorage.getItem('userDetail'));
      let userId = userDetail?.user?._id;
  
      try {
        const res = await dispatch(getCfosCompany({ userId: userId }));
        userDetail.company_ids = res?.payload?.company_ids;
        localStorage.setItem('userDetail', JSON.stringify(userDetail));
        navigate('/userdashboard/dashboard');
        setUseEffectFinished(true); 
      } catch (error) {
        toast.error('Error fetching user companies:', error);
      }
    };
    fetchData();
  }, [dispatch, id, navigate]);

  const submit = () => {
    if (useEffectFinished) {
      navigate('/userdashboard/dashboard');
    } else {
      console.log('Waiting for useEffect to finish...');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight:'100vh' ,background:'#000047'}}>
        <div className="" >
          <div className='d-flex justify-content-center'>
             <img src={Thank} alt="123" className='w-100'/> 
          </div>
        
          <div style={{ textAlign: 'center',  }}>
            <button onClick={submit} type="button" className="btn rounded bg-white shadow" style={{padding:'5px 50px'}}>
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankyouScreen;

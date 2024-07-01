import React, { useEffect, useState } from 'react'
import './style.css' 
import { useDispatch, useSelector } from 'react-redux';
// import { getAllPlans } from '../../_redux/features/PaymentSlice';
import { useNavigate,useParams } from 'react-router';
import { getAllSubscriptionPlans } from '../../Redux/subscriptionSlice';
import { getUserDetail } from '../../Redux/AuthSlice';
import line from '../../Assets/Images/line.svg'

const SubscriptionPlans = () => {


 
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem("userDetail"));

    const param = useParams();
    const { id } = param;
 
    
    const [data, setData] = useState();

    
 


    
    useEffect(() => {
        const getData = async () => {
       await dispatch(getUserDetail(id));
      }
      getData()
    }, []);
    
    

   
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await dispatch(getAllSubscriptionPlans());
        const plans = result.payload?.plans || []; 
        setData(plans);
      } catch (error) {
      }
    };
    
    getData();
  }, [dispatch]);
  

const navigate = useNavigate()
  const buyPlan = (id) => {
    navigate('/payment-form',{state:{planId:id}})
  }


  return (
    <>
      <div className="container p-5 mt-5">
        <div className="row">
          <div className="col-md-6 col-sm-12 position-relative">
            <div className="card rounded-0 shadow-lg bg-white">
              <img src={line} alt="" className='mt-5 me-5 pe-5' />
              <span className='fw-bold  mt-5 pt-3 ps-5 position-absolute ' style={{ zIndex: 1,color:'#2457C5' }}>For individual and small products</span>
              <div className="card-body pb-5 mx-4 ps-4">
                <div className="d-flex align-items-center my-3">
                  <p className='fs-1' style={{ color: '#000000' }}>12 Months</p>
                  <button className='btn rounded-pill p-2 mx-3' style={{ color: 'white', background: '#ff7a06' }}>
                    Basic Deal
                  </button>
                </div>
                <div className="div my-3">
                  <p className='' style={{color:'#536174'}}>. VAT and local Taxes may apply</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="doller">
                      <p className='fw-bold' style={{ fontSize: "42px",color: '##000000' }}>$</p>
                    </div>
                    <div className="">
                      <p className=' px-1 fw-bold' style={{ fontSize: "48px" ,color: '##000000'}}>{data ? data[0]?.unit_amount/100 : ''}</p>
                    </div>
                    <div className="d-flex align-items-end mt-3">
                      <p className='m-0 fs-5' style={{ color: '##000000' }}>/month</p>
                    </div>
                  </div>
                  <div>
                    <button className='btn rounded p-2 px-5 mx-3' style={{ color: 'white', background: '#2457C5' }}   onClick={()=>buyPlan(data[0]?.id)}>
                      Subscribe Now!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12 position-relative">
            <div className="card rounded-0 shadow-lg bg-white">
            
              <div className="card-body pb-5 mx-4 ps-4 mt-5">
                <div className="d-flex align-items-center my-3 mt-4 pt-3">
                  <p className='fs-1' style={{ color: '#000000' }}>1 Months</p>
                </div>
                <div className="div my-4">
                  <p className='' style={{color:'#536174'}}>. VAT and local Taxes may apply</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex align-items-center">
                    <div className="doller">
                      <p className='fw-bold' style={{ fontSize: "42px",color: '##000000' }}>$</p>
                    </div>
                    <div className="">
                      <p className=' px-1 fw-bold' style={{ fontSize: "48px" ,color: '##000000'}}>{data ? data[1]?.unit_amount/100 : ''}</p>
                    </div>
                    <div className="d-flex align-items-end mt-3">
                      <p className='m-0 fs-5' style={{ color: '##000000' }}>/month</p>
                    </div>
                  </div>
                  <div>
                    <button className='btn rounded p-2 px-5 mx-3' style={{ color: 'white', background: '#2457C5' }}   onClick={()=>buyPlan(data?.length > 0 ? data[1]?.id : null)}>
                      Subscribe Now!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </>
  )
}

export default SubscriptionPlans

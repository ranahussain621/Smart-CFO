import React, { useEffect, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import './style.css' 
import { useDispatch, useSelector } from 'react-redux';
// import { getAllPlans } from '../../_redux/features/PaymentSlice';
import { useNavigate,useParams } from 'react-router';
import { getAllSubscriptionPlans } from '../../Redux/subscriptionSlice';
import { getUserDetail } from '../../Redux/AuthSlice';


 const starterOPtions = ['Amount','Billing Scheme', 'Interval', 'Live Mode', "Aggregate Usage"]
 const advanceOptions = ['Amount','Billing Scheme', 'Interval','Live Mode', "Aggregate Usage", ' Currency','Interval Count']





const SubScriptionScreen = () => {
    
 
 
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

       //update user subscription id
  // const update = async(id,type)=>{
  //   const formData = new FormData();
    
  //   formData.append("id",user_id);
    
  //   formData.append("subId",id)
  //   formData.append("subPlan",type)
  
  //   await dispatch(UpdateClientProfile(formData))
  // }



    // const buyPlan = async(type)=>{
     


    //     if(SubID){
    // await dispatch(CreateSessionForSubscription({
    // priceId:`${type==='starter'? 'price_1NxlagSJCWz1ZtfgeZn5HK3s':
    // type ==='advanced'? 'price_1NxlcgSJCWz1ZtfgzBo1zDob':
    //  type ==='elite'? 'price_1NxleBSJCWz1ZtfgonJsleii':''}`,
    //             stripeCustomerId : SubID,
               
    //           }))
    //           .then((res)=>{
    //             if(res.payload.success===true){
          
    //          update(SubID,type)
         
    //          window.open(res.payload?.session?.url, '_blank')
    //             }
            
    //            })
    //     return

    //     }else{

    //  await dispatch(CreateUserForSubscription({
    //         email:userEmail,
    //         name:userName
    //       })) 
    //    .then(async(data)=>
      
    //    { 
       
        
      
          
         
    //          await dispatch(CreateSessionForSubscription({
    //              priceId:`${type==='starter'? 'price_1NxlagSJCWz1ZtfgeZn5HK3s':
    //             type ==='advanced'? 'price_1NxlcgSJCWz1ZtfgzBo1zDob':
    //         type ==='elite'? 'price_1NxleBSJCWz1ZtfgonJsleii':''}`,
    //              stripeCustomerId : data.payload.stripeCustomerId,
                
    //            }))
    //            .then((res)=>{
    //             if(res.payload.success===true){

    //                 update(data.payload.stripeCustomerId,type)
            
         
    //          window.open(res.payload?.session?.url, '_blank')
    //             }
            
    //            })
    //           return
          
            
       
          
      
    //    })
    //     }

   
    // }


  


  return (
   <>




  <div className="mx-4 mt-4 mb-5">
 

    <div className="row mt-md-5 d-flex justify-content-center">
        <div className="col-lg-3 col-md-3 col-sm-12">
        <div className="card shadow rounded-4 subscription-card">
            <div className="card-body" style={{padding:'30px 40px'}}>
                <div className="d-flex align-items-center">
               <p className='fs-1' style={{color:'#000000'}}>Starter</p>  
               <button className='btn rounded-pill p-2 mx-3' style={{color:'white',background:'#ff7a06'}}>
                   {user?.user[0]?.subPlan==='starter'? "Current Plan":"Basic Deal"}
                </button>      
                </div>
          
            <p className='my-4' style={{fontSize:'18px',color:"#536174"}}>For Individuals and Small Product </p>
            {/* pricing */}
            <div className="price">
                <div className="d-flex align-items-center">
                    <div className="doller">
                        <p className='fw-bold' style={{fontSize:"42px"}}>$</p>
                    </div>
                    <div className="">
                    <p className=' px-1 fw-bold' style={{fontSize:"48px"}}>{data ? data[0]?.unit_amount/100 : ''}</p>
                    </div>
                    <div className="d-flex align-items-end mt-3">
                    <p className='m-0 fs-5' style={{color:'#98A2B2'}}>Per month</p>
                    </div>
                </div>
            </div>
            {/* plan status */}
            <div className='my-4'>
                <button className='btn  px-4' style={{color:'#98A2B2',background:'#F6F6F6'}}>
                   {user?.user[0]?.subPlan==='starter'? "Current Plan":"Basic Plan"}
                </button>
            </div>
           {/* package options  */}
           <div className='mt-5'>
           <p className='fs-2  my-2 fw-semibold'>Include</p>
           
           <p className='my-3 fs-5' style={{color:'#536174'}}>Everything you get in this plan</p>
           <div className="items-include mt-4">
            {
                 starterOPtions.map((item, i) => {
                    const parts = item.split('(');
                    const textBeforeBracket = parts[0]; 
                    return (
                      <div className="d-flex my-3 align-items-center" key={i}>
                      <div>
                            <DoneIcon style={{ color: '#ff7a06', fontSize: '28px' }} />
                        </div>  
                        <p className='mx-3 fs-5' style={{color:'#536174'}}> {textBeforeBracket}   </p>
                      </div>
                    );
                  })
            }
          
          <div className='mt-md-5 pt-md-4'>
            <div className="pt-md-3">
                <button className='btn btn-lg  w-100 mt-md-4 p-2'
                
                style={{color:'white',background:'#ff7a06'}}
                onClick={()=>buyPlan(data[0]?.id)}
          >
                    Buy Now
                </button>
            </div>
              
            </div>

           </div>
           </div>


            </div>
        </div>
        </div>



     <div className="col-lg-3 col-md-3 col-sm-12 mt-md-0 mt-5">
        <div className="card h-100 shadow rounded-4 subscription-card" style={{background:"#000047"}}>
            <div className="card-body" style={{padding:'30px 40px'}}>
            <div className="d-flex align-items-center">
               <p className='fs-1' style={{color:'#fff'}}>Professional</p>      
                </div>
          
            <p className='my-4' style={{fontSize:'18px',color:"#fff"}}>For Individuals and Average Product </p>
            {/* pricing */}
            <div className="price">
                <div className="d-flex align-items-center text-white">
                    <div className="doller">
                        <p className='fw-bold' style={{fontSize:"42px"}}>$</p>
                    </div>
                    <div className="">
                    <p className=' px-1 fw-bold' style={{fontSize:"48px"}}>{data ? data[1]?.unit_amount/100 : ''}</p>
                    </div>
                    <div className="d-flex align-items-end mt-3">
                    <p className='m-0 fs-5' style={{color:'#fff'}}>Per month</p>
                    </div>
                </div>
            </div>
            {/* plan status */}
            <div className='my-4'>
                <button className='btn  p-2' style={{color:'#fff',background:'#FA8C0B'}}>
                   {user?.user[0]?.subPlan==='starter'? "Current Plan":"Upgrade Plan"}
                </button>
            </div>
           {/* package options  */}
           <div className='mt-5'>
           <p className='fs-3  my-2 fw-semibold text-white'>Include</p>
           
           <p className='my-3 fs-5' style={{color:'#fff'}}>Everything you get in this plan</p>
           <div className="items-include mt-4">
            {
                 advanceOptions.map((item, i) => {
                    // Split the string at the opening and closing parentheses
                    const parts = item.split('(');
                    const textBeforeBracket = parts[0]; // Text before the opening parenthesis
                
                    return (
                        <div className="d-flex my-3 align-items-center" key={i}>
                        <div>
                              <DoneIcon style={{ color: '#ff7a06', fontSize: '28px' }} />
                          </div>  
                          <p className='mx-3 fs-5' style={{color:'#fff'}}> {textBeforeBracket}   </p>
                        </div>
                    );
                  })
            }
          
          <div className='pt-md-3'>
                <button className='btn btn-lg  w-100 p-2' 
                style={{color:'white',background:'#ff7a06'}}
                onClick={()=>buyPlan(data?.length > 0 ? data[1]?.id : null)}
                  
                >
                    Buy Now
                </button>
            </div>

           </div>
           </div>


            </div>
        </div>
        </div>



        <div className="col-lg-3 col-md-3 col-sm-12 mt-md-0 mt-5">
        <div className="card h-100 shadow rounded-4 subscription-card">
        <div className="card-body" style={{padding:'30px 40px'}}>
                <div className="d-flex align-items-center">
               <p className='fs-1' style={{color:'#000000'}}>Business</p>      
                </div>
          
            <p className='my-4' style={{fontSize:'18px',color:"#536174"}}>For Individuals and Large Product </p>
            {/* pricing */}
            <div className="price">
                <div className="d-flex align-items-center">
                    <div className="doller">
                        <p className='fw-bold' style={{fontSize:"42px"}}>$</p>
                    </div>
                    <div className="">
                    <p className=' px-1 fw-bold' style={{fontSize:"48px"}}>{data ? data[2]?.unit_amount/100 : ''}</p>
                    </div>
                    <div className="d-flex align-items-end mt-3">
                    <p className='m-0 fs-5' style={{color:'#98A2B2'}}>Per month</p>
                    </div>
                </div>
            </div>
            {/* plan status */}
            <div className='my-4'>
                <button className='btn  p-2' style={{color:'#fff',background:'#FA8C0B'}}>
                  Contact Us
                </button>
            </div>
           {/* package options  */}
           <div className='mt-5'>
           <p className='fs-2  my-2 fw-semibold'>Include</p>
           
           <p className='my-3 fs-5' style={{color:'#536174'}}>Everything you get in this plan</p>
           <div className="items-include mt-4">
            {
                 starterOPtions.map((item, i) => {
                    const parts = item.split('(');
                    const textBeforeBracket = parts[0]; 
                    return (
                      <div className="d-flex my-3 align-items-center" key={i}>
                      <div>
                            <DoneIcon style={{ color: '#ff7a06', fontSize: '28px' }} />
                        </div>  
                        <p className='mx-3 fs-5' style={{color:'#536174'}}> {textBeforeBracket}   </p>
                      </div>
                    );
                  })
            }
          
          <div className='mt-md-5 pt-md-4'>
            <div className="pt-md-3">
                <button className='btn btn-lg  w-100 mt-md-4 p-2'
                
                style={{color:'white',background:'#ff7a06'}}
                onClick={()=>buyPlan(data?.length > 0 ? data[2]?.id : null)}
          >
                    Buy Now
                </button>
            </div>
              
            </div>

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

export default SubScriptionScreen
// import {axiosPrivate} from './axios.js'

// const setupInterceptor =(store) =>{
// axiosPrivate.interceptors.request.use((config)=>{
//     const token = localStorage.getItem("access-token")
//     const parsedToken = JSON.parse(token)
//    console.log(parsedToken)
//    if(!(config.headers['Authorization'])){
//        config.headers['Authorization'] = `Bearer ${parsedToken}`
//    }
//     return config;
// },(error)=>{
//     return Promise.reject(error)
// })
//       return true
// }

// export default setupInterceptor
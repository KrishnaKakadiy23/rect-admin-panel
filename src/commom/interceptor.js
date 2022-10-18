import axios from "axios";


// Add a request interceptor 
// const apiToken = "";
// if (apiToken) {
//   config.headers = { "x-rapidapi-key": apiToken };
// }
// console.log("Request was sent", config);

const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(async (config) => {
    const userData = await localStorage.getItem('user');
//     config.headers = {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     };

//     if (!userData) {
//       localStorage.clear();
//       window.location = '/login';
//   }
  return config;  
}, (error) => {
    // Do something with request error 
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (res) => {
       // Add configurations here
       if (res.status === 201) {
          console.log('Posted Successfully');
       }
       return res;
    },
    (err) => {
       return Promise.reject(err);
    }
 );

  export default axiosInstance;
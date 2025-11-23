import AppConstants from "@/src/constants/app_constants";
import axios from "axios";


const axiosHttp = axios.create({
    baseURL: AppConstants.api_url,
});



axiosHttp.interceptors.request.use((config) => {
    console.log('inside request intercept');
    
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
    return config;
},(error) => {
    return Promise.reject(error);
})



export default axiosHttp
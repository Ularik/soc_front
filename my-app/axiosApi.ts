import axios from "axios";


const axiosApi = axios.create({
    baseURL: "http://127.0.0.1:8001"
});


export default axiosApi;
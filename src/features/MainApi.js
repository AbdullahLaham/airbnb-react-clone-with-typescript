import axios from "axios";

export const API = axios.create({baseURL: "http://localhost:5000/"});
const user = localStorage.getItem('user');

API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')) {
        req.headers.authorization = `Bearer ${user.token}`
    }
    return req;
});
export default API;
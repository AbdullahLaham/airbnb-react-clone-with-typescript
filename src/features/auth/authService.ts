import toast from "react-hot-toast";
import API from "../MainApi"

const login = async (user: any) => {
    try {
       const res =  await API.post('/user/login', user);
       if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        

       }
       
       return res.data;


    } catch (error) {
        throw new Error("something went wrong");
    }
}

const signUp = async (user: any) => {
    try {

        const res =  await API.post('/user/register', user);

       

       if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
       }

        return res.data;

    } catch (error) {
        throw new Error("something went wrong");            
    }
}

const logout = async () => {
    localStorage.clear();
}

export default {login, signUp, logout}
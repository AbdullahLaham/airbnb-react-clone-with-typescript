import API from "../MainApi"

const login = async (user: any) => {
    try {
       const res =  await API.post('/user/login', user);

       

       if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
       }
       
       return res.data;


    } catch (error) {
        console.log(error);
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
        console.log(error);                
    }
}

const logout = async () => {
    localStorage.clear();
}

export default {login, signUp, logout}
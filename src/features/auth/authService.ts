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
const getWishlist = async () => {
    try {
        const res = await API.get('/user/wishlist');
        if (res?.data) {
            return res?.data;
        }

    } catch (error) {
        throw new Error("something went wrong");
    }
}
const addListingToWishlist = async (listingId: string) => {
    try {
         const res = await API.put(`/user/addtoFavorites/${listingId}`);
         return res?.data;
    } catch(error) {
        throw new Error("something went wrong");
    }
}
const removeListingFromWishlist = async (listingId: string) => {
    try {
        const res = await API.delete(`/user/removefromFavorites/${listingId}`);
        return res?.data;
    } catch (error) {
        throw new Error("something went wrong");
    }
}
const logout = async () => {
    localStorage.clear();
}

export default {login, signUp, logout, addListingToWishlist, removeListingFromWishlist, getWishlist};

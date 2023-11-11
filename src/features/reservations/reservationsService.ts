import { IListingsParams } from "../../types";
import API from "../MainApi"

const getListings = async (params: IListingsParams) => {
    try {

        const res = await API.get('/reservations');
        if (res?.data) {
            localStorage.setItem('reservations', JSON.stringify(res.data));
        }
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const createListing = async (data: any) => {
    try {
        const res =  await API.post('/reservations', {...data});

        if (res.data) {
            localStorage.setItem('reservations', JSON.stringify(res.data));
        }

        return res.data;

    } catch (error) {
        console.log(error);                
    }
}

// const getCurrentListing = async (id: string) => {
//     try {
//         const res = await API.get(`/listings/${id}`);
//         return res?.data;
//     } catch (error) {
//         console.log(error)
//     }
// }

export default { getListings, createListing };
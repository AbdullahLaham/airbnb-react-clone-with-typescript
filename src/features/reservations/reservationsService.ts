import { IListingsParams } from "../../types";
import API from "../MainApi"

const getReservations = async () => {
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

const getTrips = async () => {
    try {
        const res = await API.get('/reservations/trips/');
        if (res?.data) {
            localStorage.setItem('trips', JSON.stringify(res.data));
        }
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const createReservation = async (data: any) => {
    try {
        console.log(data, 'reservation data');
        const res =  await API.post('/reservations', {...data});

        if (res.data) {
            localStorage.setItem('reservations', JSON.stringify(res.data));
        }

        return res.data;

    } catch (error) {
        console.log(error);                
    }
}
export const cancelReservation = async (id: string) => {
    try {
        const res = await API.delete(`/reservations/${id}`);
        return res?.data;

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

export default { getReservations, createReservation, getTrips, cancelReservation };
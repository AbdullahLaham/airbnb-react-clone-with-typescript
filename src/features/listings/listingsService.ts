import { IListingsParams } from "../../types";
import API from "../MainApi"

const getListings = async (params: IListingsParams) => {
    try {

    const {
        userId,
        roomCount, 
        guestCount, 
        bathroomCount, 
        locationValue,
        startDate,
        endDate,
        category,
        } = params;

        let query: string = '';

        if (userId) query += `?userId=${userId}`;

        if (roomCount) {
        query += `&&roomCount=${roomCount}`
        };

        if (bathroomCount) {
        query += `&&bathroomCount=${bathroomCount}`
        };

        if (guestCount) {
            query += `&&guestCount=${guestCount}`
        };

        if (locationValue) {
            query += `&&locationValue=${locationValue}`
        };

        if (startDate) {
            query += `&&startDate=${startDate}`
        };

        if (endDate) {
            query += `&&endDate=${endDate}`
        };

        if (category) {
            query += `&&category=${category}`
        };


       const res =  await API.get(`/listings/all-listings${query}`);

       if (res.data) {
        localStorage.setItem('listings', JSON.stringify(res.data));
       }
       
       return res.data;


    } catch (error) {
        console.log(error);
    }
}

const createListing = async (data: any) => {
    try {
        const res =  await API.post('/listings', {...data})

        if (res.data) {
            localStorage.setItem('listings', JSON.stringify(res.data));
        }

        return res.data;

    } catch (error) {
        console.log(error);                
    }
}

export default { getListings, createListing };
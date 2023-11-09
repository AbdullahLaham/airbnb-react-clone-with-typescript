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
          const query: any = [];

          if (userId) query.userId = userId;
          if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            }
          };
          if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        };
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        };

        


       const res =  await API.post('/listings/all-listings');

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
        const res =  await API.post('/listings/new-listing', {...data})

        if (res.data) {
            localStorage.setItem('listings', JSON.stringify(res.data));
        }

        return res.data;

    } catch (error) {
        console.log(error);                
    }
}

export default { getListings, createListing }
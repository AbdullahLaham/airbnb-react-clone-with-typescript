import API from "../MainApi"

const getListings = async (data: any) => {
    try {
       const res =  await API.post('/listings/all-listings', data);

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
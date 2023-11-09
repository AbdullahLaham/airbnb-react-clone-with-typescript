export type currentUser = {
    
}

export type safeListing =  {
    createdAt: string;
};
    
    
export type safeReservation =  {
    createdAt: string;
    startDate: string,
    endDate: string,
    listing: safeListing,
};
    



export type safeUser =  {
createdAt: Date;
updatedAt: Date;
emailVerified: string | null;

};


export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

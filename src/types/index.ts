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


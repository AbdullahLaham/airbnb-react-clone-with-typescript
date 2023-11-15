import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../features/store'
import { cancelReservation, getReservations } from '../features/reservations/reservationsSlice';
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { useNavigate } from 'react-router-dom';

const Trips = () => {

//   if (userId) {
//     query.userId = userId;
// } 

// if (authorId) {
//     query.listing = {userId: authorId};
// }


  // dispatch
  const dispatch = useAppDispatch();

  // navigate
  const navigate = useNavigate();

  const [deletingId, setDeletingId] = useState("");

  const {reservations} = useSelector((state: any) => state?.reservations);

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    try {
      dispatch(cancelReservation(id));
      navigate(0);
    } catch (error) {
      setDeletingId(id)
    }

  }, [reservations])

  useEffect(() => {
    dispatch(getTrips());
  }, []);

  console.log(reservations, 'reservations');


  return (
    <Container>
      <Heading title='Trips' subtitle='where you have been and where you are going!' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
        {reservations?.map((reservation: any) => {
          return (
            <ListingCard  key={reservation?._id} data={reservation?.listingId} reservation={reservation} actionId={reservation?._id} onAction={onCancel} disabled={deletingId == reservation?._id} actionLabel='Cancel Reservation'   />
          )
        })}
      </div>
    
    </Container>
  )
}

export default Trips

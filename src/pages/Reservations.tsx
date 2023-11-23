import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../features/store'
import { cancelReservation, getReservations } from '../features/reservations/reservationsSlice';
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { useNavigate } from 'react-router-dom';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';

const Reservations = () => {

  // const reservations = await getReservations({ authorId: currentUser.id });



  // dispatch
  const dispatch = useAppDispatch();

  // navigate
  const navigate = useNavigate();

  const [deletingId, setDeletingId] = useState("");

  const {reservations, canceledReservation} = useSelector((state: any) => state?.reservations);
  const {currentUser} = useSelector((state: any) => state?.auth)

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
    dispatch(getReservations());
  }, [canceledReservation]);

  console.log(reservations, 'reservations');
  if (!currentUser) {
    return (

      <ClientOnly>
        <EmptyState  title='No reservations found' subtitle="Looks like you have not reserved any trips !"/>
      </ClientOnly>

    )
  }
  if (!reservations) {
    return (

      <ClientOnly>
        <EmptyState  title='No reservations found' subtitle="Looks like you have not reserved any trips !"/>
      </ClientOnly>

    )
  }

  return (
    <Container>

      <Heading title='Trips' subtitle='where you have been and where you are going!' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
        {reservations?.map((reservation: any) => {
          return (
            <ListingCard key={reservation?._id} data={reservation?.listingId} reservation={reservation} actionId={reservation?._id} onAction={onCancel} disabled={deletingId == reservation?._id} actionLabel='Cancel Reservation'   />
          )
        })}
      </div>
    
    </Container>
  )
}

export default Reservations ;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import Container from '../components/Container'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import { useAppDispatch } from '../features/store';
import { getCurrentListing } from '../features/listings/listingsSlice';
import ListingHead from '../components/listings/ListingHead';
import ListingInfo from '../components/listings/ListingInfo';
import ListingReservation from '../components/listings/ListingReservation';
import useLoginModal from '../hooks/useLoginModal';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { createReservation } from '../features/reservations/reservationsSlice';
import toast from 'react-hot-toast';


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "select", 
}
const ListingDetails = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const loginModal = useLoginModal();
  const navigate = useNavigate();

  const { currentListing } = useSelector((state: any) => state?.listings);
  const { reservations } = useSelector((state: any) => state?.reservations)
  const { currentUser } = useSelector((state: any) => state?.auth);
  
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations?.forEach((reservation: any) => {
      if (reservation?.startDate && reservation?.endDate) {
        const range = eachDayOfInterval({
          start: new Date(reservation?.startDate),
          end: new Date(reservation?.endDate)
        });

        dates = [...dates, ...range];
        return dates;
        
      }
    })
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, settotalPrice] = useState(currentListing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);
    try {
      dispatch(createReservation({totalPrice, startDate: dateRange?.startDate, endDate: dateRange?.endDate, listingId: currentListing?._id, userId: currentUser?._id}));
      setIsLoading(false);
      navigate('/trips');
      setDateRange(initialDateRange);
      navigate(0);
    }  catch(error) {
      toast.error("something went wrong");
    } 
  }, [totalPrice, dateRange, currentListing?._id, currentUser, navigate, loginModal])
  
  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const dayCount = differenceInCalendarDays(dateRange?.endDate, dateRange?.startDate);
      if (dayCount && currentListing?.price) {
        settotalPrice(dayCount * currentListing?.price);
      } else {
        settotalPrice(currentListing?.price);
      }
    }
  }, [dateRange, currentListing, totalPrice]);
  useEffect(() => {
    if (id) {
      dispatch(getCurrentListing(id));
    }
  }, [currentListing?._id]);

  if (!currentListing?._id) {
    return (
        <EmptyState title={'No Details about this listing'} />
    )
  }

  return (

    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          {currentListing?.category}
          <ListingHead title={currentListing?.title} imageSrc={currentListing?.imageSrc} locationValue={currentListing?.locationValue} id={currentListing?._id}  />
          <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 md:gap-10 mt-6'>
            <ListingInfo user={currentListing?.userId} category={currentListing?.category} description={currentListing?.description} roomCount={currentListing?.roomCount} guestCount={currentListing?.guestCount} bathroomCount={currentListing?.bathroomCount} locationValue={currentListing?.locationValue}   />
          </div>
          <div className='order-first mb-10 md:order-last md:col-span-3 '>
            <ListingReservation price={currentListing?.price} totalPrice={totalPrice} onChangeDate={(value: any) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
          </div>
        </div>
      </div>
    </Container>



  )
}

export default ListingDetails; 

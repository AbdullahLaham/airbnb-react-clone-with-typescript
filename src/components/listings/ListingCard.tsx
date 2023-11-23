'use client'


import useCountries from '../../hooks/useCountries';
import React, { useCallback, useMemo } from 'react'
import {format} from 'date-fns'
import useAuthStore from '../../hooks/useAuthStore';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { safeListing, safeReservation, safeUser } from '../../types';
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import useFavorite from '../../hooks/useFavorite';
interface ListingCardProps {
    data: any, // safeListing, 
    reservation?: any, // safeReservation,
    onAction?: (id: string) => void,
    disabled?: boolean,
    actionLabel?: string,
    actionId?: string,
    currentUser?: any,
}

const ListingCard: React.FC<ListingCardProps> = ({data, reservation, onAction, disabled, actionLabel, actionId = "",}) => {
  const navigate = useNavigate();
  const {getByValue} = useCountries();
  const location = getByValue(data?.locationValue);
  const {currentUser} = useSelector((state: any) => state?.auth);
  console.log(data, 'location');

  const {hasFavorited} = useFavorite({listingId: data?._id});
  console.log(hasFavorited, data?._id, 'hasFavorited');
  
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) {
      return ;
    }
    onAction?.(actionId);
  }, [onAction, actionId, disabled]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation?.totalPrice;
    }
    return data?.price;

  }, [reservation, data.price]);

  
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);


    return `${format(start, 'pp')} - ${format(end, 'pp')}`;


  }, [reservation?.endDate, reservation?.startDate, reservation]);

  return (
    <div onClick={() => navigate(`/listings/${data?._id}`)} className='col-span-1 cursor-pointer group'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='aspect-square w-full relative overflow-hidden rounded-xl '>
            <img src={data?.imageSrc} alt='listing' className=' object-cover h-full w-full group-hover:scale-110 transition'  />
            <div className='absolute top-3 right-3'>
              <HeartButton listingId={data?._id} currentUser={currentUser} hasFavorited={hasFavorited} />
            </div>
          </div>
          <div className='font-semibold text-lg '>
            {data?.locationValue?.region}, {data?.locationValue?.label}
          </div>
          <div className='font-light text-neutral-500 '>
            {reservationDate || data?.category}
          </div>
          <div className='flex flex-row items-center gap-1'>
            $ {price}
            {!reservation && (
              <div className='font-light'>night</div>
            )}
            

          </div>
            {actionLabel && (
              <Button onClick={handleCancel} label={actionLabel} small  />
            )}

        </div>
    </div>
  )
}

export default ListingCard
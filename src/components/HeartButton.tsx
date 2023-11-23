import React from 'react'
import useAuthStore from '../hooks/useAuthStore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';
import { safeUser } from '../types';


interface HeartButtonProps {
  listingId: string,
  currentUser?: any,
  hasFavorited?: Boolean,
}



const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser, hasFavorited }) => {

  
  const {toggleFavorite} = useFavorite({ listingId });
  console.log(hasFavorited, 'urrentUser?.favoriteIds?.includes(listingId)')

  return (
    <div className='relative hover:opacity-80 transition cursor-pointer ' onClick={toggleFavorite}>
        <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px] '  />
        <AiFillHeart size={24} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
    </div>
  )
}

export default HeartButton
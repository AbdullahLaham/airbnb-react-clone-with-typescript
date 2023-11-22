import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../features/store';
import { getWishlist } from '../features/auth/authSlice';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';
import Container from '../components/Container';

const Properties = () => {
  const {wishlist, currentUser} = useSelector((state: any) => state?.auth);
  console.log(wishlist,' wish')
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWishlist());
  }, [currentUser?._id]);

  return (
    <Container>
      <Heading title='Wishlist' subtitle='Your favorite listings' />
      <div className='grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-3'>
        {
          wishlist?.map((listing: any) => {
            return <ListingCard data={listing}   />
          })
        }
      </div>
    </Container>
  )
}

export default Properties;

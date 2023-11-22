import React, { useEffect } from 'react'
import { useAppDispatch } from '../features/store'
import { getListings } from '../features/listings/listingsSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import ListingCard from '../components/listings/ListingCard';
import useFavorite from '../hooks/useFavorite';

const Home = () => {

  const dispatch = useAppDispatch();

  const {currentUser} = useSelector((state: any) => state?.auth);
  const {listings} = useSelector((state: any) => state?.listings);
  const [searchParams, setSearchParams] = useSearchParams();

 
  

  // searchParams.append({title: 'hello'})

  // const url = qs.stringifyUrl({
  //   url: '/',
  //   query: searchQuery

  // }, {skipNull: true});

  
  useEffect(() => {
    const searchQuery = qs.parse(searchParams.toString());
    console.log(searchQuery, 'current URL');
    dispatch(getListings({...searchQuery,  userId: currentUser?._id},));
  }, [searchParams]);

  


  

  
  return (
    <div className='w-[100%] mx-auto  xl:px-20 md:px-10 sm:px-2 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
      {
        listings?.map((listing: any) => {
          return (
            <ListingCard key={listing?._id} data={listing} currentUser={currentUser} />
          )
        })
      }
    </div>
  )
}

export default Home ;

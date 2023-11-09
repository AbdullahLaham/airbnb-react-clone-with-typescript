import React, { useEffect } from 'react'
import { useAppDispatch } from '../features/store'
import { getListings } from '../features/listings/listingsSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import qs from 'query-string';

const Home = () => {

  const dispatch = useAppDispatch();
  const {currentUser} = useSelector((state: any) => state?.auth);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = qs.parse(searchParams.toString());

  // searchParams.append({title: 'hello'})

  const url = qs.stringifyUrl({
    url: '/',
    query: searchQuery

  }, {skipNull: true});

  useEffect(() => {
    dispatch(getListings(currentUser?._id));
  }, []);

  
  return (
    <div>
      
    </div>
  )
}

export default Home ;

import React, { useEffect } from 'react'
import Container from '../components/Container'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import { useAppDispatch } from '../features/store';

const ListingDetails = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const { currentListing } = useSelector((state: any) => state?.listings);
  useEffect(() => {
    dispatch(get)
  }, [currentListing?._id])
  if (!currentListing?._id) {
    return (
        <EmptyState title={'No Details about this listing'} />
    )
  }
  return (
    <Container>
      {id}
    </Container>
  )
}

export default ListingDetails

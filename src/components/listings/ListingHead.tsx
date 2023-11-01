
import useAuthStore from '../../hooks/useAuthStore';
import useCountries from '../../hooks/useCountries';
import React from 'react'
import Heading from '../Heading';
import HeartButton from '../HeartButton';
// import getCurrentUser from '@/app/actions/getCurrentUser';
interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;

}

const ListingHead: React.FC<ListingHeadProps> = ({title, locationValue, imageSrc, id}) => {
  // const currentUser = await getCurrentUser();
  const {getByValue} = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
        <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
        <div className='w-full h-[60vh] overflow-hidden rounded-xl relative '>
          <img src={imageSrc} alt='image'  className='w-full h-full object-cover ' />
          <div className='absolute top-5 right-5'>
            <HeartButton listingId={id} />
          </div>
        </div>
    </>
  )
}

export default ListingHead
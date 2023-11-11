import useCountries from '../../hooks/useCountries';
import React from 'react'
import { IconType } from 'react-icons';
import ListingCategory from './ListingCategory';
import Map from '../Map';
import { categories } from '../navbar/Categories';

interface ListingInfoProps {
    user: any, // safeUser,
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: string;
    locationValue: string;
  }
  
  const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
  }) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;
    const listingCategory = categories?.find((categ) => categ?.label == category);
    
  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>

            <div className='text-xl flex flex-row font-semibold items-center gap-2 '>
                <div className=''>Hosted By <span className='font-bold'>{user?.name}</span></div>
            </div>  
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500 '>
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory icon={listingCategory?.icon} label={category}  />
        )}
        <hr />
        <div className='text-lg font-light text-neutral-500 '>
            {description}

        </div>
        <hr />
        <Map center={coordinates} />    
    </div>


  )
}

export default ListingInfo
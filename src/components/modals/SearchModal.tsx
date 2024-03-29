
import useSearchModal from '../../hooks/useSearchModal'
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal';
import {  useSearchParams } from 'react-router-dom';
import { Range } from 'react-date-range';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import Map from '../Map';
import { useNavigate } from 'react-router-dom';


enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
    const searchModal = useSearchModal();
    
    const [searchParams, setSearchParams] = useSearchParams();

    const params: any = [];
  
    searchParams.forEach((value, key) => {
      params.push({[key]: value});
    });

    const navigate = useNavigate();
    const [location, setLocation]: any = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });


  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, [])

  const onNext = useCallback(() => {
      setStep((value) => value + 1);
  }, [])

  const onSubmit = useCallback((async() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (searchParams) currentQuery = qs.parse(searchParams.toString());

    console.log(searchParams, 'currentQuery');
    
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }
    console.log(updatedQuery, 'ttttt')

    if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate);

    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery

    }, {skipNull: true})

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    navigate(url);

  }), [step, searchModal, location, navigate, guestCount, roomCount, bathroomCount, dateRange, onNext]);
  

  const actionLabel = useMemo(() => {
    if (step !== STEPS.INFO) {
      return 'Next'
    }
    return 'Search';
  }, [step])

  
  const secondaryAtionLabel = useMemo(() => {
    if (step !== STEPS.LOCATION) {
      return 'Back'
    }
    return undefined;
  }, [step])
  
  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='were do you wanna go!' subtitle='find the perfect location!' />
      <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)}  />
      <Map center={location?.latlng} />
    </div>
  );


  if (step == STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='when do you plan to go!' subtitle='Make sure anyone is free !' />
        <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </div>
    )
  };


  if (step == STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More Information' subtitle='Find your perfect place !' />
        <Counter title='Guests' subtitle='How many are comming ? ' onChange={(value) => setGuestCount(value)} value={guestCount} />
        <Counter title='Rooms' subtitle='How many rooms do you need ? ' onChange={(value) => setRoomCount(value)} value={roomCount} />
        <Counter title='Bathrooms' subtitle='How many bathrooms do you need ? ' onChange={(value) => setBathroomCount(value)} value={bathroomCount} />
      </div>
    )
  };


  return (
    <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} title='Filters' body={bodyContent} secondaryActionLabel={secondaryAtionLabel} secondaryAction={step === STEPS.LOCATION ? undefined : onBack} actionLabel={actionLabel} />
        
  )
}

export default SearchModal
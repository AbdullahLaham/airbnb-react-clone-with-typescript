
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '../../hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryBox from '../navbar/CategoryBox';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValue, FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import Map from '../Map';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/store';
import {createListing} from '../../features/listings/listingsSlice';
import { useSelector } from 'react-redux';
import useLoginModal from '../../hooks/useLoginModal';
interface RentModalProps {
    currentUser: any,
}
const RentModal = () => {
    const rentModal = useRentModal();
    const loginModal = useLoginModal();
    const navigate = useNavigate();
    const {currentUser} = useSelector((state: any) => state?.auth)

    const { images } = useSelector((state: any) => state?.uploads);

    // dispatch
    const dispatch = useAppDispatch();

    // const handleSubmit = useCallback(() => {

    // }, []);
    enum STEPS {
        CATEGORY = 0,
        LOCATION = 1,
        INFO = 2,
        IMAGES = 3,
        DESCRIPTION = 4,
        PRICE = 5,

    }
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [selected, setSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const {register, handleSubmit, setValue, watch, formState: { errors }, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',

        }
    });
    
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const bathroomCount = watch('bathroomCount');
    const roomCount = watch('roomCount')
    const imageSrc = watch('imageSrc');


    useEffect(() => {
        setValue('imageSrc', images?.length && images[0]['url']);
      }, [images]);


    //   useEffect(() => {
    //     if (!currentUser) {
    //         rentModal.onClose();
    //         loginModal.onOpen();
    //     }
    //   }, [])


    const setCustomValue = (id: string, value: any) => {

        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
        });

    }

    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        } else {
            try {
                if (category && location && location && guestCount && roomCount && bathroomCount && imageSrc && currentUser?._id) {
                    console.log(data, 'tt')
                    setIsLoading(true);
                    dispatch(createListing({...data, userId: currentUser?._id}));
                    reset();
                    setStep(STEPS.CATEGORY);
                    toast.success('Listing created!');
                    setIsLoading(false);
                    navigate(0);
                } else {
                    toast.error("Please Fill all the required data");
                }
                
            } catch (error) {
                setIsLoading(false);
                toast.error('Something went wrong.');
            }
        }
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step]);


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        } 
        return 'Back'
    }, [step]);

    
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading title='witch of these describes your place?' subtitle='Pick a Category' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto '>
                { categories?.map(({label, icon}) => {
                    return (
                        <div className='col-span-1'>
                            <CategoryInput label={label} icon={icon} selected={category === label ? true : false} onClick={(category) => setCustomValue('category', category)}  />
                        </div>
                    )
                }) }
            </div>
        </div>
    )
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='where is your place located ?' subtitle='Help guests find you!' />
                <CountrySelect onChange={(value) => {setCustomValue('location', value)}} value={location} />
                <Map center={location?.latlng} />
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='share some basics about your place ?' subtitle='what amenties do yoy have!' />
                <Counter title='Guests' subtitle='How many guests ? ' onChange={(value) => setCustomValue('guestCount', value)} value={guestCount} />
                <Counter title='Rooms' subtitle='How many rooms do you have ? ' onChange={(value) => setCustomValue('roomCount', value)} value={roomCount} />
                <Counter title='Bathrooms' subtitle='How many bathrooms do you have ? ' onChange={(value) => setCustomValue('bathroomCount', value)} value={bathroomCount} />
            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Add a photo of your place' subtitle='show guests what your place looks like!' />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
            </div>
        )
    }


    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='How you want to describe your place ! ' subtitle='short and sweet works best' />
                <Input id='title' label='Title' disabled={isLoading} register={register} errors={errors} required />
                <hr />
                <Input id='description' label='Description' disabled={isLoading} register={register} errors={errors} required />
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Now, Set your Price! ' subtitle='how much do you charge per night ?' />
                <Input id='price' label='Price' type='number' formatPrice disabled={isLoading} register={register} errors={errors} required />
            </div>
        )
    }

  return (
    <Modal 
        title='Airbnb your home!'
        onClose={rentModal.onClose}
        isOpen={rentModal.isOpen}
        onSubmit={handleSubmit(onSubmit)}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS?.CATEGORY ? undefined : onBack}
        actionLabel={actionLabel}
        body={bodyContent}


    />
  )
}

export default RentModal
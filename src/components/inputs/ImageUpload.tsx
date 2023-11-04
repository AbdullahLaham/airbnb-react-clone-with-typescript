'use client'

import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone';
import { TbPhotoPlus } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../features/upload/uploadSlice';
import { useAppDispatch } from '../../features/store';
import { useSelector } from 'react-redux';


declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void,
    value: string,
}


const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result?.info?.secure_url);
    }, [onChange]);

    const dispatch = useAppDispatch();

    let {images} = useSelector((state: any) => state?.uploads);



  return (
    // <CldUploadWidget onUpload={handleUpload} uploadPreset='vf8pusrs' options={{ maxFiles: 1 }} >
    //     {({open}) => {
    //         return (
    //             <div onClick={() => open?.()} className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 '>  

    //                 <TbPhotoPlus size={50}  />
    //                 <div className='font-semibold text-lg'>
    //                     Click to upload

    //                 </div>
    //                 {value && (
    //                     <div className='absolute inset-0 w-full h-full '>
    //                         <img alt='upload' src={value} style={{objectFit: 'cover'}} className='w-[100%] h-[100%]' />
    //                     </div>
    //                 )}
    //             </div>
    //         )
    //     }}
    // </CldUploadWidget>

<Dropzone onDrop={(acceptedFiles: any) => {dispatch(uploadImage(acceptedFiles)); onChange(acceptedFiles)}}>
{({getRootProps, getInputProps}: {getRootProps: any, getInputProps: any}) => (
  <section>
    
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 '>  

        <TbPhotoPlus size={50}  />
        <div className='font-semibold text-lg'>
            Click to upload

        </div>
        {value && (
            <div className='absolute inset-0 w-full h-full '>
                <img alt='upload' src={value} style={{objectFit: 'cover'}} className='w-[100%] h-[100%]' />
            </div>
        )}
    </div>
      <p className='font-semibold text-gray-500 mt-3'>Drag 'n' drop some files here, or click to select files</p>
    </div>

    
  </section>
)}
</Dropzone>
  )
}

export default ImageUpload;

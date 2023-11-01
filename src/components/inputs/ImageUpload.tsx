'use client'

import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone';
import { TbPhotoPlus } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

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

    const dispatch = useDispatch();
    const uploadImage = (files: any) => {    
        console.log(files)
    }

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

<Dropzone onDrop={(acceptedFiles: any) => {uploadImage(acceptedFiles); onChange(acceptedFiles)}}>
{({getRootProps, getInputProps}: {getRootProps: any, getInputProps: any}) => (
  <section>
    
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>

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
  </section>
)}
</Dropzone>
  )
}

export default ImageUpload;

'use client'
import React, {useState, useEffect, useCallback} from 'react'
import {IoMdClose} from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title: string,
    body: React.ReactElement,
    footer?: React.ReactElement,
    actionLabel: string,
    disabled?: boolean,
    secondaryAction?: () => void,
    secondaryActionLabel?: string,
}
const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    title, 
    body, 
    actionLabel, 
    footer, 
    disabled,
    secondaryAction,
    secondaryActionLabel
  }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(isOpen)
        console.log(isOpen, 'tttt')
    }, [isOpen]);

    const handleClose = useCallback(() => {
      if (disabled) {
        return;
      }
    
      setShowModal(false);
      setTimeout(() => {
        onClose();
      }, 300)
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
      if (disabled) {
       return
      }   
      onSubmit();


 },[disabled, onSubmit]);


 const handleSecondaryAction = useCallback(() => {
  if (disabled || !secondaryAction) {
   return
  }   
  secondaryAction();


},[disabled, secondaryAction]);


if (!isOpen) {
  return null;
}

  return (
    <div className='flex items-center justify-center overflow-x-hidden fixed inset-0 z-50 outline-none bg-neutral-800/70 '>
      <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto  lg:h-[90%] md:h-auto'>
        {/* content */}
        <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
          <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none'>
             {/*header*/}
             <div className="
                flex 
                items-center 
                w-full
                rounded-t
                justify-center
                relative pt-2
                "
              >
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              
              {/*footer*/}

              <div className='flex flex-col gap-2 p-6'>
                <div className='flex flex-row items-center gap-4 w-full '>
                  {secondaryAction && secondaryActionLabel && <Button outline disabled={disabled} onClick={handleSecondaryAction} label={secondaryActionLabel} />}
                  <Button disabled={disabled} onClick={handleSubmit} label={actionLabel}  />

                </div>
                {footer}

              </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
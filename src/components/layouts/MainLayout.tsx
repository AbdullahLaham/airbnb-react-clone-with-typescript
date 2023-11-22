import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import RentModal from '../modals/RentModal';
import SearchModal from '../modals/SearchModal';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import useRentModal from '../../hooks/useRentModal';

const MainLayout = ({children}: {children: React.ReactNode}) => {
  const {currentUser} = useSelector((state: any) => state?.auth);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  useEffect(() => {
    if (currentUser?.email) {
      registerModal.onClose();
      loginModal.onClose();
    }
    if (!currentUser?.email) {
      rentModal.onClose();
    }
  }, [currentUser]);
  return (
    <div>

      <Navbar />
      <LoginModal />
      <RegisterModal />
      <RentModal  />
      <SearchModal />
      <Toaster />
      <div className='pt-[12rem]'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout;

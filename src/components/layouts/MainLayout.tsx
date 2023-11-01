import React from 'react'
import Navbar from '../navbar/Navbar';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import RentModal from '../modals/RentModal';
import SearchModal from '../modals/SearchModal';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({children}: {children: React.ReactNode}) => {
  const {currentUser} = useSelector((state: any) => state?.auth);

  return (
    <div>

      <Navbar currentUser={currentUser} />
      <LoginModal />
      <RegisterModal />
      <RentModal currentUser={currentUser} />
      <SearchModal />
      <Toaster />
      {children}

    </div>
  )
}

export default MainLayout;

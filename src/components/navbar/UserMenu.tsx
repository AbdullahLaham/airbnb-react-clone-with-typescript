'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import {useState, useCallback, useEffect} from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '../../hooks/useRegisterModal'
import RegisterModal from '../modals/RegisterModal'
import useLoginModal from '../../hooks/useLoginModal'
import useAuthStore from '../../hooks/useAuthStore'
import useRentModal from '../../hooks/useRentModal'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../features/auth/authSlice'
import { useAppDispatch } from '../../features/store'


interface UserMenuProps {
  currentUser?: any
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const [isOpen, setIsOpen] = useState(false);  
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  // dispatch
  const dispatch = useAppDispatch();
  
  const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    },[]
  )
  const onRent = useCallback(() => {
    if (!currentUser?.email) {
      return rentModal.onOpen();
    }

    return rentModal.onOpen();
    
  }, [currentUser, loginModal, rentModal]);
  useEffect(() => {
    console?.log(registerModal?.isOpen);
  }, [registerModal?.isOpen]);

  const navigate = useNavigate()

  // current user
  
  
  return (
    <div className='relative '>
        <div className='flex flex-row items-center gap-3 '>
            <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                Airbnb your home

            </div>
            <div 
                onClick={toggleOpen}
                className="
                select-none
                p-4
                md:py-1
                md:px-2
                border-[1px] 
                border-neutral-200 
                flex 
                flex-row 
                items-center 
                gap-3 
                rounded-full 
                cursor-pointer 
                hover:shadow-md 
                transition
                "
                >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src='/images/'
                     />
                </div>
                </div>

        </div>
        {isOpen && (
        <div 
          className="
            absolute 
            bg-white
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-red 
            overflow-hidden 
            right-0 
            top-[4rem]
            text-sm
            min-h-[100vh]
          "
        >
            
          <div className="flex flex-col cursor-pointer">
            {currentUser?.email ? (
              <>
                <MenuItem 
                  label="My trips" 
                  onClick={() => navigate('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => navigate('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => navigate('/reservations')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => navigate('/properties')}
                />
                <MenuItem 
                  label="Airbnb your home" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => dispatch(logout())}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
            {/* // <div>
            // <>
            //    <MenuItem 
            //      label="Login" 
            //      onClick={loginModal.onOpen}
            //    />
            //    <MenuItem 
            //      label="Sign up" 
            //      onClick={registerModal.onOpen}
            //    />
            //  </>
            // </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
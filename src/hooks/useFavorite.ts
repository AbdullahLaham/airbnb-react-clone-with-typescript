import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { safeUser } from "../types";

import useLoginModal from "./useLoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../features/store";
import { addListingToWishlist, deleteListingFromWishlist } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

interface IUseFavorite {
  listingId: string;
}

const useFavorite = ({ listingId }: IUseFavorite) => {

  const location = useLocation();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state: any) => state?.auth)
  const loginModal = useLoginModal();
  const dispatch = useAppDispatch();


  const hasFavorited = useMemo(() => {
    const favoriteIds = currentUser?.favoriteIds || [];
    return favoriteIds.includes(String(listingId));
  }, [currentUser, listingId]);

  

  const toggleFavorite = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser?.email) {
      return loginModal.onOpen();
    }
    try {
      if (!hasFavorited) {
        dispatch(addListingToWishlist(listingId));
      }
      else {
        dispatch(deleteListingFromWishlist(listingId))
      }

    } catch(error) {
      toast.error('Something went wrong.');
    }
  }, [currentUser, hasFavorited, loginModal, listingId, location])

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
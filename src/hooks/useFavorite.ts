import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { safeUser } from "../types";

import useLoginModal from "./useLoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../features/store";
import { addListingToWishlist, deleteListingFromWishlist } from "../features/auth/authSlice";

interface IUseFavorite {
  listingId: string;
  currentUser?: any, //safeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {

  const location = useLocation();
  const navigate = useNavigate();

  const loginModal = useLoginModal();
  const dispatch = useAppDispatch();
  const hasFavorited = useMemo(() => {
    const favoriteIds = currentUser?.favoriteIds || [];
    
    if (favoriteIds?.length) {
      return favoriteIds.includes(listingId);
    }
  }, [currentUser, listingId]);

  

  const toggleFavorite = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      if (hasFavorited) {
        dispatch(addListingToWishlist(listingId));
      }
      else {
        dispatch(deleteListingFromWishlist(listingId))
      }
      toast.success('Wishlist Updated Successfully');

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
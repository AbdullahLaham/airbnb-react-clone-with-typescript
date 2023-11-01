import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { safeUser } from "../types";

import useLoginModal from "./useLoginModal";
import { useLocation, useNavigate } from "react-router-dom";

interface IUseFavorite {
  listingId: string;
  currentUser?: any, //safeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {

  const location = useLocation();
  const navigate = useNavigate();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      navigate(0);
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    location
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
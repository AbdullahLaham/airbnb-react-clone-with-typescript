import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';
import listingReducer from './listings/listingsSlice';
import uploadReducer from './upload/uploadSlice'
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    uploads: uploadReducer,


  },
});

// export type RootState = ReturnType<typeof rootReducer>

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
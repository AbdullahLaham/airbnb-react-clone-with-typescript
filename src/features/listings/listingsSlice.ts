import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import listingsService from './listingsService';
import { IListingsParams } from '../../types';

type stateType = {
    listings: any,
    currentListing: any,
    isError: Boolean,
    isLoading: Boolean,
    isSuccess: Boolean,
    message: String,
}

const initialState: stateType = {
  listings: [],
  currentListing: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const createListing = createAsyncThunk('listings/create-listing', async (user: any, thunkAPI) => {
  try {

      return await listingsService.createListing(user);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

});


export const getListings = createAsyncThunk('listings/all-listings', async (params: IListingsParams, thunkAPI) => {
  try {
      console.log('hello');

      return await listingsService.getListings(params);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

})


export const getCurrentListing = createAsyncThunk('listings/current-listing', async (id: string, thunkAPI) => {
  try {
      console.log('hello');

      return await listingsService.getCurrentListing(id);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

})

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
     builder

    .addCase(getListings.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(getListings.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.listings = action?.payload;
    })

    .addCase(getListings.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.listings = null;
        // state.message = action.error;
    })




    .addCase(createListing.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(createListing.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentListing = action?.payload;
    })

    .addCase(createListing.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentListing = null;
        // state.message = action.error;
    })




    .addCase(getCurrentListing.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(getCurrentListing.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentListing = action?.payload;
    })

    .addCase(getCurrentListing.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentListing = null;
        // state.message = action.error;
    })

  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default listingsSlice.reducer;

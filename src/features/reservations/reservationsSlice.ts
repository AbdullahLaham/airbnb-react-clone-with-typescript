import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import listingsService from './reservationsService';
import { IListingsParams } from '../../types';


type stateType = {
    reservations: any,
    currentReservation: any,
    isError: Boolean,
    isLoading: Boolean,
    isSuccess: Boolean,
    message: String,
}


const initialState: stateType = {
  reservations: [],
  currentReservation: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const createReservation = createAsyncThunk('listings/create-listing', async (user: any, thunkAPI) => {
  try {

      return await listingsService.createListing(user);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

});


export const getReservations = createAsyncThunk('listings/all-listings', async (params: IListingsParams, thunkAPI) => {
  try {
      console.log('hello');

      return await listingsService.getListings(params);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

})




// export const getCurrentListing = createAsyncThunk('listings/current-listing', async (id: string, thunkAPI) => {
//   try {
//       console.log('hello');

//       return await listingsService.getCurrentListing(id);
      
//   } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//   }

// })


export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
     builder

    .addCase(getReservations.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(getReservations.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.reservations = action?.payload;
    })

    .addCase(getReservations.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.reservations = null;
        // state.message = action.error;
    })




    .addCase(createReservation.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(createReservation.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentReservation = action?.payload;
    })

    .addCase(createReservation.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentReservation = null;
        // state.message = action.error;
    })




    // .addCase(getCurrentListing.pending,(state) => {state.isLoading = true }  )
    
    
    // .addCase(getCurrentListing.fulfilled,(state, action: PayloadAction<any>) => {
    //     state.isLoading = false ;
    //     state.isError = false ;
    //     state.isSuccess = true;
    //     state.currentListing = action?.payload;
    // })

    // .addCase(getCurrentListing.rejected,(state, action: PayloadAction<any>) => {
    //     state.isLoading = false ;
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.currentListing = null;
    //     // state.message = action.error;
    // })

  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default reservationsSlice.reducer;

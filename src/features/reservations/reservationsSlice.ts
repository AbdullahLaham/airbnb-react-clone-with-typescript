import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IListingsParams } from '../../types';
import reservationsService from './reservationsService';


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

export const createReservation = createAsyncThunk('listings/create-listing', async (data: any, thunkAPI) => {
  try {
    
      return await reservationsService.createReservation(data);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

});



export const getReservations = createAsyncThunk('listings/all-listings', async (thunkAPI) => {
  try {
      console.log('hello');

      return await reservationsService.getReservations();   
  } catch (error) {
      console.log(error);
  }
})


export const cancelReservation = createAsyncThunk('listings/all-listings', async (id: string, thunkAPI) => {
  try {
      console.log('hello');

      return await reservationsService.cancelReservation(id);   
  } catch (error) {
      console.log(error);
  }
})




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


  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default reservationsSlice.reducer;

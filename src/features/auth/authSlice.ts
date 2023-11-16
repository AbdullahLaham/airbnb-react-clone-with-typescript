import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService';
import toast from 'react-hot-toast';

type stateType = {
    currentUser: any,
    listingAddedToWishlist: any,
    listingDeletedFromWishlist: any,
    isError: Boolean,
    isLoading: Boolean,
    isSuccess: Boolean,
    message: String,
}

const initialState: stateType = {
  currentUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '') : {},
  listingAddedToWishlist: {},
  listingDeletedFromWishlist: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const login = createAsyncThunk('auth/login', async (user: any, thunkAPI) => {
  try {
      return await authService.login(user);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

});


export const signUp = createAsyncThunk('auth/register', async (user: any, thunkAPI) => {
  try {

      return await authService.signUp(user);
      
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }

})

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {

      return await authService.logout();
      
  } catch (error) {
      
  }

})
export const addListingToWishlist = createAsyncThunk('auth/addListingToWishlist', async (listingId: string, thunkAPI) => {
    try {
        return await authService.addListingToWishlist(listingId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteListingFromWishlist = createAsyncThunk('auth/removeListingFromWishlist', async (listingId: string, thunkAPI) => {
    try {
        return await authService.removeListingFromWishlist(listingId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
     builder

    .addCase(login.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(login.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentUser = action?.payload;
        if (state?.isSuccess) {
            toast.success("user entered successfully");
        }
    })

    .addCase(login.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentUser = null;
        if (state?.isError) {
            toast.error("something went wrong");
        }
        // state.message = action.error;
    })




    .addCase(signUp.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(signUp.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentUser = action?.payload;
        if (state?.isSuccess) {
            toast.success("user created successfully");
        }
    })

    .addCase(signUp.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentUser = null;
        if (state?.isError) {
            toast.error("something went wrong");
        }
        // state.message = action.error;
    })


    .addCase(logout.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(logout.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentUser = null;
    })

    .addCase(logout.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentUser = null;
        // state.message = action.error;
    })


    .addCase(addListingToWishlist.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(addListingToWishlist.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentUser = action?.payload;
    })

    .addCase(addListingToWishlist.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        // state.message = action.error;
    })


    .addCase(deleteListingFromWishlist.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(deleteListingFromWishlist.fulfilled,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.listingDeletedFromWishlist = action?.payload;
    })

    .addCase(deleteListingFromWishlist.rejected,(state, action: PayloadAction<any>) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        // state.message = action.error;
    })


    

  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer;

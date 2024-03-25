import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { END_POINT } from '../../config/end-point'

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSignupSuccess: (state, action) => {
      state.success = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerHR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerHR.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(registerHR.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setError, setSignupSuccess} = authSlice.actions

export const registerHR = createAsyncThunk(
  'auth/register',
  async ({ email, firstname, lastname, phone, birthdate, company, url }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${END_POINT}/api/client-app/application/hr`,
        { email, firstname, lastname, phone, birthdate, company, url },
        config
      )
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        console.log("Error rejectWithValue111", error.response.data)
        return rejectWithValue(error.response.data.message)
      } else if(error.response.data.fields) {
        console.log("Fields error", error.response.data.fields)
        return rejectWithValue(error.response.data.fields)
      } 
      else if(error.response.data.status) {
        console.log("Status error", error.response.data.status)
        return rejectWithValue(error.response.data.status)
      }
    }
  }
)


export const registerMentor = createAsyncThunk(
  'auth/register',
  async ({ email, firstname, lastname, phone, birthdate, description }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${END_POINT}/api/client-app/application/mentor`,
        { email, firstname, lastname, phone, birthdate, description },
        config
      )
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        console.log("Error rejectWithValue111", error.response.data)
        return rejectWithValue(error.response.data.message)

      } else if(error.response.data.fields) {
        console.log("Fields error", error.response.data.fields)
        return rejectWithValue(error.response.data.fields)
      } 
      else if(error.response.data.status) {
        console.log("Status error", error.response.data.status)
        return rejectWithValue(error.response.data.status)
      }
    }
  }
)


export default authSlice.reducer
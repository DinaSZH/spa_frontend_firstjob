import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { END_POINT } from '../../config/end-point'
import KeycloakService from '../../services/KeycloakService';

let initialState=  {
  profile:null,
  error: null,
  loading: false,
  success: false,
}


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSuccess: (state, action) => {
      state.success = false;
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.success = false; // Reset success state when starting the request
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editProfile.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setProfile, setError, clearSuccess } = profileSlice.actions; 

export const getProfile = createAsyncThunk('user/getProfile', async (_, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const { data } = await axios.get(`${END_POINT}/api/client-app/profiles`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(setProfile(data)); 
  } catch (error) {
    thunkApi.dispatch(setError(error.message));
  }
});

export const createProfile = createAsyncThunk('user/createProfile', async (_, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken();
    const { data } = await axios.post(`${END_POINT}/api/client-app/profiles`, null, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(setProfile(data));
  } catch (error) {
    thunkApi.dispatch(setError(error.message));
  }
});



export const editProfile = createAsyncThunk('user/editProfile', async (updatedProfile, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken();
    const { data } = await axios.put(`${END_POINT}/api/client-app/profiles`, updatedProfile, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(setProfile(data));
    return data; 
  } catch (error) {
    console.log("Error edit: ", error.response.data.fields )
    return rejectWithValue(error.response.data.fields)
  }
});



// export const editProfile = createAsyncThunk('user/getProfile', async (_, thunkApi) => {
//   try {
//     const jwt = KeycloakService.getToken(); // Access the token from your auth state
//     const { data } = await axios.get(`${END_POINT}/api/client-app/profiles`, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });
//     thunkApi.dispatch(setProfile(data)); // Use thunkApi.dispatch to dispatch actions
//   } catch (error) {
//     thunkApi.dispatch(setError(error.message));
//   }
// });


// export const editProfile = (sendData, navigate) => async (dispatch) => {
//     try{
//       const jwt = KeycloakService.getToken(); 
//       const res = await axios.put(`${END_POINT}/api/client-app/profiles`, sendData);
//       navigate.push(`/profile`)
//     } catch(e) {
  
//       alert("Что то пошло не так, сообщите об ошибке Тех спецам сайта!")
//     }   
//   }

// export const sendVerificationEmail = (email) => (dispatch) => {
//       axios.post(`${END_POINT}/api/auth/sendmail` , {
//         email
//       })
// }

// export const verifyCode = (email, code) => (dispatch) => {
//   axios.post(`${END_POINT}/api/auth/verifycode`, {
//     email,
//     code
//   }).then(res => {
//     dispatch(authorize(res.data))
//   })
// }



// export const signIn = (data, router) => (dispatch)=> {
//   axios.post(`${END_POINT}/api/auth/login`, data).then(res => {
//     dispatch(authorize(res.data))
//     router.push("/vacancy")
//   }).catch(e => {
//     console.log(e)
//     if(e.response && e.response.data)
//     dispatch(setError(e.response.data))
//   })
// }

export default profileSlice.reducer
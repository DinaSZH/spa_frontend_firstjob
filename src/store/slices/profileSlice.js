import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { END_POINT } from '../../config/end-point'
import KeycloakService from '../../services/KeycloakService';

let initialState=  {
  profile:null,
  error: null
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
  },
});

export const { setProfile, setError } = profileSlice.actions; // Fix the export

export const getProfile = createAsyncThunk('user/getProfile', async (_, thunkApi) => {
  try {
    const jwt = thunkApi.getState().auth.token; // Access the token from your auth state
    const { data } = await axios.get(`${END_POINT}/api/client-app/profiles`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(setProfile(data)); // Use thunkApi.dispatch to dispatch actions
  } catch (error) {
    thunkApi.dispatch(setError(error.message));
  }
});



export const editProfile = (sendData, navigate) => async (dispatch) => {
    try{
      const res = await axios.put(`${END_POINT}/api/client-app/profiles`, sendData);
      navigate.push(`/profile`)
    } catch(e) {
  
      alert("Что то пошло не так, сообщите об ошибке Тех спецам сайта!")
    }   
  }

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
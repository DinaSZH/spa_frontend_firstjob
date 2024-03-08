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
  async ({ email, firstname, lastname }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${END_POINT}/api/client-app/application/hr`,
        { email, firstname, lastname },
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
  async ({ email, firstname, lastname }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${END_POINT}/api/client-app/application/mentor`,
        { email, firstname, lastname },
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


// export const signUpHr = (data) => (dispatch) => {
//   const fd = new FormData();
//   fd.append("email", data.email)
//   fd.append("firstname", data.firstname)
//   fd.append("lastname", data.lastname)
//   axios.post(`${END_POINT}/api/client-app/application/hr`, fd).catch(e => {
//     console.log(e)
//     dispatch(setError(e.response.data))
//   })
// }

// export const signUpMentor = (data) => (dispatch) => {
//   const fd = new FormData();
//   fd.append("email", data.email)
//   fd.append("firstname", data.firstname)
//   fd.append("lastname", data.lastname)
//   axios.post(`${END_POINT}/api/client-app/application/mentor`, fd).catch(e => {
//     console.log(e)
//     dispatch(setError(e.response.data))
//   })
// }

// export const registerHR = createAsyncThunk(
//   'user/register',
//   async (params, { dispatch }) => {
//     try {
//       const { data } = await axios.post(`${END_POINT}/api/client-app/application/hr`, {
//         email: params.email,
//         firstname: params.firstname,
//         lastname: params.lastname,
//       });
//       return data;
//     } catch (e) {
//       if (e instanceof AxiosError) {
//         dispatch(setError(e.response?.data?.data?.message))
//         throw new Error(e.response?.data?.data?.message);
//       } else {
//         throw e;
//       }
//     }
//   }
// );


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

export default authSlice.reducer
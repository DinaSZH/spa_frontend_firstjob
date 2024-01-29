import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { END_POINT } from '../../config/end-point'


export const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: [],
    resume: {},
    error: null,
    loading:false,
    success: null
  },
  reducers: {
    setMyResumes: (state, action) => {
      state.resumes =  action.payload.resumes
    },
    uppendResume: (state, action) => {
      state.resumes = [...state.resumes, action.payload.newresume]
    },
    setResume: (state, action) => {
      state.resume = action.payload.resume
    },
    handleDeleteResume: (state, action) => {
      let resumes = [...state.resumes]
      resumes = resumes.filter(item => item.id !== action.payload)
      state.resumes = resumes
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(getResumes.rejected, (state, { payload }) => {
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
})

// Action creators are generated for each case reducer function
export const { setMyResumes, uppendResume, setResume, handleDeleteResume} = resumeSlice.actions

export const getProfile = createAsyncThunk('user/getResumes', async (_, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const { data } = await axios.get(`${END_POINT}/api/client-app/resumes`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(setMyResumes(data)); 
  } catch (error) {
    thunkApi.dispatch(setError(error.message));
  }
});

// export const getResumeById = (id) => async (dispatch) => {
//   try{
//     const res = await axios.get(`${END_POINT}/api/resume/${id}`);
//     dispatch(setResume({resume: res.data}))
//   } catch(e) {
//     alert("Что то пошло не так, сообщите об ошибке Тех спецам сайта!")
//   }  
// }

export const createResume = createAsyncThunk('user/editProfile', async (createResume, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken();
    const { data } = await axios.post(`${END_POINT}/api/client-app/resumes`, createResume, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(uppendResume(data));
    return data; 
  } catch (error) {
    console.log("Error edit: ", error.response.data )
    return rejectWithValue(error.response.data)
  }
});


// export const createResume = (sendData, router) => async (dispatch) => {
//   try{
//     const res = await axios.post(`${END_POINT}/api/client-app/resumes`, sendData);
//     router.push("/resumes")
//     dispatch(uppendResume({newresume: res.data}))
//   } catch(e) {
//     alert("Что то пошло не так, сообщите об ошибке Тех спецам сайта!")
//   }  
// }

export const editResume = (sendData, router) => async (dispatch) => {
  try{
    const res = await axios.put(`${END_POINT}/api/resume`, sendData);
    router.push("/resumes")
  } catch(e) {

    alert("Что то пошло не так, сообщите об ошибке Тех спецам сайта!")
  }   
}

export const deleteResume = (id) => async (dispatch) => {
  try{
    const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
    dispatch(handleDeleteResume(id))
  } catch(e) {

    alert("Что то пошло не так, сообщите об ошибке Тех спецам сайта!")
  }   
}


export default resumeSlice.reducer 
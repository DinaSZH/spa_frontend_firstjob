import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { END_POINT } from '../../config/end-point'
import KeycloakService from '../../services/KeycloakService';

export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState: {
    vacancies: [],
    vacancy: {},
    error: null,
    loading:false,
    success: null
  },
  reducers: {
    setMyVacancies: (state, action) => {
      state.vacancies =  action.payload.vacancies
    },
    uppendVacancy: (state, action) => {
      state.vacancies = [...state.vacancies, action.payload.newvacancy]
    },
    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy
    },
    handleDeleteVacancy: (state, action) => {
      let vacancies = [...state.vacancies]
      vacancies = vacancies.filter(item => item.id !== action.payload)
      state.vacancies = vacancies
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyResumes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(getMyResumes.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(createResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(createResume.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumeById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(getResumeById.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResumeById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(deleteResumeById.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(editResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editResumeById.fulfilled, (state, action) => {
        const updateItem = action.payload;
        console.log(updateItem);
        const index = state.resumes.findIndex(
          (item) => item._id === updateItem._id
        );
        if (index!==-1) {
          state.resumes[index] = updateItem;
        }
      state.response = "update";
        state.loading = false;
        state.success = true; 
      })
      .addCase(editResumeById.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
})

export const { setMyVacancies, uppendVacancy, setVacancy, handleDeleteVacancy} = vacancySlice.actions



export const getMyVacancies = createAsyncThunk('user/getVacancies', async (_, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const { data } = await axios.get(`${END_POINT}/api/content/vacancies/my`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log('Fetched resumes:', data); // Log fetched data
    thunkApi.dispatch(setMyVacancies({resumes: data})); 
  } catch (error) {
    console.error('Error fetching resumes:', error);
    thunkApi.rejectWithValue(error.message);
  }
});

export const createVacancy = createAsyncThunk('user/createVacancy', async (createVacancy, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken();
    const { data } = await axios.post(`${END_POINT}/api/content/vacancies`, createVacancy, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(uppendVacancy({newvacancy: data}));
    console.log("Vacancy DATAT: ", data)
    return data; 
  } catch (error) {
    console.log("Error creating vacancy: ", error.response.data )
    return rejectWithValue(error.response.data)
  }
});

export const getVacancyById = createAsyncThunk('user/getVacancyById', async (id, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const { data } = await axios.get(`${END_POINT}/api/content/vacancies/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log('Fetched vacancy:', data); // Log fetched data
    thunkApi.dispatch(setVacancy({vacancy: data})); 
  } catch (error) {
    console.error('Error getting vacancy by id:', error);
    thunkApi.rejectWithValue(error.message);
  }
});

export const deleteVacancyById = createAsyncThunk('user/deleteVacancyById', async (id, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const { data } = await axios.delete(`${END_POINT}/api/content/vacancies/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    thunkApi.dispatch(handleDeleteVacancy(id)); 
  } catch (error) {
    console.error('Error deleting the vacancy:', error);
    thunkApi.rejectWithValue(error.message);
  }
});

export const editVacancyById = createAsyncThunk('user/editVacancyById', async (data, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const res = await axios.put(`${END_POINT}/api/content/vacancies/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data; 
  } catch (error) {
    console.error('Error editing the vacancy:', error);
    thunkApi.rejectWithValue(error.message);
  }
});

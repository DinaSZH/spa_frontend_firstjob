import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { POINT_CONTENT } from '../../config/end-point'
import KeycloakService from '../../services/KeycloakService';

export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState: {
    allVacancies: [],
    vacancies: [],
    vacancy: {},
    error: null,
    loading:false,
    success: null
  },
  reducers: {
    setAllVacancies: (state, action) => {
      state.allVacancies =  action.payload.allVacancies
    },
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
      .addCase(getAllVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVacancies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(getAllVacancies.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyVacancies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(getMyVacancies.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVacancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVacancy.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(createVacancy.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVacancyById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(getVacancyById.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteVacancyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVacancyById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(deleteVacancyById.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(editVacancyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editVacancyById.fulfilled, (state, action) => {
      state.response = "update";
        state.loading = false;
        state.success = true; 
      })
      .addCase(editVacancyById.rejected, (state, { payload }) => {
        console.error('Error from backend:', payload);
        state.loading = false;
        state.error = payload;
      });
  },
})

export const { setAllVacancies, setMyVacancies, uppendVacancy, setVacancy, handleDeleteVacancy} = vacancySlice.actions


export const getAllVacancies = createAsyncThunk('user/getAllVacancies', async (_, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const { data } = await axios.get(`${POINT_CONTENT}/api/content/vacancies`);
    console.log('Fetched all vacancies:', data); 
    thunkApi.dispatch(setAllVacancies({allVacancies: data})); 
  } catch (error) {
    console.error('Error fetching all vacancies:', error);
    thunkApi.rejectWithValue(error.message);
  }
});

export const getMyVacancies = createAsyncThunk('user/getMyVacancies', async (_, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken(); 
    const { data } = await axios.get(`${POINT_CONTENT}/api/content/vacancies/my`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log('Fetched vacancies:', data); // Log fetched data
    thunkApi.dispatch(setMyVacancies({vacancies: data})); 
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    thunkApi.rejectWithValue(error.message);
  }
});

export const createVacancy = createAsyncThunk('user/createVacancy', async (createVacancy, thunkApi) => {
  try {
    const jwt = KeycloakService.getToken();
    const { data } = await axios.post(`${POINT_CONTENT}/api/content/vacancies`, createVacancy, {
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
    const { data } = await axios.get(`${POINT_CONTENT}/api/content/vacancies/${id}`, {
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
    const { data } = await axios.delete(`${POINT_CONTENT}/api/content/vacancies/${id}`, {
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
    const res = await axios.put(`${POINT_CONTENT}/api/content/vacancies/${data.id}`, data, {
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

export default vacancySlice.reducer
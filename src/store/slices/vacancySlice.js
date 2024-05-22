import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POINT_CONTENT } from "../../config/end-point";
import KeycloakService from "../../services/KeycloakService";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState: {
    allVacancies: [],
    vacancies: [],
    vacancy: {},
    error: null,
    loadingVacancy: false,
    success: false,
  },
  reducers: {
    setAllVacancies: (state, action) => {
      state.allVacancies = action.payload.allVacancies;
    },
    setMyVacancies: (state, action) => {
      state.vacancies = action.payload.vacancies;
    },
    uppendVacancy: (state, action) => {
      state.vacancies = [...state.vacancies, action.payload.newvacancy];
    },
    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy;
    },
    handleDeleteVacancy: (state, action) => {
      let vacancies = [...state.vacancies];
      vacancies = vacancies.filter((item) => item.id !== action.payload);
      state.vacancies = vacancies;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllAuthVacancies
      .addCase(getAllAuthVacancies.pending, (state) => {
        state.loadingVacancy = true;
        state.error = null;
      })
      .addCase(getAllAuthVacancies.fulfilled, (state, { payload }) => {
        state.loadingVacancy = false;
        state.success = true;
      })
      .addCase(getAllAuthVacancies.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loadingVacancy = false;
        state.error = payload;
      })
      // getAllVacancies
      .addCase(getAllVacancies.pending, (state) => {
        state.loadingVacancy = true;
        state.error = null;
      })
      .addCase(getAllVacancies.fulfilled, (state, { payload }) => {
        state.loadingVacancy = false;
        state.success = true;
      })
      .addCase(getAllVacancies.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loadingVacancy = false;
        state.error = payload;
      })

      // getMyVacancies
      .addCase(getMyVacancies.pending, (state) => {
        state.loadingVacancy = true;
        state.error = null;
      })
      .addCase(getMyVacancies.fulfilled, (state, { payload }) => {
        state.loadingVacancy = false;
        state.success = true;
      })
      .addCase(getMyVacancies.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loadingVacancy = false;
        state.error = payload;
      })

      // createVacancy
      .addCase(createVacancy.pending, (state) => {
        state.loadingVacancy = true;
        state.error = null;
      })
      .addCase(createVacancy.fulfilled, (state, { payload }) => {
        state.loadingVacancy = false;
        state.success = true;
      })
      .addCase(createVacancy.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loadingVacancy = false;
        state.error = payload;
      })

      // getVacancyById
      .addCase(getVacancyById.pending, (state) => {
        state.loadingVacancy = true;
        state.error = null;
      })
      .addCase(getVacancyById.fulfilled, (state, { payload }) => {
        state.loadingVacancy = false;
        state.success = true;
      })
      .addCase(getVacancyById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loadingVacancy = false;
        state.error = payload;
      })

      // deleteVacancyById
      .addCase(deleteVacancyById.pending, (state) => {
        state.loadingVacancy = true;
        state.error = null;
      })
      .addCase(deleteVacancyById.fulfilled, (state, { payload }) => {
        state.loadingVacancy = false;
        state.success = true;
      })
      .addCase(deleteVacancyById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loadingVacancy = false;
        state.error = payload;
      })

      // editVacancyById
      .addCase(editVacancyById.pending, (state) => {
        state.loadingVacancy = true;
        state.error = null;
      })
      .addCase(editVacancyById.fulfilled, (state, action) => {
        state.response = "update";
        state.loadingVacancy = false;
        state.success = true;
      })
      .addCase(editVacancyById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loadingVacancy = false;
        state.error = payload;
      });
  },
});

export const {
  setAllVacancies,
  setMyVacancies,
  uppendVacancy,
  setVacancy,
  handleDeleteVacancy,
} = vacancySlice.actions;

export const getAllVacancies = createAsyncThunk(
  "user/getAllVacancies",
  async (filterParams, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/vacancies`,
        { params: filterParams }
      );
      console.log("Fetched all vacancies:", data);
      thunkApi.dispatch(setAllVacancies({ allVacancies: data }));
    } catch (error) {
      console.error("Error fetching all vacancies:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllAuthVacancies = createAsyncThunk(
  "user/getAllAuthVacancies",
  async (filterParams, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/vacancies`,
        {
          params: filterParams,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched all auth vacancies:", data);
      thunkApi.dispatch(setAllVacancies({ allVacancies: data }));
    } catch (error) {
      console.error("Error fetching all vacancies:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMyVacancies = createAsyncThunk(
  "user/getMyVacancies",
  async (_, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/vacancies/my`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched vacancies:", data); // Log fetched data
      thunkApi.dispatch(setMyVacancies({ vacancies: data }));
    } catch (error) {
      console.error("Error fetching vacancies:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createVacancy = createAsyncThunk(
  "user/createVacancy",
  async (createVacancy, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.post(
        `${POINT_CONTENT}/api/content/vacancies`,
        createVacancy,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      thunkApi.dispatch(uppendVacancy({ newvacancy: data }));
      console.log("Vacancy DATAT: ", data);
      return data;
    } catch (error) {
      console.log("Error creating vacancy: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVacancyById = createAsyncThunk(
  "user/getVacancyById",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/vacancies/${id}`
      );
      console.log("Fetched vacancy:", data); // Log fetched data
      thunkApi.dispatch(setVacancy({ vacancy: data }));
    } catch (error) {
      console.error("Error getting vacancy by id:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteVacancyById = createAsyncThunk(
  "user/deleteVacancyById",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.delete(
        `${POINT_CONTENT}/api/content/vacancies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      thunkApi.dispatch(handleDeleteVacancy(id));
    } catch (error) {
      console.error("Error deleting the vacancy:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editVacancyById = createAsyncThunk(
  "user/editVacancyById",
  async ({ id, updatedVacancy }, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const response = await axios.put(
        `${POINT_CONTENT}/api/content/vacancies/${id}`,
        updatedVacancy,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data after editing resume:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error editing the resume:", error);
      console.log(
        "Error response data:",
        error.response ? error.response.data : error.message
      );
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export default vacancySlice.reducer;

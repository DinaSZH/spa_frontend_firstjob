import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "../../config/end-point";
import KeycloakService from "../../services/KeycloakService";

export const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    resumesHR: [],
    resume: {},
    error: null,
    loading: false,
    success: null,
  },
  reducers: {
    setMyResumes: (state, action) => {
      state.resumes = action.payload.resumes;
    },
    setResumesHR: (state, action) => {
      state.resumesHR = action.payload.resumesHR;
    },
    uppendResume: (state, action) => {
      state.resumes = [...state.resumes, action.payload.newresume];
    },
    setResume: (state, action) => {
      state.resume = action.payload.resume;
    },
    handleDeleteResume: (state, action) => {
      let resumes = [...state.resumes];
      resumes = resumes.filter((item) => item.id !== action.payload);
      state.resumes = resumes;
    },
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
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(createResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createResume.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(getResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumeById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getResumeById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResumeById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteResumeById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(editResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editResumeById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      //gel all resumes for HR
      .addCase(getAllResumesHR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllResumesHR.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllResumesHR.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
  },
});

export const { setMyResumes, setResumesHR, uppendResume, setResume, handleDeleteResume } =
  resumeSlice.actions;

export const getMyResumes = createAsyncThunk(
  "user/getResumes",
  async (_, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${END_POINT}/api/client-app/resumes/my`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched resumes:", data); // Log fetched data
      thunkApi.dispatch(setMyResumes({ resumes: data }));
    } catch (error) {
      console.error("Error fetching resumes:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllResumesHR = createAsyncThunk(
  "user/getAllResumesHR",
  async (_, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${END_POINT}/api/client-app/resumes`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched resumes:", data); // Log fetched data
      thunkApi.dispatch(setResumesHR({ resumesHR: data }));
    } catch (error) {
      console.error("Error fetching resumes:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createResume = createAsyncThunk(
  "user/createResume",
  async (createResume, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.post(
        `${END_POINT}/api/client-app/resumes`,
        createResume,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      thunkApi.dispatch(uppendResume({ newresume: data }));
      console.log("RESUMEE DATAT: ", data);
      return data;
    } catch (error) {
      console.log("Error creating resume: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getResumeById = createAsyncThunk(
  "user/getResumeById",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${END_POINT}/api/client-app/resumes/my/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched resume:", data); // Log fetched data
      thunkApi.dispatch(setResume({ resume: data }));
    } catch (error) {
      console.error("Error getting resume by id:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getResumeByIdForHR = createAsyncThunk(
  "user/getResumeByIdForHR",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${END_POINT}/api/client-app/resumes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched resume:", data); // Log fetched data
      thunkApi.dispatch(setResume({ resume: data }));
    } catch (error) {
      console.error("Error getting resume by id:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteResumeById = createAsyncThunk(
  "user/deleteResumeById",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.delete(
        `${END_POINT}/api/client-app/resumes/my/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      thunkApi.dispatch(handleDeleteResume(id));
    } catch (error) {
      console.error("Error deleting the resume:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const downloadResumeById = createAsyncThunk(
  "user/downloadResumeById",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const response = await axios.get(
        `${END_POINT}/api/client-app/resumes/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      // Освобождаем URL объекта после скачивания
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the resume:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editResumeById = createAsyncThunk(
  "user/editResumeById",
  async ({ id, updatedResume }, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const response = await axios.put(
        `${END_POINT}/api/client-app/resumes/my/${id}`,
        updatedResume,
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

export default resumeSlice.reducer;

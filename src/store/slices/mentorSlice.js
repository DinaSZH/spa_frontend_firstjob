import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POINT_CONTENT } from "../../config/end-point";
import KeycloakService from "../../services/KeycloakService";
import _axiosContent from "../../utils/axiosContent";

export const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    mentorProfile: null,
    mentors: [],
    mentor: {},
    error: null,
    loading: false,
    success: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.mentorProfile = action.payload;
    },
    setAllMentors: (state, action) => {
      state.mentors = action.payload.mentors;
    },
    setMentor: (state, action) => {
      state.mentor = action.payload.mentor;
    },
    uppendMentor: (state, action) => {
      state.mentors = [...state.mentors, action.payload.newmentor];
    },
    setResume: (state, action) => {
      state.mentor = action.payload.mentor;
    },
    handleDeleteResume: (state, action) => {
      let mentors = [...state.mentors];
      mentors = mentors.filter((item) => item.id !== action.payload);
      state.mentors = mentors;
    },
  },
  extraReducers: (builder) => {
    builder
      //getMentorProfile
      .addCase(getMentorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMentorProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getMentorProfile.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      //getAllMentors
      .addCase(getAllMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMentors.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllMentors.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      // getMentorsById
      .addCase(getMentorsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMentorsById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getMentorsById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      })
      // editProfileMentor
      .addCase(editProfileMentor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfileMentor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editProfileMentor.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setProfile,
  setAllMentors,
  setMentor,
  uppendMentor,
  setResume,
  handleDeleteResume,
} = mentorSlice.actions;

export const getMentorProfile = createAsyncThunk(
  "user/getMentorProfile",
  async (_, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await _axiosContent.get(
        `${POINT_CONTENT}/api/content/mentor/my`
      );
      thunkApi.dispatch(setProfile(data));
    } catch (error) {
      thunkApi.dispatch(setError(error.message));
    }
  }
);

export const getAllMentors = createAsyncThunk(
  "user/getAllMentors",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`${POINT_CONTENT}/api/content/mentor`);
      console.log("Fetched all mentors:", data);
      thunkApi.dispatch(setAllMentors({ mentors: data }));
    } catch (error) {
      console.error("Error fetching all mentors:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMentorsById = createAsyncThunk(
  "user/getMentorsById",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/mentor/${id}`
      );
      console.log("Fetched mentors id:", data);
      thunkApi.dispatch(setMentor({ mentor: data }));
    } catch (error) {
      console.error("Error getting mentors by id:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createMentorProfile = createAsyncThunk(
  "user/createMentorProfile",
  async (createMentor, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await _axiosContent.post(
        `${POINT_CONTENT}/api/content/mentor`,
        createMentor
      );
      thunkApi.dispatch(uppendMentor({ newmentor: data }));
      console.log("Mentor DATAT: ", data);
      return data;
    } catch (error) {
      console.log("Error creating resume: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProfileMentor = createAsyncThunk(
  "user/editProfileMentor",
  async (updatedProfile, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await _axiosContent.put(
        `${POINT_CONTENT}/api/content/mentor`,
        updatedProfile
      );
      thunkApi.dispatch(setProfile(data));
      return data;
    } catch (error) {
      console.log("Error edit: ", error.response.data.fields);
      return rejectWithValue(error.response.data.fields);
    }
  }
);

export default mentorSlice.reducer;

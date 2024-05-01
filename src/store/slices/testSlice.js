import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POINT_CONTENT } from "../../config/end-point";
import KeycloakService from "../../services/KeycloakService";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    tests: [],
    platformTests: [],
    test: {},
    fullTest: {},
    platformTest: {},
    certifications: [],
  },
  reducers: {
    setTestPreviw: (state, action) => {
      state.test = action.payload.test;
    },
    setTest: (state, action) => {
      state.fullTest = action.payload.fullTest;
    },
    setPlatformTest: (state, action) => {
      state.platformTest = action.payload.platformTest;
    },
    uppendTest: (state, action) => {
      state.tests = [...state.tests, action.payload.newtest];
    },
    setMyTests: (state, action) => {
      state.tests = action.payload.tests;
    },
    setPlatformTests: (state, action) => {
      state.platformTests = action.payload.platformTests;
    },
    setMyCertifications: (state, action) => {
      state.certifications = action.payload.certifications;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestPreview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTestPreview.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.status = action.payload.status;
      })
      .addCase(getTestPreview.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitTest.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createTest.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyTests.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getMyTests.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyCertifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyCertifications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getMyCertifications.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setTestPreviw,
  setTest,
  uppendTest,
  setMyTests,
  setMyCertifications,
  setPlatformTests,
  setPlatformTest,
} = testSlice.actions;

export const getTestPreview = createAsyncThunk(
  "user/getTestPreview",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/tests/${id}/preview`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      thunkApi.dispatch(setTestPreviw({ test: data }));
    } catch (error) {
      console.error("Error getTestPreview:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const submitTest = createAsyncThunk(
  "user/submitTest",
  async ({ id, answers, resumeId }, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.post(
        `${POINT_CONTENT}/api/content/vacancies/${id}/submit?resumeId=${resumeId}`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error sumbit test to the vacancy:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createTest = createAsyncThunk(
  "user/createTest",
  async (testData, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.post(
        `${POINT_CONTENT}/api/content/tests/hr`,
        testData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(data);
      thunkApi.dispatch(uppendTest({ newtest: data }));
    } catch (error) {
      console.error("Error create test:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMyTests = createAsyncThunk(
  "user/getMyTests",
  async (_, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/tests/hr`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched tests:", data);
      thunkApi.dispatch(setMyTests({ tests: data }));
    } catch (error) {
      console.error("Error fetching tests:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMyCertifications = createAsyncThunk(
  "user/getMyCertifications",
  async (email, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/certification?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched certifications:", data);
      thunkApi.dispatch(setMyCertifications({ certifications: data }));
    } catch (error) {
      console.error("Error fetching certifications:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const downloadCertificationById = createAsyncThunk(
  "user/downloadCertificationById",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const response = await axios.get(
        `${POINT_CONTENT}/api/content/certification/${id}/download`,
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
      link.setAttribute("download", `certification_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the certification:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPlatformTests = createAsyncThunk(
  "user/getPlatformTests",
  async (_, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/tests/platform`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched tests:", data);
      thunkApi.dispatch(setPlatformTests({ platformTests: data }));
    } catch (error) {
      console.error("Error fetching tests:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPlatformTestById = createAsyncThunk(
  "user/getPlatformTestById",
  async (id, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/tests/platform/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      thunkApi.dispatch(setPlatformTest({ platformTest: data }));
    } catch (error) {
      console.error("Error getPlatformTestById:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const submitPlatformTest = createAsyncThunk(
  "user/submitPlatformTest",
  async ({ id, answers }, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.post(
        `${POINT_CONTENT}/api/content/certification/${id}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error sumbit test platform:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export default testSlice.reducer;

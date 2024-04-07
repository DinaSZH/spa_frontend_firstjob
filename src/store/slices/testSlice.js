import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POINT_CONTENT } from "../../config/end-point";
import KeycloakService from "../../services/KeycloakService";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    tests: [],
    test: {},
    fullTest: {},
  },
  reducers: {
    setTestPreviw: (state, action) => {
      state.test = action.payload.test;
    },
    setTest: (state, action) => {
      state.fullTest = action.payload.fullTest;
    },
    uppendTest: (state, action) => {
      state.tests = [...state.tests, action.payload.newtest];
    },
    setMyTests: (state, action) => {
      state.tests = action.payload.tests;
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
});

export const { setTestPreviw, setTest, uppendTest, setMyTests } =
  testSlice.actions;

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

export default testSlice.reducer;

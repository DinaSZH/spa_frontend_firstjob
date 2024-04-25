import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POINT_CONTENT } from "../../config/end-point";
import KeycloakService from "../../services/KeycloakService";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    allNews: [],
    news: [],
    newsId: {},
    error: null,
    loading: false,
    success: null,
  },
  reducers: {
    setAllNews: (state, action) => {
      state.allNews = action.payload.allNews;
    },
    setMyVacancies: (state, action) => {
      state.news = action.payload.news;
    },
    uppendNewsId: (state, action) => {
      state.news = [...state.news, action.payload.newNewsId];
    },
    setNews: (state, action) => {
      state.newsId = action.payload.newsId;
    },
    handleDeleteVacancy: (state, action) => {
      let news = [...state.news];
      news = news.filter((item) => item.id !== action.payload);
      state.news = news;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllNews.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
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
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createNews.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewsById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getNewsById.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setAllNews,
  setMyVacancies,
  uppendNewsId,
  setNews,
  handleDeleteVacancy,
} = newsSlice.actions;

export const getAllNews = createAsyncThunk(
  "user/getAllNews",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`${POINT_CONTENT}/api/content/news`);
      console.log("Fetched all news:", data);
      thunkApi.dispatch(setAllNews({ allNews: data }));
    } catch (error) {
      console.error("Error fetching all news:", error);
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
      thunkApi.dispatch(setMyVacancies({ news: data }));
    } catch (error) {
      console.error("Error fetching vacancies:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createNews = createAsyncThunk(
  "user/createNews",
  async (formData, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.post(
        `${POINT_CONTENT}/api/content/news`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      thunkApi.dispatch(uppendNewsId({ newNewsId: data }));
      console.log("News DATAT: ", data);
      return data;
    } catch (error) {
      console.log("Error creating news: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNewsById = createAsyncThunk(
  "user/getNewsById",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/news/${id}`
      );
      console.log("Fetched news id:", data);
      thunkApi.dispatch(setNews({ newsId: data }));
    } catch (error) {
      console.error("Error getting news by id:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export default newsSlice.reducer;

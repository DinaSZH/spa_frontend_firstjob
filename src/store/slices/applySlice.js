import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POINT_CONTENT } from "../../config/end-point";
import KeycloakService from "../../services/KeycloakService";

export const applySlice = createSlice({
  name: "apply",
  initialState: {
    applies: [],
    userApplies: [],
    apply: {},
    testMain: {},
  },
  reducers: {
    appendApply: (state, action) => {
      state.applies = [...state.applies, action.payload];
    },
    setApplies: (state, action) => {
      state.applies = action.payload;
    },
    setUserApplies: (state, action) => {
      state.userApplies = action.payload;
    },
    removeApply: (state, action) => {
      let applies = [...state.applies];
      applies = applies.filter((item) => item.id !== action.payload);
      state.applies = applies;
    },
    setApplyStatus: (state, action) => {
      let applies = [...state.applies];
      applies = applies.map((item) => {
        if (item.id === action.payload.applyId) {
          item.status = action.payload.status;
        }
        return item;
      });
      state.applies = applies;
    },
    setTest: (state, action) => {
      state.testMain = action.payload.testMain;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplyVacancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplyVacancy.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createApplyVacancy.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancyApplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVacancyApplies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getVacancyApplies.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserApplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserApplies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getUserApplies.rejected, (state, { payload }) => {
        console.error("Error from backend:", payload);
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  appendApply,
  setApplies,
  setUserApplies,
  removeApply,
  setApplyStatus,
  setTest,
} = applySlice.actions;

export const createApplyVacancy = createAsyncThunk(
  "user/createApplyVacancy",
  async ({ id, resumeId }, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.post(
        `${POINT_CONTENT}/api/content/vacancies/${id}/apply?resumeId=${resumeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(data);
      thunkApi.dispatch(setTest({ testMain: data }));
    } catch (error) {
      console.error("Error apply to the vacancy:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getVacancyApplies = createAsyncThunk(
  "user/getVacancyApplies",
  async (_, thunkApi) => {
    try {
      const jwt = KeycloakService.getToken();
      const { data } = await axios.get(
        `${POINT_CONTENT}/api/content/applications`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched applies:", data);
      thunkApi.dispatch(setApplies(data));
    } catch (error) {
      console.error("Error fetching applies:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const inviteApply = (applyId) => (dispatch) => {
  axios
    .put(`${END_POINT}/api/applies/accept/employee`, { applyId })
    .then((res) => {
      dispatch(setApplyStatus({ applyId, status: "INVITATION" }));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getUserApplies = createAsyncThunk(
  "user/getUserApplies",
  async (status, thunkApi) => {
    // Accepting the status parameter
    try {
      const jwt = KeycloakService.getToken();
      const url = status
        ? `${POINT_CONTENT}/api/content/applications/user?status=${status}`
        : `${POINT_CONTENT}/api/content/applications/user`;
      const { data } = await axios.get(
        url, // Using the status parameter in the URL if provided
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Fetched applies:", data);
      thunkApi.dispatch(setUserApplies(data));
    } catch (error) {
      console.error("Error fetching applies:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const acceptApply = (applyId) => (dispatch) => {
//   axiosInstance.post(`/users/applications/hr/${applyId}/confirm`).then(res => {

//     dispatch(setApplyStatusHR({applyId, status: "confirmed"}))
//     alert("Successfully confirmed")
//   }).catch(e => {
//     console.log(e)
//     alert("Что то пошло не так, сообщите об ошибке Тех спецам сайта!")
//   })
// }

// export const declineApply = (applyId) => (dispatch) => {
//   axios.put(`${END_POINT}/api/applies/decline/employee`, {applyId}).then(res => {
//     dispatch(setApplyStatus({applyId, status: "DECLINED"}))
//   }).catch(e => {
//     console.log(e)
//   })
// }

////////////////////////////////////////////////
////////////////////////////////////////////////

// export const getEmployeeApplies = (data) => (dispatch) => {
//     axios.get(`${END_POINT}/api/applies/employee`).then(res => {
//       dispatch(setApplies(res.data))
//     }).catch(e => {
//       console.log(e)
//     })
//   }

// export const getVacancyApplies = (id) => (dispatch) => {
//   axios.get(`${END_POINT}/api/applies/vacancy/${id}`).then(res => {
//     dispatch(setApplies(res.data))
//   }).catch(e => {
//     console.log(e)
//   })
// }

// export const acceptApply = (applyId) => (dispatch) => {
//   axios.put(`${END_POINT}/api/applies/accept/employee`, {applyId}).then(res => {

//     dispatch(setApplyStatus({applyId, status: "INVITATION"}))

//   }).catch(e => {
//     console.log(e)

//   })
// }

// export const declineApply = (applyId) => (dispatch) => {
//   axios.put(`${END_POINT}/api/applies/decline/employee`, {applyId}).then(res => {
//     dispatch(setApplyStatus({applyId, status: "DECLINED"}))
//   }).catch(e => {
//     console.log(e)
//   })
// }

// export const deleteApply = (id) => (dispatch) => {
//     axios.delete(`${END_POINT}/api/applies/${id}`).then(res => {
//       dispatch(removeApply(id))
//     }).catch(e => {
//       console.log(e)

//     })
//   }

export default applySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../util/axiosInstance";

// initial state
const initialState = {
  // auth
  token: localStorage.getItem("token") || null,
  user: null,
  isOwner: false,

  // car
  cars: [],

  // ui
  showLogin: false,
  bookDate: "",
  purchaseDate: "",
};

// Thunks
export const fetchUser = createAsyncThunk("fetchUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/api/user/data");
    if (data.success) return data.user;
    return rejectWithValue("Failed to fetch user");
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchCars = createAsyncThunk("fetchCars", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/api/user/cars");
    if (data.success) return data.cars;
    return rejectWithValue(data.message);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// slice
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Auth
    setToken: (state, action) => {
      state.token = action.payload;
      axiosInstance.defaults.headers.common["Authorization"] = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isOwner = false;
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      toast.success("You have been logged out");
    },
    setIsOwner: (state, action) => {
      state.isOwner = action.payload;
    },

    // Car
    setCars: (state, action) => {
      state.cars = action.payload;
    },

    // UI
    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
    },
    setBookDate: (state, action) => {
      state.bookDate = action.payload;
    },
    setPurchaseDate: (state, action) => {
      state.purchaseDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isOwner = action.payload.role === "owner";
      })
      .addCase(fetchUser.rejected, (_, action) => {
        toast.error(action.payload);
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (_, action) => {
        toast.error(action.payload);
      });
  },
});

// Actions
export const {
  setToken,
  logout,
  setIsOwner,
  setCars,
  setShowLogin,
  setBookDate,
  setPurchaseDate,
} = appSlice.actions;

// Reducer
export default appSlice.reducer;

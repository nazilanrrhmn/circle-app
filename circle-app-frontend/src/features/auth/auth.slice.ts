import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiV1 } from "../../libs/api";
import { UserStoreDTO } from "./types/auth.dto";

export const getUserLogged = createAsyncThunk(
  "users/getUserLogged",
  async () => {
    const response = await apiV1.get<null, { data: UserStoreDTO }>("/user/me");
    return response.data;
  }
);

// const initialState: UserStoreDTO = {} as UserStoreDTO;

interface UserState {
  entities: UserStoreDTO;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  entities: {} as UserStoreDTO,
  loading: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStoreDTO>) => {
      state.entities = action.payload;
    },
    updateProfile: (
      state,
      action: PayloadAction<
        Pick<
          UserStoreDTO,
          "coverPhoto" | "profilePhoto" | "fullname" | "username" | "bio"
        >
      >
    ) => {
      state.entities = {
        ...state.entities,
        ...action.payload,
      };
    },
    plusFollow: (state) => {
      state.entities._count.followers = state.entities._count.followers + 1;
    },
    minFollow: (state) => {
      state.entities._count.followers = state.entities._count.followers - 1;
    },
    removeUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserLogged.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getUserLogged.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getUserLogged.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const { setUser, removeUser, updateProfile, plusFollow, minFollow } =
  authSlice.actions;
export default authSlice.reducer;

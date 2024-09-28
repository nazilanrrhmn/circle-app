import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

// Sesuaikan initialState dengan properti opsional atau berikan nilai default yang sesuai
const initialState: User = {} as User;

export const fetchUserLogged = createAsyncThunk(
  "users/fetchUserLogged",
  async () => {
    const response = await fetch(
      "https://63660b33046eddf1baf77f68.mockapi.io/api/v1/user"
    );
    return response.json();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    removeUser(state) {
      // Mengosongkan state dengan tetap mempertahankan struktur object yang sama
      state.id = 0;
      state.fullname = "";
      state.email = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogged.fulfilled, (state, action) => {
      // Memastikan payload sesuai dengan User atau melakukan parsing sesuai kebutuhan
      const fetchedUser = action.payload as User;
      state.id = fetchedUser.id;
      state.fullname = fetchedUser.fullname;
      state.email = fetchedUser.email;
      state.password = fetchedUser.password;
    });
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

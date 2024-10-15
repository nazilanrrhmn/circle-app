import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiV1 } from "../../libs/api";
import { UserStoreDTO } from "./types/auth.dto";

// Thunk untuk mendapatkan user yang sedang login
export const getUserLogged = createAsyncThunk(
  "auth/getUserLogged",
  async () => {
    const response = await apiV1.get<null, { data: UserStoreDTO }>("/user/me");
    return response.data;
  }
);

// Struktur state untuk user dan loading
interface UserState {
  entities: UserStoreDTO | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

// State awal
const initialState: UserState = {
  entities: null, // Menggunakan null untuk user yang belum login
  loading: "idle",
};

// Slice untuk auth
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
      // Memastikan bahwa state.user.id tetap ada
      if (state.entities && state.entities.id) {
        state.entities = {
          ...state.entities,
          ...action.payload,
          id: state.entities?.id ?? 0, // Pastikan id ada, jika tidak, berikan nilai default
        };
      }

      // Memperbarui profil user dengan properti baru
      // state.user = {
      //   ...state.user,
      //   ...action.payload,
      // };
    },
    removeUser: (state) => {
      // Mengatur kembali user ke state awal (logout)
      state.entities = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserLogged.fulfilled, (state, action) => {
      state.entities = action.payload; // Menyimpan data user saat sukses
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

// Export actions dan reducer
export const { setUser, removeUser, updateProfile } = authSlice.actions;
export default authSlice.reducer;

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { apiV1 } from "../../libs/api";
// import { UserStoreDTO } from "./types/auth.dto";

// export const getUserLogged = createAsyncThunk(
//   "users/getUserLogged",
//   async () => {
//     const response = await apiV1.get<null, { data: UserStoreDTO }>("/user/me");
//     return response.data;
//   }
// );

// interface UserState {
//   entities: UserStoreDTO;
//   loading: "idle" | "pending" | "succeeded" | "failed";
// }

// const initialState: UserState = {
//   entities: {} as UserStoreDTO,
//   loading: "idle",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<UserStoreDTO>) => {
//       state.entities = action.payload;
//     },
//     updateProfile: (
//       state,
//       action: PayloadAction<
//         Pick<
//           UserStoreDTO,
//           "coverPhoto" | "profilePhoto" | "fullname" | "username" | "bio"
//         >
//       >
//     ) => {
//       state.entities = {
//         ...state.entities,
//         ...action.payload,
//       };
//     },
//     removeUser() {
//       return initialState;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getUserLogged.fulfilled, (state, action) => {
//       state.entities = action.payload;
//       state.loading = "succeeded";
//     });
//     builder.addCase(getUserLogged.pending, (state) => {
//       state.loading = "pending";
//     });
//     builder.addCase(getUserLogged.rejected, (state) => {
//       state.loading = "failed";
//     });
//   },
// });

// export const { setUser, removeUser, updateProfile } = authSlice.actions;
// export default authSlice.reducer;

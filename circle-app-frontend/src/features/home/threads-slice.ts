import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiV1 } from "../../libs/api";
import { ThreadResponseDTO } from "./types/thread.dto";
import { ThreadEntity } from "../../entities/thread";
import { modalSlice } from "./modal-slice";

export const getAllThreads = createAsyncThunk(
  "threads/getAllThreads",
  async () => {
    const response = await apiV1.get<null, { data: ThreadResponseDTO }>(
      "/threads"
    );
    return response.data.data;
  }
);

interface ThreadState {
  entities: ThreadEntity[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ThreadState = {
  entities: [],
  loading: "idle",
};

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllThreads.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getAllThreads.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllThreads.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const {} = modalSlice.actions;
export default threadSlice.reducer;

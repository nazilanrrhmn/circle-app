import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiV1 } from "../../libs/api";
import { ThreadEntity } from "../../entities/thread";
import { ThreadDetailResponseDTO } from "./types/thread-detail.dto";

export const getDetailThreads = createAsyncThunk(
  "threadsDetail/getADetailThreads",
  async (threadId: number) => {
    const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
      `/threads/${threadId}`
    );
    return response.data.data;
  }
);

interface ThreadState {
  entities: ThreadEntity;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ThreadState = {
  entities: {} as ThreadEntity,
  loading: "idle",
};

const threadDetailSlice = createSlice({
  name: "threadsDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetailThreads.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getDetailThreads.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getDetailThreads.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const {} = threadDetailSlice.actions;
export default threadDetailSlice.reducer;

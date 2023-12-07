import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  videoDetails: null,
  error: null,
  status: "idle",
};

export const fetchVideoDetails = createAsyncThunk(
  "video/fetchVideoDetails",
  async (videoUrl, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://anchors-2mv7.onrender.com/api/getVideoDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log(data);
      return data.videoDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    resetVideoState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideoDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videoDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchVideoDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetVideoState } = videoSlice.actions;
export default videoSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activityList: [],
  },
  reducers: {},
})

export default activitySlice.reducer

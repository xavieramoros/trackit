import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    counterState: 'initial',
    count: null,
    endedTrackingList: [],
  },
  reducers: {
    trackingFinished (state, { payload }) {
      console.log('trackingFinished:', state)
      const { count, state: counterState } = payload;
      return {
        counterState,
        count: null,
        activityList: [...state.endedTrackingList]
      }
    },
    trackingStarted(state, { payload }) {
      console.log('trackingStarted: ', payload);
      const { state: counterState, count } = payload;
      return {
        counterState, count
      }
    },
    trackingPaused(state, { payload }) {
      const { state: counterState, count } = payload;
      console.log('trackingPaused: ', payload);
      return {
        counterState, count
      }

    },

  },
})

export const { trackingStarted, trackingPaused, trackingFinished } =
  activitySlice.actions

export default activitySlice.reducer

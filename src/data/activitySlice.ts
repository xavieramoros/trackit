import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    counterState: 'initial',
    count: 0,
    endedTrackingList: [],
  },
  reducers: {
    trackingFinished (state, { payload }) {
      const { count, state: counterState } = payload;
      return {
        ...state,
        counterState,
        count: null,
        activityList: [...state.endedTrackingList]
      }
    },
    trackingStarted(state, { payload }) {
      console.log('trackingStarted: ', payload);
      const { state: counterState, count } = payload;
      return {
        ...state,
        counterState,
        count
      }
    },
    trackingPaused(state, { payload }) {
      const { state: counterState, count } = payload;
      console.log('trackingPaused: ', payload);
      return {
        ...state,
        counterState,
        count
      }

    },

  },
})

export const { trackingStarted, trackingPaused, trackingFinished } =
  activitySlice.actions

export default activitySlice.reducer

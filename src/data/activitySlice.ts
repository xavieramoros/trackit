import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    counterState: 'initial',
    count: 0,
    startTimestamp: null,
    endedTrackingList: [],
  },
  reducers: {
    trackingFinished (state, { payload }) {
      const { count, counterState } = payload;
      return {
        ...state,
        counterState,
        count: null,
        startTimestamp: null,
        activityList: [...state.endedTrackingList, {
          startTimestamp: state.startTimestamp,
          endTimestamp: new Date(),
          count
        }]
      }
    },
    trackingStarted(state, { payload }) {
      const { count, counterState } = payload;
      return {
        ...state,
        startTimestamp: new Date().valueOf(),
        counterState,
        count
      }
    },
    trackingPaused(state, { payload }) {
      const { state: counterState, count } = payload;
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

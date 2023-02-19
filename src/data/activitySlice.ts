import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    counterState: 'initial',
    count: 0,
    startTimestamp: null,
    activityList: [],
  },
  reducers: {
    trackingFinished (state, { payload }) {
      const { count, counterState } = payload;
      return {
        ...state,
        counterState,
        count: null,
        startTimestamp: null,
        activityList: [...state.activityList, {
          id: state.startTimestamp,
          startTimestamp: state.startTimestamp,
          endTimestamp: new Date().valueOf(),
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
    deleteTracking (state, { payload }) {
      const { id: idToDelete } = payload;
      return {
        ...state,
        activityList: [...state.activityList.filter(({ id }) => id !== idToDelete)]
      }
    },
  },
})

export const { trackingStarted, trackingPaused, trackingFinished } =
  activitySlice.actions

export default activitySlice.reducer

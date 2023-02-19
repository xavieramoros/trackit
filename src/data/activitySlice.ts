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
      console.log('trackingFinished:', payload)
      const { count, state: counterState } = payload;
      return {
        ...state,
        counterState,
        count: null,
        startTimestamp: null,
        activityList: [...state.activityList, {
          id: `${state.startTimestamp}`,
          startTimestamp: state.startTimestamp,
          endTimestamp: new Date().valueOf(),
          count
        }]
      }
    },
    trackingStarted(state, { payload }) {
      console.log('trackingStarted:', payload)
      const { state: counterState } = payload;
      return {
        ...state,
        startTimestamp: new Date().valueOf(),
        counterState
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
    deleteTracking (state, { payload: idToDelete }) {
      return {
        ...state,
        activityList: [...state.activityList.filter(({ id }) => id !== idToDelete)]
      }
    },
  },
})

export const { trackingStarted, trackingPaused, trackingFinished, deleteTracking } =
  activitySlice.actions

export default activitySlice.reducer

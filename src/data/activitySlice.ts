import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ActivityType } from '@customTypes/activity';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    counterState: 'initial',
    count: 0,
    startTimestamp: null,
    activityList: [],
    latestActivity: null
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
        latestActivity: `${state.startTimestamp}`,
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
    addCategoryToLatestActivity( state, { payload: category }){
      const newList = state.activityList.map( (activity) => {
        console.log('activity:',activity);
          if( activity.id === state.latestActivity){
            return {
              ...activity,
              category
            }
          }else {
            return activity
          }
        })

        console.log('newLit:', newList)
      return {
        ...state,
        activityList: newList
      }
    }
  },
})

export const { trackingStarted, trackingPaused, trackingFinished, deleteTracking, addCategoryToLatestActivity } =
  activitySlice.actions

export default activitySlice.reducer

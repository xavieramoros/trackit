import { createSlice } from '@reduxjs/toolkit'
import { generateFakeActivity } from '@data/fakeActivityData';
import { ActivityType } from "@customTypes/activity";

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
      return {
        ...state,
        activityList: state.activityList.map( (activity): ActivityType => {
          if( activity.id === state.latestActivity){
            return {
              ...activity,
              category
            }
          }else {
            return activity
          }
        })
      }
    },
    addFakeActivityData(state){
      return {
        ...state,
        activityList: generateFakeActivity()
      }
    }
  },
})

export const { trackingStarted, trackingPaused, trackingFinished, deleteTracking, addCategoryToLatestActivity, addFakeActivityData } =
  activitySlice.actions

export default activitySlice.reducer

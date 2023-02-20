import { RootState } from '@data/store'

// activity
export const getCounterState = (state: RootState) => state.activity.counterState;
export const getCounterCount = (state: RootState) => state.activity.count;
export const getStartTimestamp = (state: RootState) => state.activity.startTimestamp;
export const getActivityList = (state: RootState) => state.activity.activityList;

// category
export const getCategories = (state: RootState) => state.category.categories;
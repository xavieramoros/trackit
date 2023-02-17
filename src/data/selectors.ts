import { RootState } from '@data/store'

export const getCounterState = (state: RootState) => state.activity.counterState;
export const getCounterCount = (state: RootState) => state.activity.count;
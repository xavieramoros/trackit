import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

import activityReducer from './activitySlice'
import categoryReducer from './categorySlice'

const activityConfig = {
  key: 'activity',
  storage: AsyncStorage
}

const categoryConfig = {
  key: 'category',
  storage: AsyncStorage
}

export const store = configureStore({
  reducer: {
    activity: persistReducer(activityConfig, activityReducer),
    category: persistReducer(categoryConfig, categoryReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store)

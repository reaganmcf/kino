import { configureStore } from '@reduxjs/toolkit'
import { kinoApi } from '../apis/kino'

export const store = configureStore({
  reducer: {
    [kinoApi.reducerPath]: kinoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      kinoApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

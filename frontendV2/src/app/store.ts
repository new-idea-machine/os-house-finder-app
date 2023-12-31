import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import { authApi } from '@api/auth/authApi';
import { houseApi } from '@api/house/houseApi';
import authSliceReducer from '@features/authSlice';
// import houseReducer from '@features/houseSlice';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [houseApi.reducerPath]: houseApi.reducer,
  auth: authSliceReducer,
  // house: houseReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(houseApi.middleware),
  devTools: true,
});

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export default store;

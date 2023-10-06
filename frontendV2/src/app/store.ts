import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
// import {apiSlice} from '@features/apiSlice';
import {authApi} from '@api/auth/authApi';
import authSliceReducer from '@features/authSlice';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});

// const rootReducer = combineReducers({
//   [apiSlice.reducerPath]: apiSlice.reducer,
//   auth: authSliceReducer,
// });
// const store=configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

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

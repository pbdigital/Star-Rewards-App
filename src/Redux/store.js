import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {childReducer} from './Child/ChildSlice';

const rootReducer = combineReducers({
  child: childReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

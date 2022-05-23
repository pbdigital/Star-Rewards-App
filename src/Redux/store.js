import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {childReducer} from './Child/ChildSlice';
import {userReducer} from './User/UserSlice';

const rootReducer = combineReducers({
  child: childReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

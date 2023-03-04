import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notes.slice';
import userReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { User } from '@/interfaces/user.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { reset } from './notes.slice';

interface UserOrNull {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserOrNull = {
  user: null,
  isLoggedIn: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserOrNull, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, (state, action) => {
      return initialState;
    });
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;

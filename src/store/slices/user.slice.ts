import { User } from '@/interfaces/user.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    clearUser: (state: UserOrNull) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;

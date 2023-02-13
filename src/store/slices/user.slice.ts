import { User } from '@/interfaces/user.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserOrNull {
  user: User | null;
}

const initialState: UserOrNull = {
  user: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserOrNull, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

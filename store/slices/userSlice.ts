import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../helper/types';

interface UserState {
  user?: User,
  token?: string,
}

const initialState: UserState = {
  user: undefined,
  token: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '', 
  },
  reducers: {
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { updateUserName } = userSlice.actions;
export default userSlice.reducer;

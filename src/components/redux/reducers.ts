import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  userList: User[];
}

const initialState: UserState = {
  userList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserList: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
    updateUserName: (
      state,
      action: PayloadAction<{email: string; newUserName: string}>,
    ) => {
      const {email, newUserName} = action.payload;
      state.userList = state.userList.map(user =>
        user.email === email ? {...user, userName: newUserName} : user,
      );
    },
  },
});

export const {updateUserList, updateUserName} = userSlice.actions;
export default userSlice.reducer;

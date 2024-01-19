import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../common/Interface';

interface UserState {
  userList: User[];
  loggedUser?: User;
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
    loginUser: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    },
  },
});

export const {updateUserList, updateUserName, loginUser} = userSlice.actions;
export default userSlice.reducer;

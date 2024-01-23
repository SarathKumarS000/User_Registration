import { useSelector } from 'react-redux';

export const selectUserList = (state) => state.user.userList;
export const selectIsLoggedIn = (state) => state.user.loggedUser;
export const selectUserByEmail = (email) => (state) => state.user.userList.find((u) => u.email === email);

export const useUserList = () => {
  return useSelector(selectUserList);
};

export const useIsLoggedIn = () => {
  return useSelector(selectIsLoggedIn);
};

export const useUserByEmail = (email) => {
  return useSelector(selectUserByEmail(email));
};
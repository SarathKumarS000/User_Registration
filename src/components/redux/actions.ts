export const updateUserName = (email: string, newUserName: string) => {
  return {
    type: 'user/updateUserName',
    payload: {
      email: email,
      newUserName: newUserName,
    },
  };
};

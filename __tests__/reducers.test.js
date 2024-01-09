import userReducer, {updateUserList, updateUserName} from '../src/components/redux/reducers';

describe('userReducer', () => {
  it('should update user list correctly', () => {
    const initialState = {userList: []};
    const action = updateUserList([{userName: 'test', email: 'test@test.com'}]);

    const newState = userReducer(initialState, action);

    expect(newState.userList).toHaveLength(1);
    expect(newState.userList[0].userName).toBe('test');
  });

  it('should update user name correctly', () => {
    const initialState = {
      userList: [{userName: 'oldUserName', email: 'test@test.com'}],
    };
    const action = updateUserName({
      email: 'test@test.com',
      newUserName: 'newUserName',
    });

    const newState = userReducer(initialState, action);

    expect(newState.userList[0].userName).toBe('newUserName');
  });
});

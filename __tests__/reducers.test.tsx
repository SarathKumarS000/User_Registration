import userReducer, {
  updateUserList,
  updateUserName,
} from '../src/components/redux/reducers';
import {User} from '../src/components/common/User';
interface UserState {
  userList: User[];
  loggedUser?: User;
}

describe('userReducer', () => {
  it('should update user list correctly', () => {
    const initialState: {userList: User[]} = {userList: []};
    const action = updateUserList([
      {
        userName: 'test',
        email: 'test@test.com',
        firstName: '',
        lastName: '',
        password: '',
      },
    ]);

    const newState = userReducer(initialState, action);

    expect(newState.userList).toHaveLength(1);
    expect(newState.userList[0].userName).toBe('test');
  });

  it('should update user name correctly', () => {
    const initialState: UserState = {
      userList: [
        {
          userName: 'oldUserName',
          email: 'test@test.com',
          firstName: '',
          lastName: '',
          password: '',
        },
      ],
    };
    const action = updateUserName({
      email: 'test@test.com',
      newUserName: 'newUserName',
    });

    const newState = userReducer(initialState, action);

    expect(newState.userList[0].userName).toBe('newUserName');
    expect(newState.userList[0].email).toBe('test@test.com');
  });
});

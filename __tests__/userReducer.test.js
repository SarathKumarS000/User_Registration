import reducer, { updateUserName } from '../src/components/redux/reducers';

test('should set user in the state', () => {
  const initialState = { userName: '' };
  const user = { id: 1, username: 'testUser' };

  const newState = reducer(initialState, updateUserName(user.username));

  expect(newState.userName).toEqual(user.username);
});

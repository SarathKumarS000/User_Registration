import {updateUserName} from '../src/components/redux/actions';

describe('updateUserName action creator', () => {
  it('should create the correct action', () => {
    const action = updateUserName('test@test.com', 'newUserName');

    expect(action.type).toBe('user/updateUserName');
    expect(action.payload).toEqual({
      email: 'test@test.com',
      newUserName: 'newUserName',
    });
  });
});

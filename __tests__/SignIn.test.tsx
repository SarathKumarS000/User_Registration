import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SignIn from '../src/components/pages/SignIn';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('SignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const {getByTestId} = render(<SignIn navigation={{}} />);
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
  });

  test('validates user input and shows error message for invalid credentials', async () => {
    const invalidMockUserData = [
      {
        email: 'test@example.com',
        password: 'invalidPassword',
        firstName: 'John',
        lastName: 'Doe',
        userName: 'johndoe',
      },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(invalidMockUserData),
    );

    const {getByTestId, getByText} = render(<SignIn navigation={{}} />);
    fireEvent.changeText(getByTestId('email'), 'invalid-email');
    fireEvent.changeText(getByTestId('password'), 'short');
    fireEvent.press(getByText('Log In'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid Credentials');
    });
  });

  test('successfully logs in with valid credentials', async () => {
    const mockUserData = [
      {
        email: 'sarath@gmail.com',
        password: 'password',
        firstName: 'Sarath',
        lastName: 'Kumar S',
        userName: 'sk12',
      },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockUserData),
    );
    const mockNavigate = jest.fn();
    const {getByTestId, getByText} = render(
      <SignIn navigation={{navigate: mockNavigate}} />,
    );
    fireEvent.changeText(getByTestId('email'), 'sarath@gmail.com');
    fireEvent.changeText(getByTestId('password'), 'password');
    fireEvent.press(getByText('Log In'));

    await waitFor(() => {
      // expect(Alert.alert).not.toHaveBeenCalled();
      // expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid Credentials');
      expect(mockNavigate).toHaveBeenCalledWith('Profile', {
        foundUser: mockUserData[0],
      });
    });
  });

  test('shows error message when no user data found', async () => {
    (
      AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>
    ).mockResolvedValueOnce(null);

    const {getByTestId, getByText} = render(<SignIn navigation={{}} />);
    fireEvent.changeText(getByTestId('email'), 'test@example.com');
    fireEvent.changeText(getByTestId('password'), 'password123');
    fireEvent.press(getByText('Log In'));

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('usersData');

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'No user data found');
    });
  });
});

import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SignUp from '../src/components/pages/SignUp';
import {Alert} from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('SignUp', () => {
  test('renders correctly', () => {
    const {getByTestId} = render(<SignUp navigation={undefined} />);

    expect(getByTestId('firstName')).toBeTruthy();
    expect(getByTestId('lastName')).toBeTruthy();
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('userName')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
    expect(getByTestId('confirmPassword')).toBeTruthy();
  });

  test('validates user input and shows error messages', async () => {
    const {getByTestId, getByText} = render(<SignUp navigation={undefined} />);

    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(getByText('First name is required')).toBeTruthy();
      expect(getByText('Last name is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Username is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm password is required')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('firstName'), 'J');
    fireEvent.changeText(getByTestId('lastName'), 'Doe');
    fireEvent.changeText(getByTestId('email'), 'invalid-email');
    fireEvent.changeText(getByTestId('userName'), 'u');
    fireEvent.changeText(getByTestId('password'), 'pass');
    fireEvent.changeText(getByTestId('confirmPassword'), 'password');

    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(getByText('Must be at least 2 characters')).toBeTruthy();
      expect(getByText('Invalid email address')).toBeTruthy();
      expect(getByText('Must be at least 4 characters')).toBeTruthy();
      expect(getByText('Must be at least 8 characters')).toBeTruthy();
      expect(getByText('Password doesnot match')).toBeTruthy();
    });
  });

  test('successfully registers a new user', async () => {
    const {getByTestId, getByText} = render(<SignUp navigation={undefined} />);

    fireEvent.changeText(getByTestId('firstName'), 'John');
    fireEvent.changeText(getByTestId('lastName'), 'Doe');
    fireEvent.changeText(getByTestId('email'), 'john.doe@example.com');
    fireEvent.changeText(getByTestId('userName'), 'johndoe');
    fireEvent.changeText(getByTestId('password'), 'password');
    fireEvent.changeText(getByTestId('confirmPassword'), 'password');

    fireEvent.press(getByText('Register'));

    await waitFor(() => {});
    expect(Alert.alert).toHaveBeenCalledWith(
      'Data stored successfully',
      expect.stringContaining('John'),
      expect.any(Array),
    );
  });
});

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

test('renders App component without crashing', () => {
  render(<App />);
});

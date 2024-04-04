import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import markAll from '../app/(home)/markAllStudents';

jest.mock('axios');

describe('<markAllStudents />', () => {
  it('renders without crashing', () => {
    render(<markAll />);
  });
});

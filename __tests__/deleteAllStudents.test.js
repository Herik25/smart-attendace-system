import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import deleteAllStudents from '../app/(home)/deleteAllAttendance';

jest.mock('axios');

describe('<deleteAllStudents />', () => {
  it('renders without crashing', () => {
    render(<deleteAllStudents />);
  });
});

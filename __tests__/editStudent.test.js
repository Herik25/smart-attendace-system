import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import editStudents from '../app/(home)/editStudent';

jest.mock('axios');

describe('<editStudents />', () => {
  it('renders without crashing', () => {
    render(<editStudents />);
  });
});

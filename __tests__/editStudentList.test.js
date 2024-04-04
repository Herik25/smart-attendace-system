import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import editStudentList from '../app/(home)/editStudentsList';

jest.mock('axios');

describe('<editStudentList />', () => {
  it('renders without crashing', () => {
    render(<editStudentList />);
  });
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import addStudents from '../app/(home)/addStudent';

jest.mock('axios');

describe('<addStudents />', () => {
  it('renders without crashing', () => {
    render(<addStudents />);
  });
});

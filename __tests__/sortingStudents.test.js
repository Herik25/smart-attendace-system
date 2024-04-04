import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import sortingStudents from '../app/(home)/sortingStudents'

describe('<sortingStudents />', () => {
  it('renders without crashing', () => {
    render(<sortingStudents />);
  });
});

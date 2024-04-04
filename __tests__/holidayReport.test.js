import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import holidayReports from '../app/(home)/holidayReports';

jest.mock('axios');

describe('<holidayReports />', () => {
  it('renders without crashing', () => {
    render(<holidayReports />);
  });
});

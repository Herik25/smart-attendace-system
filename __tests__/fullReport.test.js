import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import fullReport from '../app/(home)/fullReport';

jest.mock('axios');

describe('<fullReport />', () => {
  it('renders without crashing', () => {
    render(<fullReport />);
  });
});

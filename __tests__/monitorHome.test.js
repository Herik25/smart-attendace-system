import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import monitorHome from '../app/(home)/monitorHome';

jest.mock('axios');

describe('<monitorHome />', () => {
  it('renders without crashing', () => {
    render(<monitorHome />);
  });
});

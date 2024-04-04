import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import scanner from '../app/(home)/scanner'

describe('<scanner />', () => {
  it('renders without crashing', () => {
    render(<scanner />);
  });
});

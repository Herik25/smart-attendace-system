import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import studetns from '../app/(home)/students'

describe('<studetns />', () => {
  it('renders without crashing', () => {
    render(<studetns />);
  });
});

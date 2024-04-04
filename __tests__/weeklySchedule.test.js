import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import weeklySchedule from '../app/(home)/weeklySchedule'

describe('<weeklySchedule />', () => {
  it('renders without crashing', () => {
    render(<weeklySchedule />);
  });
});

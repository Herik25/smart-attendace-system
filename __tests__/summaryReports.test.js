import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import summaryReports from '../app/(home)/summaryReport'

describe('<scansummaryReportsner />', () => {
  it('renders without crashing', () => {
    render(<summaryReports />);
  });
});

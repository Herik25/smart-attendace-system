import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import studentInfo from '../app/(home)/studentInfo'

describe('<studentInfos />', () => {
  it('renders without crashing', () => {
    render(<studentInfos />);
  });
});

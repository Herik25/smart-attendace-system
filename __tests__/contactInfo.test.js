import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";
import contactInfo from "../app/(home)/contactInfo";

jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: jest.fn(),
}));

describe("<contactInfo />", () => {
  it("renders without crashing", () => {
    render(<contactInfo />);
  });
});

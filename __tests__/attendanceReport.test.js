import React from "react";
import { render } from "@testing-library/react-native";
import AttendanceReport from "../app/(home)/attendanceReport"; // Adjust the import path accordingly

describe("<AttendanceReport />", () => {
  it("renders without crashing", () => {
    render(<AttendanceReport />);
  });

  it("renders with mocked data", () => {
    const mockStudents = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      // Add more mock student data as needed
    ];

    const mockAttendance = [
      { studentId: 1, status: "Present" },
      { studentId: 2, status: "Absent" },
      // Add more mock attendance data as needed
    ];

    render(
      <AttendanceReport students={mockStudents} attendance={mockAttendance} />
    );
  });

  it("renders empty state when no data is provided", () => {
    render(<AttendanceReport students={[]} attendance={[]} />);
    // Add assertions to check for the presence of empty state elements
  });

  it('renders loading state while fetching data', () => {
    render(<AttendanceReport isLoading={true} />);
    // Add assertions to check for the presence of loading state elements
  });

});

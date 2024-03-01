import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import moment from "moment";
import DropdownComponent from "../../components/DropdownComponent";
import { FontAwesome } from "@expo/vector-icons";
import DropdownStatus from "../../components/DropdownStatus";
import { Button, Checkbox } from "react-native-paper";

const subjectList = [
  { label: "Flag Ceremony", value: "Flag Ceremony" },
  { label: "General Physics", value: "General Physics" },
  { label: "PE & Health", value: "PE & Health" },
  { label: "3I", value: "3I" },
  { label: "Entrepreneurship", value: "Entrepreneurship" },
  { label: "Contemporary Phil. Arts", value: "Contemporary Phil. Arts" },
  { label: "DRRR", value: "DRRR" },
  { label: "Capstone Research", value: "Capstone Research" },
  { label: "General Chemistry", value: "General Chemistry" },
  { label: "Flag Retreat", value: "Flag Retreat" },
];

const TimeList = [
  { label: "6:40AM - 7:40AM", value: "6:40AM - 7:40AM" },
  { label: "7:40AM - 8:40AM", value: "7:40AM - 8:40AM" },
  { label: "8:40AM - 9:40AM", value: "8:40AM - 9:40AM" },
  { label: "10:00AM - 11:00AM", value: "10:00AM - 11:00AM" },
  { label: "11:00AM - 12:00PM", value: "11:00AM - 12:00PM" },
  { label: "1:00PM - 2:00PM", value: "1:00PM - 2:00PM" },
  { label: "2:00PM - 3:00PM", value: "2:00PM - 3:00PM" },
  { label: "3:00PM - 4:00PM", value: "3:00PM - 4:00PM" },
  { label: "4:00PM - 5:00PM", value: "4:00PM - 5:00PM" },
];

const markAllStudents = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [subject, setSubject] = useState("Flag Ceremony");
  const [studentsWithAttendance, setStudentsWithAttendance] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [time, setTime] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        // my device's wife ip address: 192.168.0.102:8080
        // for pc ip address should be 10.0.2.2:8080
        const response = await axios.get("http://192.168.0.102:8080/students");
        setStudents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching student data", error);
      }
    };
    fetchStudentsData();
  }, []);
  const [attendance, setAttendance] = useState([]);
  const fetchAttendanceData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://192.168.0.102:8080/attendance`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(response.data);
      setFilteredStudents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error fetching attendance data", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate, subject]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://192.168.0.102:8080/attendance`,
          {
            params: {
              date: currentDate.format("MMMM D, YYYY"),
            },
          }
        );
        const attendanceData = response.data;

        setStudentsWithAttendance(attendanceData);
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching attendance data", error);
      }
    };

    fetchAttendanceData();
  }, [currentDate, students, subject]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        // my device's wife ip address: 192.168.0.102:8080
        // for pc ip address should be 10.0.2.2:8080
        setIsLoading(true);
        const response = await axios.get("http://192.168.0.102:8080/students");
        // console.log(response);
        setStudents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching students data", error);
      }
    };
    fetchStudentsData();
  }, []);
  //   console.log(students);

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortIcon, setSortIcon] = useState(false);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortIcon(true);
    setSortOrder(newSortOrder);
    // Sort students based on roll number and current sorting order
    const sortedStudents = studentsWithAttendance.sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.rollNo - b.rollNo; // Return the result of the comparison
      } else {
        return b.rollNo - a.rollNo; // Return the result of the comparison
      }
    });

    setFilteredStudents(sortedStudents); // Update state with sorted students
  };

  const [sortDetail, setSortDetail] = useState("asc");
  const [detailIcon, setDetailIcon] = useState(false);

  const handleDetailSort = () => {
    const newSortOrder = sortDetail === "asc" ? "desc" : "asc";
    setDetailIcon(true);
    setSortDetail(newSortOrder);
    // Sort students based on roll number and current sorting order
    const sortedStudents = studentsWithAttendance.sort((a, b) => {
      const nameA = a.studentName.toUpperCase(); // ignore upper and lowercase
      const nameB = b.studentName.toUpperCase(); // ignore upper and lowercase
      if (newSortOrder === "asc") {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      }
    });
    setStudentsWithAttendance(sortedStudents); // Update state with sorted students
  };

  const [checkedStudentsData, setCheckedStudentsData] = useState([]);
  const [checkedList, setCheckedList] = useState({});

  const toggleStudentCheckbox = (student) => {
    const isChecked = checkedList[student._id]; // Check if the student is already checked
    const updatedCheckedList = { ...checkedList, [student._id]: !isChecked }; // Toggle the checked status for the student

    // Filter the students based on the updatedCheckedList and update the state variable
    const checkedStudentsData = studentsWithAttendance.filter(
      (s) => updatedCheckedList[s._id]
    );

    setCheckedList(updatedCheckedList);
    setCheckedStudentsData(checkedStudentsData);
    console.log(checkedStudentsData);
  };

  const toggleSelectAll = () => {
    const updatedCheckedList = {};
    studentsWithAttendance.forEach((student) => {
      updatedCheckedList[student._id] = !selectAll; // Toggle the checked status for each student
    });

    const checkedStudentsData = selectAll ? [] : [...studentsWithAttendance];

    setSelectAll(!selectAll);
    setCheckedList(updatedCheckedList);
    setCheckedStudentsData(checkedStudentsData);
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    if (newSubject === "" || time === "") {
      Alert.alert(
        "Slection Error!!!",
        "Select any subject&time and try again!"
      );
      setOpen(false);
      setIsLoading(false);
      return;
    }
    try {
      for (const student of checkedStudentsData) {
        // Construct the attendance data for each student
        const attendanceData = {
          rollNo: student.rollNo,
          studentName: student.studentName,
          date: currentDate.format("MMMM D, YYYY"),
          status: "present", // Set the status as "present" for all students
          subject: newSubject, // Use the new subject if selected, otherwise use the current subject
          time: time,
        };

        // Send a POST request to submit the attendance for each student
        const response = await axios.post(
          "http://192.168.0.102:8080/attendance",
          attendanceData
        );

        if (response.status !== 200) {
          console.log(`Failed to mark attendance for ${student.studentName}`);
        }
      }

      // After marking attendance for all students, display a success message or perform any necessary actions
      console.log("Attendance marked for all students successfully!");
      setSubmitLoading(!submitLoading);
      setOpen(!open);
    } catch (error) {
      console.log("Error marking attendance for all students:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}>
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 5,
          }}
        >
          <AntDesign
            onPress={goToPrevDay}
            name="left"
            size={24}
            color="black"
          />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign
            onPress={goToNextDay}
            name="right"
            size={24}
            color="black"
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Pressable
              style={{
                width: 120,
                height: 35,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 8,
              }}
              onPress={toggleSelectAll}
            >
              <Text style={{ color: "black", fontSize: 14 }}>
                {selectAll ? "Deselect All" : "Select All"}
              </Text>
            </Pressable>
          </View>
        </View>

        <View>
          <DropdownComponent
            data={subjectList}
            isSubject={true}
            placeholder="Select Subject"
            state={subject}
            setState={setSubject}
          />
        </View>

        <View
          style={{ marginHorizontal: 10, transform: [{ translateY: -12 }] }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            }}
          >
            <Pressable
              onPress={handleSort}
              style={{
                width: 60,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
              >
                <Text
                  style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
                >
                  Roll No
                </Text>
                {sortIcon ? (
                  sortOrder === "asc" ? (
                    <FontAwesome name="sort-asc" size={14} color="black" />
                  ) : (
                    <FontAwesome name="sort-desc" size={14} color="black" />
                  )
                ) : (
                  <FontAwesome name="unsorted" size={14} color="black" />
                )}
              </View>
            </Pressable>
            <Pressable
              onPress={handleDetailSort}
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  Details
                </Text>
                {detailIcon ? (
                  sortDetail === "asc" ? (
                    <FontAwesome name="sort-asc" size={14} color="black" />
                  ) : (
                    <FontAwesome name="sort-desc" size={14} color="black" />
                  )
                ) : (
                  <FontAwesome name="unsorted" size={14} color="black" />
                )}
              </View>
            </Pressable>

            <Pressable
              style={{
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Status
              </Text>
            </Pressable>
          </Pressable>
        </View>

        <ScrollView style={{ marginHorizontal: 12 }}>
          {isLoading ? (
            <View
              style={{
                minHeight: "60%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            studentsWithAttendance
              .filter(
                (item) => item.subject === subject && item.status === "present"
              ) // filter the students with status
              .sort((a, b) => a.rollNo - b.rollNo) // sort the students according to the roll no
              .map((item, index) => (
                <View
                  // onPress={() =>
                  //   router.push({
                  //     pathname: "/[user]",
                  //     params: {
                  //       data: `${item.rollNo}&${item.studentName}`,
                  //     },
                  //   })
                  // }
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginVertical: 6,
                    paddingBottom: 10,
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 1,
                  }}
                >
                  <Checkbox
                    color="black"
                    status={checkedList[item._id] ? "checked" : "unchecked"}
                    onPress={() => toggleStudentCheckbox(item)}
                  />

                  <View
                    style={{
                      width: 10,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      transform: [{ translateX: -6 }],
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.rollNo}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                      padding: 10,
                      backgroundColor: "black",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.studentName?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {item?.studentName}
                    </Text>
                    <Text style={{ marginTop: 5, color: "gray" }}>
                      Class: {item?.studentClass}
                    </Text>
                  </View>
                  {item?.status && (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        padding: 10,
                        backgroundColor: `${
                          item.status === "absent" ? "red" : "green"
                        }`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {item.status.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
              ))
          )}
        </ScrollView>
      </Pressable>
      <Pressable
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          alignItems: "center",
        }}
        onPress={() => setOpen(!open)}
      >
        <View
          style={{
            backgroundColor: "black",
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Mark All</Text>
        </View>
      </Pressable>
      {open && (
        <View style={styles.overlay}>
          <View style={styles.dropdownContainer}>
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Select Subjet & Time For All Students
              </Text>
            </View>
            <DropdownComponent
              data={subjectList}
              isSubject={true}
              placeholder="Select Subject"
              state={newSubject}
              setState={setNewSubject}
            />
            <DropdownComponent
              data={TimeList}
              isSubject={false}
              placeholder={"Select Time"}
              state={time}
              setState={setTime}
            />
            <View style={{ flexDirection: "row", gap: 20, marginVertical: 14 }}>
              <Pressable style={{ flex: 1 }} onPress={() => setOpen(!open)}>
                <View
                  style={{
                    backgroundColor: "black",
                    paddingHorizontal: 24,
                    paddingVertical: 14,
                    borderRadius: 25,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>Cancle</Text>
                </View>
              </Pressable>
              <Pressable style={{ flex: 1 }} onPress={handleSubmit}>
                <View
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 24,
                    paddingVertical: 14,
                    borderRadius: 25,
                    alignItems: "center",
                    borderColor: "black",
                    borderWidth: 2,
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                  >
                    {submitLoading ? <ActivityIndicator size="small" color="black"  /> : "Submit" }
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default markAllStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  markAllText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // justifyContent: "center",
    // alignItems: "center",
  },
  closeButton: {},
  dropdownContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "100%",
    minHeight: 280,
  },
});

import {
  ActivityIndicator,
  Pressable,
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

const statusList = [
  { label: "All", value: "all" },
  { label: "Present", value: "present" },
  { label: "absent", value: "absent" },
  { label: "Half Day", value: "halfday" },
];

const sortingStudents = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [subject, setSubject] = useState("Flag Ceremony");
  const [studentsWithAttendance, setStudentsWithAttendance] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await axios.get(`http://192.168.0.102:8080/attendance`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.log("error fetching attendance data", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
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
      } catch (error) {
        console.log("error fetching attendance data", error);
      }
    };

    fetchAttendanceData();
  }, [currentDate, students]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        // my device's wife ip address: 192.168.0.102:8080
        // for pc ip address should be 10.0.2.2:8080
        const response = await axios.get("http://192.168.0.102:8080/students");
        // console.log(response);
        setStudents(response.data);
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

  useEffect(() => {
    const filterStudentsByStatus = () => {
      let filteredStudents = [];
      if (status === "all") {
        filteredStudents = studentsWithAttendance;
      } else {
        filteredStudents = studentsWithAttendance.filter(
          (student) => student.status === status
        );
      }
      setFilteredStudents(filteredStudents);
    };

    filterStudentsByStatus();
  }, [status, studentsWithAttendance]);

  // Use filteredStudents instead of studentsWithAttendance for rendering

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
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

        <View style={{ marginHorizontal: 4, transform: [{ translateY: -12 }] }}>
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

            {/* <Pressable
                onPress={handlePresent}
              style={{
                width: 60,
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
            </Pressable> */}
            <View style={{ flex: 1 }}>
              <DropdownStatus
                data={statusList}
                placeholder="Status"
                isSubject={true}
                state={status}
                setState={setStatus}
              />
            </View>
          </Pressable>
        </View>

        <View style={{ marginHorizontal: 12 }}>
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
            filteredStudents
              .filter((item) => {
                if (subject == "") {
                  return item;
                } else {
                  return item.subject === subject;
                }
              }) // filter the students with status
              // .sort((a, b) => a.rollNo - b.rollNo) // sort the students according to the roll no
              .map((item, index) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/[user]",
                      params: {
                        data: `${item.rollNo}&${item.studentName}`,
                      },
                    })
                  }
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
                  <View
                    style={{
                      width: 40,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 20,
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
                    <Text style={{ color: "white", fontSize: 16 }}>
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
                </Pressable>
              ))
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default sortingStudents;

const styles = StyleSheet.create({});

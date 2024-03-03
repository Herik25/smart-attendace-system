import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import axios from "axios";
import moment from "moment";
import SearchResults from "../../components/SearchResults";
import DropdownComponent from "../../components/DropdownComponent";

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

const guardianAttendanceReport = () => {
  const router = useRouter();
  const navigation = useNavigation()
  const [currentDate, setCurrentDate] = useState(moment());
  const [subject, setSubject] = useState("");
  const params = useLocalSearchParams();
  console.log(params);
  const [selectedChild, setSelectedChild] = useState("");
  const [rollNo, setRollNo] = useState(0);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.selectedChild !== "") {
        setSelectedChild(params.selectedChild);
        // console.log(selectedChild);
        const data = selectedChild.split("&");
        setRollNo(+data[0]);
      }
    }
  }, [params]);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.selectedChild === "") {
        Alert.alert(
          "Select Children!",
          "please, select any children before seeing any data!"
        );
        navigation.navigate("guardianHome")
      }
    }
  }, []);

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
    } catch (error) {
      console.log("error fetching attendance data", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  const studentsWithAttendace = students.map((student) => {
    const attendanceRecord = attendance.find((record) => {
      return record.rollNo === student.rollNo;
    });

    return {
      ...student,
      status: attendanceRecord ? attendanceRecord.status : "",
      subject: attendanceRecord ? attendanceRecord.subject : "", // 'Not Marked' or a default status
    };
  });

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

  const updatedStudents = students.map((student) => {
    const attendanceRecord = attendance.find((record) => {
      return record.rollNo === student.rollNo && record.subject === subject;
    });

    return {
      ...student,
      status: attendanceRecord ? attendanceRecord.status : "",
    };
  });
    // console.log(students);

  // // Find the index of the student with the specified roll number
  const rollNoIndex = updatedStudents.findIndex(
    (student) => +student.rollNo === rollNo
  );
  // If the student is found, move them to the beginning of the array
  if (rollNoIndex !== -1) {
    const studentToMove = updatedStudents.splice(rollNoIndex, 1)[0];
    updatedStudents.unshift(studentToMove);
  }

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
            <View
              style={{
                width: 60,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
              >
                Roll No
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>Details</Text>
            </View>

            <View
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
            </View>
          </Pressable>
        </View>

        <View>
          {updatedStudents.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                minHeight: "65%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 8,
                  marginHorizontal: 12,
                }}
              >
                No Data Available!!
              </Text>
              <Text style={{ fontSize: 20 }}>Select Any Subject</Text>
            </View>
          ) : (
            updatedStudents.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginVertical: 6,
                  paddingBottom: 10,
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                  marginHorizontal: rollNo === +item.rollNo ? 0 : 12,
                  paddingHorizontal: rollNo === +item.rollNo && 12,
                  paddingTop: rollNo === +item.rollNo ? 10 : 0,
                  backgroundColor: rollNo === +item.rollNo && "#ccc",
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
                    style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
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

export default guardianAttendanceReport;

const styles = StyleSheet.create({});

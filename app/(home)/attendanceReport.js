import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import moment from "moment";
import SearchResults from "../../components/SearchResults";

const attendanceReport = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [input, setInput] = useState("");

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
    const attendanceRecord = attendance.find(
      (record) => record.rollNo === student.rollNo
    );

    return {
      ...student,
      status: attendanceRecord ? attendanceRecord.status : "", // 'Not Marked' or a default status
    };
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // my device's wife ip address: 192.168.0.102:8080
        // for pc ip address should be 10.0.2.2:8080
        const response = await axios.get("http://192.168.0.102:8080/students");
        // console.log(response);
        setStudents(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);
  //   console.log(students);
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

        <View style={{ marginHorizontal: 12 }}>
          {studentsWithAttendace.map((item, index) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/[user]",
                  params: {
                    name: item.studentName,
                    id: item.rollNo,
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
                borderBottomColor: '#ccc',
                borderBottomWidth: 1
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4b6cb7",
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
                  {item?.studentClass}th (Roll No: {item?.rollNo})
                </Text>
              </View>
              {item?.status && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: `${item.status === 'absent' ? 'red' : 'green'}`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    {item.status.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
};

export default attendanceReport;

const styles = StyleSheet.create({});

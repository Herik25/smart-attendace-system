import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocalSearchParams, useLocation, useNavigation, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import DropdownComponent from "../../components/DropdownComponent";

const subjectList = [
  { label: "Flaag Ceremony", value: "Flag Ceremony" },
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
  { label: '6:40AM - 7:40AM', value: '6:40AM - 7:40AM' },
  { label: '7:40AM - 8:40AM', value: '7:40AM - 8:40AM' },
  { label: '8:40AM - 9:40AM', value: '8:40AM - 9:40AM' },
  { label: '10:00AM - 11:00AM', value: '10:00AM - 11:00AM' },
  { label: '11:00AM - 12:00PM', value: '11:00AM - 12:00PM' },
  { label: '1:00PM - 2:00PM', value: '1:00PM - 2:00PM' },
  { label: '2:00PM - 3:00PM', value: '2:00PM - 3:00PM' },
  { label: '3:00PM - 4:00PM', value: '3:00PM - 4:00PM' },
  { label: '4:00PM - 5:00PM', value: '4:00PM - 5:00PM' }
]

const User = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [subject, setSubject] = useState("")
  const [time, setTime] = useState("")
  const [isSubject, setIsSubject] = useState(false)

  const params = useLocalSearchParams();
  const navigation = useNavigation()

  const goToNextDay = () => {
    const nextDay = moment(currentDate).add(1, "days");
    setCurrentDate(nextDay);
  };

  const goToPreviousDay = () => {
    const previousDay = moment(currentDate).subtract(1, "days");
    setCurrentDate(previousDay);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  // formar of QR CODE encoding : 1&harsh parmar
  console.log(params);
  const data = params.data.split("&");
  const id = data[0];
  const name = data[1];
  const attendanceData = {
    rollNo: id,
    studentName: name,
    date: currentDate.format("MMMM D, YYYY"),
    status: attendanceStatus,
    subject: subject,
    time: time
  };

  const submitAttendance = async () => {
    try {
      console.log(attendanceData);
      // my device's wifi ip address: 192.168.0.102:8080
      // for pc ip address should be 10.0.2.2:8080
      const response = await axios.post(
        "http://192.168.0.102:8080/attendance",
        attendanceData
      );

      if (response.status === 200) {
        Alert.alert(
          "Attendance Submited!",
          `Attendance Submitted Successfully! for ${name}`
        );

        navigation.navigate("monitorHome")
      }
    } catch (error) {
      console.log("error submitting attendance : ", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          onPress={goToPreviousDay}
          name="left"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>

      <Pressable
        style={{
          marginVertical: 10,
          marginHorizontal: 12,
          flexDirection: "row",
          gap: 10,
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
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ marginTop: 5, color: "gray" }}>roll no: {id}</Text>
        </View>
      </Pressable>
      {/* <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 12 }}>
        School Name: 
      </Text> */}
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 3,
            marginTop: 7,
          }}
        >
          ATTENDANCE
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <Pressable
            onPress={() => setAttendanceStatus("present")}
            style={{
              backgroundColor: "#c4e0e5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "present" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>present</Text>
          </Pressable>
          <Pressable
            onPress={() => setAttendanceStatus("absent")}
            style={{
              backgroundColor: "#c4e0e5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "absent" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Absent</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <Pressable
            onPress={() => setAttendanceStatus("halfday")}
            style={{
              backgroundColor: "#c4e0e5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "halfday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Half Day</Text>
          </Pressable>
          <Pressable
            onPress={() => setAttendanceStatus("holiday")}
            style={{
              backgroundColor: "#c4e0e5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "holiday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Holiday</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View style={{ width: '100%' }}>
            <DropdownComponent data={subjectList} isSubject={true} placeholder={"Select Subject"} state={subject} setState={setSubject} />
          </View>
          <View style={{ width: '100%' }}>
            <DropdownComponent data={TimeList} isSubject={false} placeholder={"Select Time"} state={time} setState={setTime} />
          </View>
        </View>
        <Pressable
          onPress={submitAttendance}
          style={{
            padding: 15,
            backgroundColor: "#00c6ff",
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 6,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: 500 }}
          >
            Submit Attendance
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});

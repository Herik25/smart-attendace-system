import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import DropdownComponent from "../../components/DropdownComponent";
import moment from "moment";

const classData = [
  { label: "1st", value: "1st" },
  { label: "2nd", value: "2nd" },
  { label: "3rd", value: "3rd" },
  { label: "4th", value: "4th" },
  { label: "sth", value: "5th" },
  { label: "6th", value: "6th" },
  { label: "7th", value: "7th" },
  { label: "8th", value: "8th" },
  { label: "9th", value: "9th" },
  { label: "10th", value: "10th" },
  { label: "11th", value: "11th" },
  { label: "12th", value: "12th" },
];

const editStudent = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [rollNo, setRollNo] = useState(0);
  const [student, setStudent] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [guardianEmail, setguardianEmail] = useState("");

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.rollNo !== "") {
        setRollNo(+params.rollNo);
        //   console.log(rollNo);
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
        navigation.navigate("guardianHome");
      }
    }
  }, []);

  useEffect(() => {
    // Fetch the student data based on the roll number
    if (rollNo !== 0) {
      axios
        .get(`http://192.168.0.102:8080/students/${rollNo}`)
        .then((response) => {
          const studentData = response.data;
          setStudent(studentData);
          setName(studentData.studentName);
          const formattedDob = moment(studentData.dateOfBirth).toDate();
          setDob(formattedDob);
          setGender(studentData.gender);
          setAddress(studentData.address);
          setMobileNo(studentData.phoneNumber);
          setStudentClass(studentData.studentClass);
          setguardianEmail(studentData.guardianEmail);
        })
        .catch((error) => {
          console.log("Error fetching student:", error);
        });
    }
  }, [rollNo]);

  let updatedDob = "";
  if (dob) {
    updatedDob = moment(dob.date).format("YYYY-MM-DD");
  }

  const handleEdit = () => {
    const updatedStudent = {
      studentName: name,
      dateOfBirth: moment(dob).format("YYYY-MM-DD"),
      gender,
      address,
      phoneNumber: mobileNo,
      studentClass,
      guardianEmail,
    };

    axios
      .put(`http://192.168.0.102:8080/students/${rollNo}`, updatedStudent)
      .then((response) => {
        // console.log("Student updated successfully:", response.data);
        Alert.alert("updated!!", "Student updated successfully!");
        navigation.navigate("editStudentsList");
        // Handle any UI updates or navigation after successful update
      })
      .catch((error) => {
        console.log("Error updating student:", error);
        // Handle error scenarios, such as displaying an error message to the user
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Edit Student</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Full Name (First and last Name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Full Name"
            placeholderTextColor={"black"}
          />
        </View>

        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold", flex: 0.5 }}>
            Gender
          </Text>
          {/* <TextInput
            value={gender}
            onChangeText={(text) => setGender(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="gender"
            placeholderTextColor={"black"}
          /> */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingHorizontal: 30,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="male"
                color="black"
                status={gender === "male" ? "checked" : "unchecked"}
                onPress={() => setGender("male")}
              />
              <Text>Male</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="female"
                color="black"
                status={gender === "female" ? "checked" : "unchecked"}
                onPress={() => setGender("female")}
              />
              <Text>Female</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Mobile Number
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 13,
                backgroundColor: "#ddd",
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>+63</Text>
            </View>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                flex: 1,
              }}
              placeholder="Mobile No"
              placeholderTextColor={"black"}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>
            Date of Birth
          </Text>
          <DatePickerInput
            style={{
              backgroundColor: "white",
              borderTopColor: "#ccc",
              borderTopWidth: 1,
              borderLeftColor: "#ccc",
              borderLeftWidth: 1,
              borderRightColor: "#ccc",
              borderRightWidth: 1,
            }}
            endYear={2024}
            locale="en"
            label="Birthdate"
            value={dob}
            onChange={(d) => setDob(d)}
            inputMode="start"
            animationType="slide"
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              transform: [{ translateY: 10 }],
            }}
          >
            Student Class
          </Text>
          <DropdownComponent
            placeholder="Select Class"
            data={classData}
            isSubject={true}
            state={studentClass}
            setState={setStudentClass}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Guardian Email
          </Text>
          <TextInput
            value={guardianEmail}
            onChangeText={(text) => setguardianEmail(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Guardian Email"
            placeholderTextColor={"black"}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Address"
            placeholderTextColor={"black"}
          />
        </View>

        <Pressable
          onPress={handleEdit}
          style={{
            backgroundColor: "black",
            paddingVertical: 14,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            Confirm
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default editStudent;

const styles = StyleSheet.create({});

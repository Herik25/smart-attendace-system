import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Button, RadioButton } from "react-native-paper";
import moment from "moment";
import { DatePickerInput } from "react-native-paper-dates";
import DropdownComponent from "../../components/DropdownComponent";

const classData = [
    { label: '1st', value: '1st' },
    { label: '2nd', value: '2nd' },
    { label: '3rd', value: '3rd' },
    { label: '4th', value: '4th' },
    { label: 'sth', value: '5th' },
    { label: '6th', value: '6th' },
    { label: '7th', value: '7th' },
    { label: '8th', value: '8th' },
    { label: '9th', value: '9th' },
    { label: '10th', value: '10th' },
    { label: '11th', value: '11th' },
    { label: '12th', value: '12th' },
  ];

const adddetails = () => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(undefined);
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [guardianName, setGuardianName] = useState("");
  
  let updatedDob = '';
  if (dob) {
    updatedDob = moment(dob.date).format("YYYY-MM-DD");
  }

  const handleRegister = () => {
    const studentData = {
      rollNo: rollNo,
      studentName: name,
      dateOfBirth: updatedDob,
      gender: gender,
      address,
      address,
      phoneNumber: mobileNo,
      studentClass: studentClass,
      guardianName: guardianName,
    };
    // console.log(studentData);
    // my device's wife ip address: 192.168.0.102:8080
    // for pc ip address should be 10.0.2.2:8080
    axios
      .post("http://192.168.0.102:8080/addStudent", studentData)
      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        setName("");
        setRollNo("");
        setDob("");
        setGender("");
        setMobileNo("");
        setAddress("");
        setStudentClass("");
        setGuardianName("");
        updatedDob = '';
      })
      .catch((error) => {
        Alert.alert(
          "Registration Fail",
          "An error occurred during registration"
        );
        console.log("register failed", error);
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
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Add a New Student
          </Text>
        </View>
      <View style={{ padding: 10 }}>

        <View style={{ marginVertical: 10 }}>
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

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Roll No</Text>
          <TextInput
            value={rollNo}
            onChangeText={(text) => setRollNo(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Roll no."
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
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>
            Date of Birth
          </Text>
          {/* <TextInput
            value={dob}
            onChangeText={(text) => setDob(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Date of Birth"
            placeholderTextColor={"black"}
          /> */}
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
          <Text style={{ fontSize: 17, fontWeight: "bold", transform: [{ translateY: 10 }] }}>
            Student Class
          </Text>
          <DropdownComponent placeholder="Select Class" data={classData} isSubject={true} state={studentClass} setState={setStudentClass} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Guardian Name
          </Text>
          <TextInput
            value={guardianName}
            onChangeText={(text) => setGuardianName(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Guardian Name"
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
          onPress={handleRegister}
          style={{
            backgroundColor: "black",
            paddingVertical: 14,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white",fontSize: 16 }}>
            Add Student
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default adddetails;

const styles = StyleSheet.create({});

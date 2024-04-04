import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Button, RadioButton } from "react-native-paper";
import moment from "moment";
import { DatePickerInput } from "react-native-paper-dates";
import DropdownComponent from "../../components/DropdownComponent";

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

const addStudents = () => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(undefined);
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [guardianEmail, setguardianEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let updatedDob = "";
  if (dob) {
    updatedDob = moment(dob.date).format("YYYY-MM-DD");
  }

  const handleRegister = () => {
    setIsLoading(true);
    const studentData = {
      rollNo: rollNo,
      studentName: name,
      dateOfBirth: updatedDob,
      gender: gender,
      address,
      phoneNumber: mobileNo,
      studentClass: studentClass,
      guardianEmail: guardianEmail.toLowerCase(),
    };
    // console.log(studentData);
    // my device's wife ip address: 192.168.0.101:8080
    // for pc ip address should be 10.0.2.2:8080
    axios
      .post("http://192.168.0.101:8080/addStudent", studentData)
      .then((response) => {
        setIsLoading(false);
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
        setguardianEmail("");
        updatedDob = "";
      })
      .catch((error) => {
        setIsLoading(false);
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
            <View style={{ transform: [{ translateY: -0.5 }] }}>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}>*</Text>
            </View>
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
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Roll No
            <View>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}> *</Text>
            </View>
          </Text>
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
            keyboardType="numeric"
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
            <View>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}> *</Text>
            </View>
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
            <View>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}> *</Text>
            </View>
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
            <View>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}> *</Text>
            </View>
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
            <View style={{ transform: [{ translateY: -0.5 },{ translateY: 10 }] }}>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}> *</Text>
            </View>
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
            <View style={{ transform: [{ translateY: -0.5 }] }}>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}> *</Text>
            </View>
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
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Address
            <View>
              <Text style={{ fontSize: 14, color: "#B71C1C" }}> *</Text>
            </View>
          </Text>
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
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Add Student"
            )}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default addStudents;

const styles = StyleSheet.create({});

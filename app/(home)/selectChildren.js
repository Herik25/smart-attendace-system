import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import DropdownComponent from "../../components/DropdownComponent";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

const SelectChildren = () => {
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

  const router = useRouter();
  const params = useLocalSearchParams();

  const [students, setstudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null); // State to store the selected class
  const [selectedChild, setSelectedChild] = useState(null); // State to store the selected child/student
  console.log("selected child: ",selectedChild);
  const [guardianEmail, setGuardianEmail] = useState("");

  const handleSelectChild = (name) => {
    setSelectedChild(name);
  };

  const filterStudentsByClass = (className) => {
    return students.filter((student) => student.studentClass === className);
  };

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        // my device's wife ip address: 192.168.0.102:8080
        // for pc ip address should be 10.0.2.2:8080
        const response = await axios.get("http://192.168.0.102:8080/students");
        // console.log(response);
        setstudents(response.data);
      } catch (error) {
        console.log("error fetching students data", error);
      }
    };
    fetchStudentsData();
  }, []);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.selectedChild !== "") {
        setGuardianEmail(params?.guardianEmail);
        console.log("guardian: ",guardianEmail);
      }
    }
  }, [params]);

  const studentOptions = selectedClass
    ? filterStudentsByClass(selectedClass).map((student) => ({
        label: student.studentName,
        value: `${student.rollNo}&${student.studentName}&${student.guardianEmail}`,
      }))
    : [];

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Select Children
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <DropdownComponent
            placeholder="Select Class"
            data={classData}
            isSubject={true}
            state={selectedClass}
            setState={setSelectedClass}
          />
        </View>
        {selectedClass && (
          <View
            style={{
              marginBottom: 10,
              borderColor: "#ccc",
              borderWidth: 2,
              borderRadius: 6,
              padding: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#aaa", fontWeight: "bold" }}>
              Selected Class: {selectedClass}
            </Text>
          </View>
        )}
        {selectedClass && (
          <View style={{ marginBottom: 20 }}>
            <DropdownComponent
              placeholder="Select Child/Student"
              data={studentOptions}
              isSubject={true}
              state={selectedChild}
              setState={handleSelectChild}
            />
          </View>
        )}
        {selectedChild && (
          <View
            style={{
              marginBottom: 10,
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              padding: 12,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Selected Child: {selectedChild.split("&")[1]}
            </Text>
          </View>
        )}
        {selectedChild && (
          <Pressable
            style={{
              backgroundColor: "black",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => {
              const selectedGuardianEmail = selectedChild.split("&")[2];
              if (selectedGuardianEmail !== guardianEmail) {
                Alert.alert(
                  "Error!","Please select a child associated with your account."
                );
              } else {
                router.push({
                  pathname: "/guardianHome",
                  params: { selectedChild },
                });
              }
            }}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}
            >
              Continue
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SelectChildren;

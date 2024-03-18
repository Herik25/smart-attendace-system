import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import QRCode from "react-native-qrcode-svg";

const studentInfo = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [selectedChild, setSelectedChild] = useState("");
  const [rollNo, setRollNo] = useState(0);
  const [name, setName] = useState("");
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  qrCodeData = `${student.rollNo}&${student.studentName}`;

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.selectedChild !== "") {
        setSelectedChild(params.selectedChild);
        // console.log(selectedChild);
        const data = selectedChild.split("&");
        setRollNo(+data[0]);
        setName(data[1]);
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
    const fetchStudentsData = async () => {
      try {
        // my device's wife ip address: 192.168.0.101:8080
        // for pc ip address should be 10.0.2.2:8080
        if (rollNo !== 0) {
          const response = await axios.get(
            `http://192.168.0.101:8080/students/${rollNo}`
          );
          setStudent(response.data);
          setLoading(false);
        }
        // console.log(response);
      } catch (error) {
        console.log("error fetching students data", error);
      }
    };
    fetchStudentsData();
  }, [rollNo, name]);

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 10,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Student Info</Text>
      </View>
      {loading ? (
        <View style={{ height: "100%", alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ padding: 10, marginVertical: 15 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            {student.gender === "Female" ? (
              <Image
                style={{
                  height: 140,
                  width: 140,
                  backgroundColor: "white",
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: "black",
                  resizeMode: "contain",
                }}
                source={{
                  uri: "https://th.bing.com/th/id/OIP.6liK7l1h-XY0PQCANMcPuAHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain",
                }}
              ></Image>
            ) : (
              <Image
                style={{
                  height: 140,
                  width: 140,
                  backgroundColor: "white",
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: "black",
                  resizeMode: "contain",
                }}
                source={{
                  uri: "https://www.savingourkidsworld.org/wp-content/uploads/2021/04/business-male-icon.jpg",
                }}
              ></Image>
            )}
            <View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 14,
                }}
              >
                <QRCode value={qrCodeData} size={120} />
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 20, paddingHorizontal: 6 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 6,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRightColor: "black",
                  borderRightWidth: 1,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    paddingVertical: 10,
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                    backgroundColor: "black",
                    borderBottomWidth: 1,
                    borderTopLeftRadius: 6,
                    width: "99.90%",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Title
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Id</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Roll No.</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Name</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Gender</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Standard</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Ph No.</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Guardian Email</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>DOB</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>Address</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>School</Text>
                </View>
              </View>

              <View style={{ minHeight: 360, flex: 1 }}>
                <View
                  style={{
                    paddingVertical: 10,
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                    backgroundColor: "black",
                    borderBottomWidth: 1,
                    borderTopRightRadius: 6,
                    marginLeft: 0.5,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Details
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text style={{ fontSize: 11 }}>{student._id}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{student.rollNo}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{student.studentName}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{student.gender}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{student.studentClass}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>+63 {student.phoneNumber}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{student.guardianEmail}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{student.dateOfBirth}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{student.address}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    Prosperidad National High School
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default studentInfo;

const styles = StyleSheet.create({});

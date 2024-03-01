import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";

const guardianSummary = () => {
  const navigation = useNavigation()
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const totalSubjects = 200;
  const params = useLocalSearchParams();
  const [selectedChild, setSelectedChild] = useState("");
  const [rollNo, setRollNo] = useState(0);
  const [name, setName] = useState("");

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
        navigation.navigate("guardianHome")
      }
    }
  }, []);

  const goToNextMont = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPreviousMonth = () => {
    const previousMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(previousMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const fetchAttendanceReport = async () => {
    try {
      // my device's wifi ip address: 192.168.0.102:8080
      // for pc ip address should be 10.0.2.2:8080
      if (rollNo !== 0 && name !== "") {
        const response = await axios.get(
          "http://192.168.0.102:8080/attendance-report-single-student",
          {
            params: {
              rollNo: rollNo,
              name: name,
              month: currentDate.format("M"),
              year: currentDate.format("YYYY"),
            },
          }
        );
        setAttendanceData(response.data.report);
      }
    } catch (error) {
      console.log("Error fetching attandance: ", error);
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate, name, rollNo]);
  //   console.log(attendanceData);

  const calculatePercentage = (present, totalSubjects) => {
    return (present / totalSubjects) * 100;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
            onPress={goToPreviousMonth}
            name="left"
            size={24}
            color="black"
          />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign
            onPress={goToNextMont}
            name="right"
            size={24}
            color="black"
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
              </View>
            </Pressable>
            <Pressable
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
          </Pressable>
        </View>

        <View style={{ marginHorizontal: 12 }}>
          {attendanceData.map((item, index) => {
            const percentage = calculatePercentage(item.present, totalSubjects);
            return (
              <View
                key={index}
                style={{
                  marginVertical: 6,
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        padding: 10,
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
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {item?.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        {item?.name}
                      </Text>
                      <Text style={{ marginTop: 5, color: "gray" }}>
                        Class: {item?.className}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      backgroundColor: "white",
                      borderColor: "black",
                      borderWidth: 2,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Monthly
                      </Text>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {percentage}%
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    margin: 5,
                    backgroundColor: "#f1f1f1",
                    borderRadius: 5,
                  }}
                >
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title
                        style={{
                          justifyContent: "center",
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                        }}
                      >
                        Presents
                      </DataTable.Title>
                      <DataTable.Title
                        style={{
                          justifyContent: "center",
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                        }}
                      >
                        Absents
                      </DataTable.Title>
                      <DataTable.Title
                        style={{
                          justifyContent: "center",
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                        }}
                      >
                        HalfDay
                      </DataTable.Title>
                      <DataTable.Title
                        style={{
                          justifyContent: "center",
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                        }}
                      >
                        HoliyDay
                      </DataTable.Title>
                      <DataTable.Title style={{ justifyContent: "center" }}>
                        N/W
                      </DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                      <DataTable.Cell
                        style={{
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                          justifyContent: "center",
                        }}
                      >
                        {item?.present}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                          justifyContent: "center",
                        }}
                      >
                        {item?.absent}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                          justifyContent: "center",
                        }}
                      >
                        {item?.halfday}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{
                          borderRightWidth: 1,
                          borderRightColor: "#DBDADC",
                          justifyContent: "center",
                        }}
                      >
                        {item?.holiday ? item?.holiday : 0}
                      </DataTable.Cell>
                      <DataTable.Cell style={{ justifyContent: "center" }}>
                        8
                      </DataTable.Cell>
                    </DataTable.Row>
                  </DataTable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignItems: "center",
          padding: 12,
          borderColor: "black",
          borderWidth: 2,
          borderTopStartRadius: 18,
          borderTopEndRadius: 18,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>
          Total Attendance : {totalSubjects}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', marginVertical: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000', padding: 8, paddingHorizontal: 14, borderRadius: 12 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>Per Day</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 4 }}>10</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000', padding: 8, paddingHorizontal: 10, borderRadius: 12 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>Per Week</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 4 }}>50</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000', padding: 8, borderRadius: 12 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>Per Month</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 4 }}>200</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default guardianSummary;

const styles = StyleSheet.create({});

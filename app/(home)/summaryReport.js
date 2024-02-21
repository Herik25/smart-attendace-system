import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

const summaryReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

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
      const response = await axios.get(
        "http://192.168.0.102:8080/attendance-report-all-students",
        {
          params: {
            month: 2,
            year: 2024,
          },
        }
      );
      setAttendanceData(response.data.report);
    } catch (error) {
      console.log("Error fetching attandance: ", error);
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, []);

//   console.log(attendanceData);

  return (
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

      <View style={{ marginHorizontal: 12 }}>
        {attendanceData.map((item, index) => {
          return (
            <View key={index} style={{ marginVertical: 6, borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
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
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                  >
                    {item?.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item?.className}th (Roll No: {item?.rollNo})
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 15,
                  margin: 5,
                  backgroundColor: "#a1ffce",
                  borderRadius: 5,
                }}
              >
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={{justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#DBDADC' }}>Presents</DataTable.Title>
                    <DataTable.Title style={{justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#DBDADC' }}>Absents</DataTable.Title>
                    <DataTable.Title style={{justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#DBDADC' }}>HalfDay</DataTable.Title>
                    <DataTable.Title style={{justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#DBDADC' }}>HoliyDay</DataTable.Title>
                    <DataTable.Title style={{justifyContent: 'center'}}>N/W</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell style={{  borderRightWidth: 1, borderRightColor: '#DBDADC', justifyContent: 'center' }}>{item?.present}</DataTable.Cell>
                    <DataTable.Cell style={{  borderRightWidth: 1, borderRightColor: '#DBDADC', justifyContent: 'center' }}>{item?.absent}</DataTable.Cell>
                    <DataTable.Cell style={{  borderRightWidth: 1, borderRightColor: '#DBDADC', justifyContent: 'center' }}>{item?.halfday}</DataTable.Cell>
                    <DataTable.Cell style={{  borderRightWidth: 1, borderRightColor: '#DBDADC', justifyContent: 'center' }}>4</DataTable.Cell>
                    <DataTable.Cell style={{  justifyContent: 'center' }}>8</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default summaryReport;

const styles = StyleSheet.create({});

import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

const summaryReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const [totalHolidays, setTotalHolidays] = useState(0);
  let totalSubjects = 200;

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
      // my device's wifi ip address: 192.168.0.101:8080
      // for pc ip address should be 10.0.2.2:8080
      const response = await axios.get(
        "http://192.168.0.101:8080/attendance-report-all-students",
        {
          params: {
            month: currentDate.format("M"),
            year: currentDate.format("YYYY"),
          },
        }
      );
      setAttendanceData(response.data.report);
    } catch (error) {
      console.log("Error fetching attandance: ", error);
    }
  };

  const fetchTotalHolidays = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.101:8080/holiday-reports?month=${currentDate.format(
          "M"
        )}&year=${currentDate.format("YYYY")}`
      );
      const holidays = response.data.holidays.length;
      setTotalHolidays(holidays);
    } catch (error) {
      console.log("Error fetching total holidays: ", error);
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
    fetchTotalHolidays();
  }, [currentDate]);
  //   console.log(attendanceData);

  const calculatePercentage = (present, totalSubjects) => {
    const percentage = (present / totalSubjects) * 100;
    return percentage.toFixed(0);
  };

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
          const percentage = calculatePercentage(item.present, totalSubjects - totalHolidays);
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
                      {item?.className} (Roll No: {item?.rollNo})
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
  );
};

export default summaryReport;

const styles = StyleSheet.create({});

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
import { useLocalSearchParams, useNavigation } from "expo-router";
import moment from "moment";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

const fullReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const [currentWeekStart, setCurrentWeekStart] = useState("");
  const [currentWeekEnd, setCurrentWeekEnd] = useState("");
  const [today, setToday] = useState("");
  let totalSubjects = 200;
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [selectedChild, setSelectedChild] = useState("");
  const [rollNo, setRollNo] = useState(0);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalHolidays, setTotalHolidays] = useState(0);

  const data = [
    {
      name: "Present",
      attendance: parseInt(attendanceData[0]?.present) || 0,
      color: "#7CB342",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Absent",
      attendance: parseInt(attendanceData[0]?.absent) || 0,
      color: "#D32F2F",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Halfday",
      attendance: parseInt(attendanceData[0]?.halfday) || 0,
      color: "#1565C0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Holiday",
      attendance:
        parseInt(attendanceData[0]?.holiday + totalHolidays) || totalHolidays,
      color: "#FF8F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Sat-Sun day",
      attendance: 8,
      color: "#757575",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

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

  const fetchAttendanceReport = async () => {
    try {
      // my device's wifi ip address: 192.168.0.101:8080
      // for pc ip address should be 10.0.2.2:8080
      if (rollNo !== 0 && name !== "") {
        const response = await axios.get(
          "http://192.168.0.101:8080/attendance-report-single-student",
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
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching attandance: ", error);
    }
  };

  const fetchAllAttendance = async () => {
    try {
      // my device's wifi ip address: 192.168.0.101:8080
      // for pc ip address should be 10.0.2.2:8080
      if (rollNo !== 0 && name !== "") {
        setIsLoading(true);
        const response = await axios.get(
          `http://192.168.0.101:8080/attendance/${rollNo}`
        );
        setAllAttendance(response.data);
        setIsLoading(false);
      }
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
    fetchAllAttendance();
    fetchTotalHolidays();
  }, [currentDate, name, rollNo]);
  // console.log("all:",allAttendance);

  const calculatePercentage = (present, totalSubjects) => {
    const percentage = (present / totalSubjects) * 100;
    return percentage.toFixed(2);
  };

  const calculateWeeklyAttendance = () => {
    // Get the start and end dates for the current week
    const startDateOfWeek = moment().startOf("week");
    const endDateOfWeek = moment().endOf("week");

    // Filter the attendance data for the current week and count the "present" status
    const totalWeeklyAttendance = allAttendance
      .filter((item) =>
        moment(item.date, "MMMM DD, YYYY").isBetween(
          startDateOfWeek,
          endDateOfWeek,
          null,
          "[]"
        )
      )
      .reduce((total, item) => {
        return item.status === "present" ? total + 1 : total;
      }, 0);

    return totalWeeklyAttendance;
  };

  const calculateTodayAttendance = () => {
    // Get today's date
    const today = moment().format("MMMM D, YYYY");

    // Filter the attendance data for today and count the "present" status
    const totalTodayAttendance = allAttendance.filter(
      (item) => item.date === today && item.status === "present"
    ).length;

    return totalTodayAttendance;
  };

  useEffect(() => {
    const startDateOfWeek = moment().startOf("week");
    const endDateOfWeek = moment().endOf("week");

    setToday(moment().format("MMM DD/ YYYY"));

    setCurrentWeekStart(startDateOfWeek.format("DD/MMM"));
    setCurrentWeekEnd(endDateOfWeek.format("DD/MMM"));
  }, []);

  const totalWeeklyAttendance = calculateWeeklyAttendance();
  const totalTodayAttendance = calculateTodayAttendance();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Full Report</Text>
      </View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            marginTop: 120,
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View>
          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Pie Chart
            </Text>
            <PieChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              accessor={"attendance"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 10]}
              absolute
            />
          </View>
          <View>
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: "black",
                    borderRadius: 14,
                    maxHeight: 115,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderBottomColor: "black",
                      borderBottomWidth: 2,
                      textAlign: "center",
                    }}
                  >
                    Monthly
                  </Text>
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      textAlign: "center",
                    }}
                  >
                    {/* 0.5% */}
                    {calculatePercentage(
                      attendanceData[0]?.present,
                      totalSubjects - totalHolidays
                    )}
                    %
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 6,
                    flexDirection: "row",
                    flex: 1,
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
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        width: "201%",
                        backgroundColor: "black",
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Total Attendance
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
                      <Text>Daily</Text>
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
                      <Text style={{ textAlign: "center" }}>Weekly</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center" }}>Monthly</Text>
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text> </Text>
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
                      <Text>10</Text>
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
                      <Text style={{ textAlign: "center" }}>50</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center" }}>200</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 20,
                gap: 20,
                alignItems: "center",
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: 14,
                  maxHeight: 115,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                    textAlign: "center",
                  }}
                >
                  Weekly
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    textAlign: "center",
                  }}
                >
                  {(totalWeeklyAttendance / 50) * 100}%
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 6,
                  flexDirection: "row",
                  flex: 1,
                  maxHeight: 85,
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
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                      width: "201%",
                      backgroundColor: "black",
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {currentWeekStart} - {currentWeekEnd}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <Text>Mon-Fri</Text>
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text> </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <Text>{totalWeeklyAttendance}/50</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 20,
                gap: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: 14,
                  maxHeight: 115,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                    textAlign: "center",
                  }}
                >
                  Daily
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    textAlign: "center",
                  }}
                >
                  {(totalTodayAttendance / 10) * 100}%
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 6,
                  flexDirection: "row",
                  flex: 1,
                  maxHeight: 85,
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
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                      width: "201%",
                      backgroundColor: "black",
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {today}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <Text>Today</Text>
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text> </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <Text>{totalTodayAttendance}/10</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default fullReport;

const styles = StyleSheet.create({});

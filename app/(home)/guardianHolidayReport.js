import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { DatePickerInput } from "react-native-paper-dates";
import moment from "moment";

const guardianHolidayReport = () => {
  const [holidayReports, setHolidayReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(moment());
  const [totalHolidays, setTotalHolidays] = useState(0);

  const currentMonth = moment().month();
  const currentYear = moment().year();

  const fetchHolidayReports = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.102:8080/holiday-reports?month=${
          currentMonth + 1
        }&year=${currentYear}`
      );
      if (Array.isArray(response.data.holidays)) {
        setHolidayReports(response.data.holidays);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching holiday reports:", error);
    }
  };

  const fetchTotalHolidays = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.102:8080/holiday-reports?month=${currentDate.format(
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
    fetchHolidayReports();
    fetchTotalHolidays();
  }, []);

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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          No Class Reports
        </Text>
      </View>

      <View style={{ padding: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
          Total ({totalHolidays})
        </Text>
        {isLoading ? (
          <View
            style={{
              marginTop: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          holidayReports.map((holiday, index) => {
            const [year, month, day] = holiday.date.split("-");
            const weekday = moment(holiday.date, "YYYY-M-D").format("ddd");
            const monthName = moment(month, "MM").format("MMM");
            const shortYear = moment(year, "YYYY").format("YY");

            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "row", gap: 15 }}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "black",
                      borderRadius: 14,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        paddingHorizontal: 16,
                        paddingVertical: 2,
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                        textAlign: "center",
                      }}
                    >
                      {weekday}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        textAlign: "center",
                      }}
                    >
                      {day}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginVertical: 2,
                      }}
                    >
                      {holiday.name}
                    </Text>
                    <Text>{holiday.detail}</Text>
                  </View>
                </View>
                <View style={{ marginRight: 10 }}>
                  <Text>
                    {monthName}-{shortYear}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default guardianHolidayReport;

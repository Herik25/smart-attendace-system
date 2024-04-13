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

const HolidayReports = () => {
  const [holidayReports, setHolidayReports] = useState([]);
  const [newHolidayDate, setNewHolidayDate] = useState(undefined);
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDetail, setNewHolidayDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const currentMonth = moment().month();
  const currentYear = moment().year();

  let updatedDate = "";
  if (newHolidayDate) {
    updatedDate = moment(newHolidayDate).format("YYYY-M-D");
  }

  useEffect(() => {
    fetchHolidayReports();
  }, []);

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

  const handleAddHoliday = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://192.168.0.102:8080/holidays", {
        date: updatedDate,
        name: newHolidayName,
        detail: newHolidayDetail,
      });
      if (response.status === 201) {
        fetchHolidayReports(); // Refresh holiday reports after adding a new holiday
        Alert.alert("Successful!", "Holiday Added Successfully!");
        updatedDate = "";
        setNewHolidayDate(undefined);
        setNewHolidayDetail("");
        setNewHolidayName("");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding holiday:", error);
    }
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          No Class Reports
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          paddingBottom: 20,
          marginBottom: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 15,
            marginTop: 10,
          }}
        >
          Add No Class
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
            marginBottom: 10,
            fontSize: 14,
            // height: 40,
          }}
          endYear={2024}
          locale="en"
          label="No Class"
          value={newHolidayDate}
          onChange={(d) => setNewHolidayDate(d)}
          inputMode="start"
          animationType="slide"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "#ccc",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            fontSize: 14,
          }}
          placeholder="Name"
          value={newHolidayName}
          onChangeText={setNewHolidayName}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "#ccc",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            fontSize: 14,
          }}
          placeholder="Detail"
          value={newHolidayDetail}
          onChangeText={setNewHolidayDetail}
        />
        <Pressable
          onPress={handleAddHoliday}
          style={{
            backgroundColor: "black",
            paddingVertical: 10,
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            ADD No Class
          </Text>
        </Pressable>
      </View>
      <View style={{ padding: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
          No Class Report
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

export default HolidayReports;

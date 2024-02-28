import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DropdownComponent from "../../components/DropdownComponent";

const WeeklySchedule = () => {
  // Example schedule data for each day
  const [day, setDay] = useState("Monday");

  const week = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
  ];

  const time = {
    Monday: [
      "06:40 AM - 07:40 AM",
      "07:40 AM - 08:40 AM",
      "08:40 AM - 09:40 AM",
      "09:40 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 NN",
      "12:00 NM - 12:50 PM",
      "12:50 AM - 01:00 PM",
      "01:00 PM - 02:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
    ],
    Tuesday: [
      "07:40 AM - 08:40 AM",
      "08:40 AM - 09:40 AM",
      "09:40 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 NN",
      "12:00 NM - 12:50 PM",
      "12:50 AM - 01:00 PM",
      "01:00 PM - 02:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
    ],
    Wednesday: [
      "07:40 AM - 08:40 AM",
      "08:40 AM - 09:40 AM",
      "09:40 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 NN",
      "12:00 NM - 12:50 PM",
      "12:50 AM - 01:00 PM",
      "01:00 PM - 02:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
    ],
    Thursday: [
      "07:40 AM - 08:40 AM",
      "08:40 AM - 09:40 AM",
      "09:40 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 NN",
      "12:00 NM - 12:50 PM",
      "12:50 AM - 01:00 PM",
      "01:00 PM - 02:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
    ],
    Friday: [
      "07:40 AM - 08:40 AM",
      "08:40 AM - 09:40 AM",
      "09:40 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 NN",
      "12:00 NM - 12:50 PM",
      "12:50 AM - 01:00 PM",
      "01:00 PM - 02:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "04:00 PM - 04:30 PM",
    ],
  };
  subjects = {
    Monday: [
      "Flag Ceremony",
      "PE & Health",
      "3I",
      "MORNING SNACKS BREAK",
      "Entrepreneurship",
      "DRRR",
      "LUNCH",
      "DROP EVERYTHING AND READ (DEAR)",
      "Capstone Research",
      "-----",
      "General Chemistry 2",
    ],
    Tuesday: [
      "General Physics 2",
      "3I",
      "MORNING SNACKS BREAK",
      "Contemporary Phil.",
      "DRRR",
      "LUNCH",
      "DROP EVERYTHING AND READ (DEAR)",
      "Capstone Research",
      "Entrepreneurship",
      "General Chemistry 2",
    ],
    Wednesday: [
      "PE & Health 4",
      "3I",
      "MORNING SNACKS BREAK",
      "Contemporary Phil.",
      "DRRR",
      "LUNCH",
      "DROP EVERYTHING AND READ (DEAR)",
      "Capstone Research",
      "Entrepreneurship",
      "General Chemistry 2",
    ],
    Thursday: [
      "General Physics 2",
      "3I",
      "MORNING SNACKS BREAK",
      "Contemporary Phil.",
      "DRRR",
      "LUNCH",
      "DROP EVERYTHING AND READ (DEAR)",
      "Capstone Research",
      "Entrepreneurship",
      "General Chemistry 2",
    ],
    Friday: [
      "General Physics 2",
      "-----",
      "MORNING SNACKS BREAK",
      "Contemporary Phil.",
      "-----",
      "LUNCH",
      "DROP EVERYTHING AND READ (DEAR)",
      "-----",
      "-----",
      "-----",
      "Flag Retreat",
    ],
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Weekly Schedule
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>G12-MIJENO(STEM)</Text>
        <View style={{ transform: [{translateY: -12 }]}}>
          <DropdownComponent
            isSubject={true}
            state={day}
            setState={setDay}
            data={week}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 16,
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
                borderTopLeftRadius: 14,
                width: "99.90%",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Subjects
              </Text>
            </View>
            {subjects[day].map((item, index) => {
              if (
                item === "MORNING SNACKS BREAK" ||
                item === "LUNCH" ||
                item === "DROP EVERYTHING AND READ (DEAR)"
              ) {
                return (
                  <View
                  key={index}
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                      width: "200%",
                      backgroundColor: "white",
                    }}
                  >
                    <Text>{item}</Text>
                    {item === "MORNING SNACKS BREAK" && (
                      <Text>09:40 AM - 10:00 AM</Text>
                    )}
                    {item === "LUNCH" && <Text>12:00 PM - 12:50 PM</Text>}
                    {item === "DROP EVERYTHING AND READ (DEAR)" && (
                      <Text>12:50 PM - 01:00 PM</Text>
                    )}
                  </View>
                );
              } else {
                return (
                  <View
                    key={index}
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomColor:
                        index === subjects[day].length - 1 ? "" : "black",
                      borderBottomWidth:
                        index === subjects[day].length - 1 ? 0 : 1,
                    }}
                  >
                    <Text>{item}</Text>
                  </View>
                );
              }
            })}
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
                borderTopRightRadius: 14,
                marginLeft: 0.5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Time</Text>
            </View>

            {time[day].map((item, index) => {
              if (
                item === "09:40 AM - 10:00 AM" ||
                item === "12:00 NM - 12:50 PM" ||
                item === "12:50 AM - 01:00 PM"
              ) {
                return (
                  <View
                  key={index}
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                    }}
                  >
                    <Text> </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={index}
                    style={{
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomColor:
                        index === subjects[day].length - 1 ? "" : "black",
                      borderBottomWidth:
                        index === subjects[day].length - 1 ? 0 : 1,
                    }}
                  >
                    <Text>{item}</Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
      <View style={{ marginVertical: 10, paddingHorizontal: 16, alignItems: 'flex-end' }}>
        <Text style={{ fontWeight: "bold"}}>- Mrs. Shila B. Villaruel</Text>
      </View>
      </View>
    </View>
  );
};

export default WeeklySchedule;

const styles = StyleSheet.create({});

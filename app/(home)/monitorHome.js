import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useCallback, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SplashScreen, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { FontAwesome6 } from "@expo/vector-icons";

const monitorHome = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={["#f1f1f1", "#f1f1f1"]} style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 4,
            backgroundColor: "white",
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        >
          <Pressable onPress={() => router.push("editStudentsList")}>
            <MaterialIcons name="edit-note" size={28} color="black" />
          </Pressable>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "black",
            }}
          >
            Tambong
          </Text>
          <Entypo name="lock" size={20} color="black" />
        </View>
        <View style={{ paddingHorizontal: 12 }}>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Pressable
              onPress={() => router.push("students")}
              style={{
                // backgroundColor: "#CCCDE3",
                backgroundColor: "white",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "black",
                borderWidth: 2,
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                  borderWidth: 2,
                }}
              >
                <Ionicons name="people-sharp" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Student List
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("scanner")}
              style={{
                // backgroundColor: "#CCCDE3",
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: 2,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                  borderWidth: 2,
                }}
              >
                <MaterialIcons name="qr-code-scanner" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Mark Attendance
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 7,
              borderColor: "black",
              borderWidth: 2,
            }}
          >
            <Pressable
              onPress={() => router.push("attendanceReport")}
              style={{
                // backgroundColor: "#D5CCE3",
                backgroundColor: "black",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="newspaper-outline" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  flex: 1,
                  color: "white",
                }}
              >
                Attendance Report
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.push("summaryReport")}
              style={{
                backgroundColor: "black",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Octicons name="repo-pull" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  flex: 1,
                  color: "white",
                }}
              >
                Summary Report
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
            onPress={() => router.push("holidayReports")}
              style={{
                backgroundColor: "black",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Octicons name="report" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  flex: 1,
                  color: "white",
                }}
              >
                All Holoday Reports
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.push("addStudent")}
              style={{
                backgroundColor: "#000",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="adduser" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  flex: 1,
                  color: "white",
                }}
              >
                Add Students
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Pressable
              onPress={() => router.push("sortingStudents")}
              style={{
                backgroundColor: "white",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: 2,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome6 name="sort" size={24} color="white" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Students Sorting
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("markAllStudents")}
              style={{
                backgroundColor: "white",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: 2,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color="white"
                />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Mark All Students
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 14,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Pressable
              onPress={() => router.push("deleteStudent")}
              style={{
                // backgroundColor: "#D0C0EA",
                backgroundColor: "white",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: 2,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="white"
                />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Delete Student
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("deleteAllAttendance")}
              style={{
                backgroundColor: "white",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: 2,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="delete" size={24} color="white" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Delete All Attendance
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({});

export default monitorHome;

import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SplashScreen, useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const guardianHome = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedChild, setSelectedChild] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.selectedChild !== undefined) {
        setSelectedChild(params?.selectedChild);
      }
      setGuardianEmail(params?.email);
      // console.log(guardianEmail);
    }
  }, [params]);

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
          <Feather name="bar-chart" size={22} color="black" />
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
              onPress={() => router.push("guardianStudentsList")}
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
              onPress={() =>
                router.push({
                  pathname: "/selectChildren",
                  params: { guardianEmail },
                })
              }
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
                <FontAwesome5 name="address-card" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Select Children
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
              onPress={() =>
                router.push({
                  pathname: "/guardianAttendanceReport",
                  params: { selectedChild: selectedChild },
                })
              }
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
              onPress={() =>
                router.push({
                  pathname: "/guardianSummary",
                  params: { selectedChild },
                })
              }
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
              onPress={() => {
                router.push("guardianHolidayReport");
              }}
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
                All Holiday Reports
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
              onPress={() =>
                router.push({
                  pathname: "/editGuardian",
                  params: { guardianEmail },
                })
              }
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
                <FontAwesome5 name="user-edit" size={24} color="black" />
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
                Update Profile
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
              onPress={() =>
                router.push({
                  pathname: "/fullReport",
                  params: { selectedChild },
                })
              }
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
                <FontAwesome name="pie-chart" size={20} color="white" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Full Report
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/studentInfo",
                  params: { selectedChild },
                })
              }
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
                <Entypo name="info-with-circle" size={20} color="white" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Student Info
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
              onPress={() => router.push("weeklySchedule")}
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
                <MaterialIcons name="schedule" size={24} color="white" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Weekly Schedule
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("contactInfo")}
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
                <FontAwesome5 name="school" size={20} color="white" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "bold" }}>
                Contact Info
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({});

export default guardianHome;

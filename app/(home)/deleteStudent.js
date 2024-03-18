import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import axios from "axios";
import SearchResults from "../../components/SearchResults";
import { MaterialIcons } from "@expo/vector-icons";

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.get("http://192.168.0.101:8080/students");
        setStudents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching student data", error);
      }
    };
    fetchStudentsData();
  }, [students]);

  const deleteStudent = async (studentId) => {
    try {
      // Delete student from students collection
      await axios.delete(`http://192.168.0.101:8080/students/${studentId}`);

      Alert.alert("Deleted Succefully!", "Student deleted successfully");
    } catch (error) {
      console.log("error deleting student", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={() => router.back("monitorHome")}>
          <Ionicons
            style={{ marginLeft: 10 }}
            name="arrow-back"
            size={24}
            color="black"
          />
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            height: 40,
            borderRadius: 4,
            flex: 1,
          }}
        >
          <AntDesign name="search1" size={20} color="black" />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />
          {students.length > 0 && (
            <View>
              <Pressable>
                <AntDesign name="pluscircle" size={24} color="black" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
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
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>
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
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
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
        <Pressable
          style={{
            marginRight: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Delete
            </Text>
          </View>
        </Pressable>
      </Pressable>
      {isLoading ? (
        <View
          style={{
            minHeight: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : students.length > 0 ? (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <FlatList
            data={students.sort((a, b) => a.rollNo - b.rollNo)}
            renderItem={({ item }) => {
              if (
                item?.studentName.toLowerCase().includes(input.toLowerCase())
              ) {
                return (
                  <View
                    style={{
                      marginVertical: 5,
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginVertical: 5,
                        gap: 10,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 50,
                          borderRadius: 8,
                          padding: 10,
                          backgroundColor: "white",
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
                          {item?.studentName?.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          {item?.studentName}
                        </Text>
                        <Text style={{ marginTop: 5, color: "gray" }}>
                          Standard: {item?.studentClass}
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => deleteStudent(item.rollNo)}
                      style={{
                        backgroundColor: "white",
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        borderColor: "black",
                        borderWidth: 2,
                      }}
                    >
                      <MaterialIcons name="delete" size={26} color="black" />
                    </Pressable>
                  </View>
                );
              }
            }}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Data</Text>
          <Text>Press on Plus button to add a student</Text>
          <Pressable onPress={() => router.push("addStudent")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default DeleteStudent;

const styles = StyleSheet.create({});

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import SearchResults from "../../components/SearchResults";

const students = () => {
  const [students, setstudents] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // my device's wife ip address: 192.168.0.102:8080
        // for pc ip address should be 10.0.2.2:8080
        const response = await axios.get("http://192.168.0.102:8080/students");
        // console.log(response);
        setstudents(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);
//   console.log(students);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.push("monitorHome")}
        />
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
      {students.length > 0 ? (
        <SearchResults data={students} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Data</Text>
          <Text>Press on Plus button to add an employee</Text>
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

export default students;

const styles = StyleSheet.create({});

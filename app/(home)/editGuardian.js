import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import moment from "moment";

const editGuardian = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(true)

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.email !== "") {
        setGuardianEmail(params.guardianEmail);
      }
    }
  }, [params]);

  useEffect(() => {
    // Fetch guardian data based on the email
    if (guardianEmail !== "") {
      axios
        .get(`http://192.168.0.102:8080/guardians/${guardianEmail}`)
        .then((response) => {
          const guardianData = response.data;
          setGuardianName(guardianData.fullName);
          setAddress(guardianData.address);
          setMobileNo(guardianData.phoneNumber);
        })
        .catch((error) => {
          console.log("Error fetching guardian:", error);
        });
      setIsLoading(false);
    }
  }, [guardianEmail]);

  const handleEdit = () => {
    setSubmitLoading(true)
    const updatedGuardian = {
      guardianName: guardianName,
      address: address,
      mobileNo: mobileNo,
    };

    axios
      .put(
        `http://192.168.0.102:8080/guardians/${guardianEmail}`,
        updatedGuardian
      )
      .then((response) => {
        Alert.alert("Success", "Guardian updated successfully!");
        navigation.navigate("guardianHome");
      })
      .catch((error) => {
        console.log("Error updating guardian:", error);
        Alert.alert("Error", "Failed to update guardian.");
      });
      setSubmitLoading(false)
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
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Update Guardian
        </Text>
      </View>
      {isLoading ? (
        <View
          style={{
            marginTop: 120,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ padding: 10 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Guardian Name
            </Text>
            <TextInput
              value={guardianName}
              onChangeText={(text) => setGuardianName(text)}
              style={styles.input}
              placeholder="Guardian Name"
              placeholderTextColor="black"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="black"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Mobile Number
            </Text>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="black"
            />
          </View>

          <Pressable onPress={handleEdit} style={styles.button}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
              { submitLoading ? "Update Guardian" : <ActivityIndicator size="large" color="white" />}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 14,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default editGuardian;

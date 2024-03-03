import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "expo-router";

const AddGuardian = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGuardian = () => {
    setIsLoading(true);
    const guardianData = {
      email,
      fullName,
      phoneNumber,
      address,
    };

    axios
      .post("http://192.168.0.102:8080/addGuardian", guardianData)
      .then((response) => {
        setIsLoading(false);
        Alert.alert(
          "Guardian Added Successfully",
          "The guardian has been added successfully!"
        );
        setEmail("");
        setFullName("");
        setPhoneNumber("");
        setAddress("");
        navigate.navigate("guardianHome");
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert(
          "Failed to Add Guardian",
          "An error occurred while adding the guardian."
        );
        console.error("Failed to add guardian:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register As Guardian</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <Pressable style={styles.button} onPress={handleAddGuardian}>
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Add Guardian"
          )}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddGuardian;

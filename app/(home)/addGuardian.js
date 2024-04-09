import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "expo-router";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const AddGuardian = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus === "granted") {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);
      } else {
        alert("Failed to get push token for push notification!");
      }
    } catch (error) {
      console.error("Error registering for push notifications:", error);
    }
  };

  const handleAddGuardian = () => {
    setIsLoading(true);
    const guardianData = {
      email: email.toLocaleLowerCase(),
      fullName,
      phoneNumber,
      address,
      deviceToken: expoPushToken,
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
        navigate.navigate("guardianHome", {email: email.toLowerCase()});
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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
        }}
      >
        <View
          style={{
            padding: 13,
            marginBottom: 10,
            backgroundColor: "#ddd",
            borderColor: "black",
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        >
          <Text style={{ fontSize: 16 }}>+63</Text>
        </View>
        <TextInput
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#000",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

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

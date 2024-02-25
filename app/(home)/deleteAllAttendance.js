import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "expo-router";

const DeleteAllAttendance = () => {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation()

  const handleDeleteAllAttendance = async () => {
    try {
      setLoading(true);
      // Show confirmation dialog
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete all attendance records?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              try {
                // Perform deletion
                await axios.delete("http://192.168.0.102:8080/attendance");
                Alert.alert(
                  "Success",
                  "All attendance records deleted successfully."
                );
                navigator.navigate("monitorHome")
              } catch (error) {
                console.error("Error deleting attendance records:", error);
                Alert.alert(
                  "Error",
                  "Failed to delete attendance records. Please try again later."
                );
              } finally {
                setLoading(false);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete All Attendance ?</Text>
      <Button
        color="red"
        title="Delete All Attendance"
        onPress={handleDeleteAllAttendance}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default DeleteAllAttendance;

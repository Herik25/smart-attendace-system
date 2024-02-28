import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactUs = () => {
  const handleCall = () => {
    Linking.openURL("tel:+1234567890");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:contact@example.com");
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/prosperedadSchool.jpg")}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.8,
          borderBottomColor: 'white',
          borderBottomWidth: 2
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            opacity: 1,
            zIndex: 1,
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{ height: 70, width: 70 }}
          />
          <Text style={{ color: "white", fontSize: 24, marginLeft: 10, fontWeight: 'bold' }}>
            Prosperedad National{"\n"} High School
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <Text style={styles.heading}>Contact Us</Text>
        <View style={styles.contactInfo}>
          <TouchableOpacity onPress={handleCall} style={styles.contactOption}>
            <Ionicons name="call" size={24} color="white" />
            <Text style={styles.optionText}>123-456-7890</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmail} style={styles.contactOption}>
            <Ionicons name="mail" size={24} color="white" />
            <Text style={styles.optionText}>contact@example.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressHeading}>Visit Us</Text>
          <Text style={styles.addressText}>
            123 School Street, City Name,
            {"\n"}
            State, Country - 12345
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  contactInfo: {
    marginBottom: 40,
    alignItems: 'center'
  },
  contactOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: 'white',
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  optionText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  addressContainer: {
    alignItems: "center",
  },
  addressHeading: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
  },
  addressText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ContactUs;

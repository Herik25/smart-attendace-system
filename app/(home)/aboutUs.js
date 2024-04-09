import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const aboutUs = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        backgroundColor: "#ffffff",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        THE RESEARCHERS
      </Text>
      {/* First researcher */}
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",

          paddingHorizontal: 15,

        }}
      >
        <ImageBackground
          source={require("../../assets/researcher.jpg")}
          style={{ width: 350, height: 200, borderRadius: 50 }}
        />
      </View>
      {/* Quote */}
      <View
        style={{
          backgroundColor: "transparent",
          paddingHorizontal: 20,
          paddingVertical: 35,
          
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "black",
          }}
        >
          “Empowering Education{"\n"} Through Seamless{"\n"} Attendance
          Management{"\n"} and Guardian Engagement.”
        </Text>
      </View>
      {/* Our Story */}
      <View
        style={{
          marginTop: 30,
          backgroundColor: "#f1f1f1",
          paddingHorizontal: 35,
          paddingVertical: 20,
          borderTopColor: "black",
          borderTopWidth: 2,
          borderBottomColor: "black",
          borderBottomWidth: 2,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          VISION
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          To become a necessary tool for educational
          institution, transforming the way they approach attendance management.
          By continuously innovating and adapting to the evolving needs of the
          education sector, the app aspires to enhance the learning experience,
          foster a more engaged and accountable school community, and contribute
          to the overall betterment of the educational system.
        </Text>
      </View>

      {/* Our Mission */}
      <View
        style={{
          backgroundColor: "#f1f1f1",
          paddingHorizontal: 35,
          paddingVertical: 20,
          borderBottomColor: "black",
          borderBottomWidth: 2,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          MISSION
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          To provide educational institutions and
          guardians a useful tool to improve student safety and parental
          involvement. Supporting the larger goals of excellence in education
          and school accountability.
        </Text>
      </View>

    </ScrollView>
  );
};

export default aboutUs;

const styles = StyleSheet.create({});
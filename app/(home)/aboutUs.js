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
        Meet Our Researchers
      </Text>
      {/* First researcher */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          paddingHorizontal: 15,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
      >
        <ImageBackground
          source={require("../../assets/researcher.jpg")}
          style={{ width: 150, height: 200, borderRadius: 50, marginRight: 15 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            Rexil L. Dator
          </Text>
          <Text style={{ fontSize: 16 }}>
            Sex: Female{"\n"}
            Date of Birth: October 12, 2006{"\n"}
            Email Address: rexilldator@gmail.com
          </Text>
        </View>
      </View>
      {/* Second researcher */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          paddingHorizontal: 15,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
      >
        <ImageBackground
          source={require("../../assets/researcher.jpg")}
          style={{ width: 150, height: 200, borderRadius: 50, marginRight: 15 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            Angela C. Cerna
          </Text>
          <Text style={{ fontSize: 16 }}>
            Sex: Female {"\n"}
            Date of Birth: December 29, 2005{"\n"}
            Email Address: angelacerna287@gmail.com
          </Text>
        </View>
      </View>
      {/* Third researcher */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
      >
        <ImageBackground
          source={require("../../assets/researcher.jpg")}
          style={{ width: 150, height: 200, borderRadius: 50, marginRight: 15 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            Honey Blaze T. Corton
          </Text>
          <Text style={{ fontSize: 16 }}>
            Sex: Female{"\n"}
            Date of Birth: March 31, 2006{"\n"}
            Email Address:
            hnyblzcorton@gmail.com
          </Text>
        </View>
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
          Our Vision
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          The vision of TAMBONG is to become a necessary tool for educational
          institution, transforming the way they approach attendance management.
          By continuously innovating and adapting to the evolving needs of the
          education sector, the app aspires to enhance the learning experience,
          foster a more engaged and accountable school community, and contribute
          to the overall betterment of the educational system.
        </Text>
      </View>
      {/* Quote */}
      <View
        style={{
          backgroundColor: "#000",
          paddingHorizontal: 20,
          paddingVertical: 35,
          borderBottomColor: "black",
          borderBottomWidth: 2,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          “Empowering Education{"\n"} Through Seamless{"\n"} Attendance
          Management{"\n"} and Guardian Engagement.”
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
          Our Mission
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          The mission of TAMBONG is to provide educational institutions and
          guardians a useful tool to improve student safety and parental
          involvement. Supporting the larger goals of excellence in education
          and school accountability.
        </Text>
      </View>
      {/* Thank You */}
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderBottomColor: "black",
          borderBottomWidth: 2,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Thank You!
        </Text>
      </View>
    </ScrollView>
  );
};

export default aboutUs;

const styles = StyleSheet.create({});

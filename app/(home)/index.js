import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

const { height } = Dimensions.get("window");

const index = () => {
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{ height: height / 2.5 }}
          resizeMode="contain"
          source={require("../../assets/Tech.png")}
        />
      </View>
      <View style={{ paddingHorizontal: 40, paddingTop: 40 }}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Poppins",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Are you a Guardian or a Monitor?
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Guardians stay updated, Monitors manage attendance.
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 40,
          flexDirection: "row",
          gap: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            paddingHorizontal: 20,
            paddingVertical: 15,
            flex: 1,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Guardian
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("(home)/loginMonitor")}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            flex: 1,
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Monitor
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});

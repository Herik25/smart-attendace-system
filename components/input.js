import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";

const Input = (props) => {
  const [fontsLoaded, fontError] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const onChangeText = (text) => {
    props.onInputChanged(props.id, text);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor: "#BEC2C2" }]}>
        <TextInput
          {...props}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          autoCapitalize="none"
        />
      </View>
      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#BEC2C2",
    marginVertical: 16,
    flexDirection: "row",
  },
  input: {
    color: "#BEC2C2",
    flex: 1,
    fontFamily: "Poppins",
    paddingTop: 0,
    fontSize: 18,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
export default Input;

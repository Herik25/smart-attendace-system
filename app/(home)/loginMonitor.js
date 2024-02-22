import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Input from "../../components/input";
import { reducer } from "../../utils/reducers/formReducers";
import { validateInput } from "../../utils/actions/formActions";
import { useNavigation, useRouter } from "expo-router";
import { signIn } from "../../utils/actions/authActions";
import { useDispatch } from "react-redux";

const loginMonitor = () => {
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

  const isTestMode = true;

  const initialState = {
    inputValues: {
      email: isTestMode ? "example@gmail.com" : "",
      password: isTestMode ? "**********" : "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const router = useRouter();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    try {
      setIsLoading(true);

      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      await dispatch(action);

      setError(null);
      Alert.alert("Login Successfull", "Successfully Signed In");
      setIsLoading(false);

      navigation.navigate("monitorHome");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2C2F30", padding: 16 }}>
      <Text
        style={{
          fontFamily: "Poppins",
          fontSize: 28,
          lineHeight: 30,
          fontWeight: "bold",
          color: "white",
          borderBottomWidth: 2,
          borderBottomColor: "white",
          width: 97,
          paddingBottom: 12,
        }}
      >
        Log In
      </Text>
      <Text
        style={{
          fontFamily: "Poppins",
          fontSize: 16,
          color: "#BEC2C2",
          lineHeight: 28,
          marginVertical: 20,
        }}
      >
        Sign In now to manage attendance effortlessly.
      </Text>

      <View style={{ marginVertical: 22 }}>
        <Input
          id="email"
          placeholder="E Mail"
          placeholderTextColor="#BEC2C2"
          errorText={formState.inputValidities["email"] || error}
          onInputChanged={inputChangeHandler}
        />
        <Input
          id="password"
          placeholder="Password"
          placeholderTextColor="#BEC2C2"
          errorText={formState.inputValidities["password"] || error}
          onInputChanged={inputChangeHandler}
        />
        <Pressable
          onPress={authHandler}
          style={{
            backgroundColor: "#6D8983",
            paddingVertical: 16,
            borderRadius: 8,
            marginVertical: 8,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              LOG IN
            </Text>
          )}
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 2,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("(home)/signUpMonitor")}>
            <Text style={{ color: "white", fontSize: 19 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default loginMonitor;

const styles = StyleSheet.create({});

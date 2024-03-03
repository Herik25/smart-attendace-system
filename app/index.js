import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

const index = () => {
  return <Redirect href="/(home)/" />;
};

export default index;

const styles = StyleSheet.create({});

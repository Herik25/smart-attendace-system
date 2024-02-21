import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchResults = ({ data, input, setInput }) => {
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.studentName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View
                style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#4b6cb7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                  >
                    {item?.studentName?.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item?.studentName}
                  </Text>
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item?.studentClass}th (Roll No: {item?.rollNo})
                  </Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});

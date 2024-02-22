import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const PickUpScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: "#F0F0F0", flex: 1 }}>
        <View>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Enter Address
          </Text>
          <TextInput
            style={{
              padding: 40,
              borderColor: "gray",
              borderWidth: 0.7,
              paddingVertical: 80,
              borderRadius: 9,
              margin: 10,
            }}
          />
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Pick Up Date
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});

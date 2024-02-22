import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

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
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date()}
            endDate={nextMonth}
            initialSelectedDate={new Date()}
            onSelectedDateChange={(date) => setSelectedDate(date.toISOString())}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});

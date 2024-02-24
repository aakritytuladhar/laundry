import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);
  // Calculate total
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const [selectedTime, setSelectedTime] = useState("");
  const [delivery, setDelivery] = useState("");
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "5-6 Days",
    },
    {
      id: "3",
      name: "7-8 Days",
    },
    {
      id: "4",
      name: "Tomorrow",
    },
  ];
  const times = [
    {
      id: "0",
      time: "11:00 AM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "01:00 PM",
    },
    {
      id: "3",
      time: "02:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Empty or Invalid",
        "Please select all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        {
          cancelable: false,
        }
      );
    } else {
      navigation.replace("Cart");
    }
  };
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: "#F0F0F0", flex: 1 }}>
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
              Enter Address
            </Text>
            <TextInput
              style={{
                padding: 10,
                borderColor: "gray",
                borderWidth: 0.7,
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
              onSelectedDateChange={(date) =>
                setSelectedDate(date.toISOString())
              }
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
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Set Time
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ maxHeight: 70 }}>
            {times.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedTime(item.time)}
                style={{
                  margin: 10,
                  borderRadius: 10,
                  borderColor: item.time === selectedTime ? "red" : "grey",
                  borderWidth: 0.7,
                  padding: 15,
                }}>
                <Text>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Delivery Date
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ maxHeight: 70 }}>
            {deliveryTime.map((item, i) => (
              <Pressable
                onPress={() => setDelivery(item.name)}
                key={item.id}
                style={{
                  margin: 10,
                  borderRadius: 10,
                  borderColor: delivery.includes(item.name) ? "red" : "grey",
                  borderWidth: 0.7,
                  padding: 15,
                }}>
                <Text>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | Rs. {total}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}>
              Extra charges may applied
            </Text>
          </View>
          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>
              Procced to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});

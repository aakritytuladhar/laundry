// rnfes
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
// import { ScrollView } from "react-native-web";

const Services = () => {
  const services = [
    {
      id: "1",
      image: require("../assets/services/laundry-machine.png"),
      name: "Washing",
    },
    {
      id: "2",
      image: require("../assets/services/laundry.png"),
      name: "Laundry",
    },
    {
      id: "3",
      image: require("../assets/services/ironing-board.png"),
      name: "Wash & Iron",
    },
    {
      id: "4",
      image: require("../assets/services/cleaning.png"),
      name: "Cleaning",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{
          margin: 20,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
        }}
        key={item.id}>
        <Image
          source={item.image} // Use item.image directly, as it's a local image
          style={{ width: 70, height: 70 }}
        />
        <Text style={{ textAlign: "center", marginTop: 10 }}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={{ padding: 1 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          margin: 5,
          textAlign: "center",
        }}>
        Services Available
      </Text>
      <FlatList
        data={services} // Pass the 'services' array as the data prop
        renderItem={renderItem} // Pass the renderItem function
        keyExtractor={(item) => item.id} // Provide a unique key for each item
        horizontal
        showsHorizontalScrollIndicator={false} // Optional: Add this if you want the list to be horizontal
      />
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});

import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const [userData, setUserData] = useState({});
  const ordersArray = userData.orders ? Object.values(userData.orders) : [];
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        const myUserUid = user.uid;

        const docRef = doc(db, "users", myUserUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  console.log("userData:", userData);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "top",
          backgroundColor: "#f6f6f6",
        }}>
        {/* <Text>Email: {userData.email}</Text>
        <Text>Phone: {userData.phone}</Text> */}
        <View>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Ionicons
              omPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 2,
              textAlign: "center",
            }}>
            Order List
          </Text>
        </View>
        <View>
          {ordersArray.map((order, index) => (
            <Pressable
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: 15,
                padding: 20,
                marginVertical: 10,
                // alignItems: "center",
              }}>
              <Text>Name of Product : {order.name}</Text>
              <Text>Price : Rs {order.price}</Text>
              <Text>Quantity: {order.quantity}</Text>
            </Pressable>
          ))}
        </View>
        {userData.pickUpDetails && (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                textAlign: "center",
              }}>
              Pick Up Details
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 15,
                padding: 20,
                marginVertical: 10,
              }}>
              <Text>No of Days: {userData.pickUpDetails.no_Of_days}</Text>
              <Text>Pick Up Date: {userData.pickUpDetails.pickUpdate}</Text>
              <Text>Selected Time: {userData.pickUpDetails.selectedTime}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OrderScreen;

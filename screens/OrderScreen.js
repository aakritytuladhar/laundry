import { useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
const OrderScreen = () => {
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUserUid = user.uid;

        const docRef = doc(db, "users", myUserUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const email = data.email;
          const phone = data.phone;
          const orders = data.orders;
          const pickUpDetails = data.pickUpDetails;

          // Check if orders is an array
          const ordersArray = Array.isArray(orders)
            ? orders.map((order) => ({
                id: order.id,
                image: order.image,
                name: order.name,
                price: order.price,
                quantity: order.quantity,
              }))
            : [];

          // Accessing data in the "pickUpDetails" map
          const noOfDays = pickUpDetails.no_Of_days;
          const pickUpdate = pickUpDetails.pickUpdate;
          const selectedTime = pickUpDetails.selectedTime;

          console.log("Email:", email);
          console.log("Phone:", phone);
          console.log("Orders:", ordersArray);
          console.log("Pick Up Details - No of Days:", noOfDays);
          console.log("Pick Up Details - Pick Up Date:", pickUpdate);
          console.log("Pick Up Details - Selected Time:", selectedTime);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "top",
          alignItems: "center",
          backgroundColor: "#f6f6f6",
          marginTop: 15,
        }}>
        <View
          style={{
            padding: 110,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            // marginTop: 25,
            // width,
          }}>
          <Text style={{ fontSize: 25, fontWeight: 600, marginTop: 0.2 }}>
            Order List
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OrderScreen;

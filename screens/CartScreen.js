import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { incrementQty, decrementQty } from "../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  // Calculate total
  const route = useRoute();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const userUid = auth.currentUser.uid;
  const dispatch = useDispatch();
  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    )
      .then(() => {
        console.log("Merge successful");
      })
      .catch((error) => {
        console.error("Error merging document: ", error);
      });
  };
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView style={{ marginTop: 20 }}>
            {total === 0 ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ marginTop: 40 }}>Your Cart is Empty</Text>
              </View>
            ) : (
              <>
                <View
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Pressable onPress={() => navigation.navigate("PickUp")}>
                    <Ionicons
                      omPress={() => navigation.goBack()}
                      name="arrow-back"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                  <Text style={{ fontSize: 20, paddingLeft: 90 }}>
                    Your Bucket
                  </Text>
                </View>

                <Pressable
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    marginLeft: 10,
                    marginRight: 10,
                    padding: 14,
                  }}>
                  {cart.map((item, index) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 15,
                      }}
                      key={index}>
                      <Text
                        style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                        {item.name}
                      </Text>
                      <Pressable
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          alignItems: "center",
                          borderColor: "#BEBEBE",
                          borderWidth: 0.5,
                          borderRadius: 10,
                        }}>
                        <Pressable
                          onPress={() => {
                            dispatch(decrementQuantity(item)); // cart
                            dispatch(decrementQty(item)); // product
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#088F8F",
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}>
                            -
                          </Text>
                        </Pressable>

                        <Pressable>
                          <Text
                            style={{
                              fontSize: 19,
                              color: "#088F8F",
                              paddingHorizontal: 8,
                              fontWeight: "600",
                            }}>
                            {item.quantity}
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() => {
                            dispatch(incrementQuantity(item)); // cart
                            dispatch(incrementQty(item)); //product
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#088F8F",
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}>
                            +
                          </Text>
                        </Pressable>
                      </Pressable>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>
                        {item.price * item.quantity}
                      </Text>
                    </View>
                  ))}
                </Pressable>
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginTop: 30,
                      marginBottom: 20,
                    }}>
                    Billing Details
                  </Text>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 7,
                      padding: 10,
                      margintop: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "400",
                          color: "gray",
                        }}>
                        {" "}
                        Item Total
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        Rs. {total}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "400",
                          color: "gray",
                        }}>
                        Delivery Fee |1.2KM
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {" "}
                        FREE
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          color: "gray",
                        }}>
                        Free Delivery on Your order
                      </Text>
                    </View>
                    <View
                      style={{
                        borderColor: "gray",
                        height: 1,
                        borderWidth: 0.5,
                        marginTop: 10,
                      }}></View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          color: "gray",
                        }}>
                        Selected Date
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "400",
                          color: "#088F8F",
                        }}>
                        {route.params.pickUpdate}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          color: "gray",
                        }}>
                        No Of Days
                      </Text>

                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "400",
                          color: "#088F8F",
                        }}>
                        {route.params.no_Of_days}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          color: "gray",
                        }}>
                        Selected Pick Up Time
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "400",
                          color: "#088F8F",
                        }}>
                        {route.params.selectedTime}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderColor: "gray",
                        height: 1,
                        borderWidth: 0.5,
                        marginTop: 5,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 8,
                      }}>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        To Pay
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {total + 20}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
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
          <Pressable
            onPress={placeOrder}
            style={{
              height: 40,
              width: 100,
              borderColor: "green",
              borderRadius: 6,
              backgroundColor: "#10A19D",
              boxShadow:
                " 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "white",
                paddingTop: 9,
                textAlign: "center",
              }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});

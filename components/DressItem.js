import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { incrementQty, decrementQty } from "../ProductReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementQty(item));
  };

  const cartItem = cart.find((c) => c.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <>
      <Pressable
        style={{
          margin: 15,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        key={item.id}>
        <Image source={item.image} style={{ width: 70, height: 70 }} />
        <Text
          style={{
            textAlign: "center",
            width: 83,
            fontSize: 17,
            fontWeight: "500",
          }}>
          {item.name}
        </Text>
        <Text style={{ textAlign: "center", marginRight: 10 }}>
          Rs. {item.price}
        </Text>
        {quantity > 0 ? (
          <>
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item));
                dispatch(decrementQty(item));
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                -
              </Text>
            </Pressable>
            <Text
              style={{
                fontSize: 19,
                color: "#088F8F",
                paddingHorizontal: 8,
                fontWeight: "600",
              }}>
              {quantity}
            </Text>
            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item));
                dispatch(incrementQty(item));
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                +
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 60 }}>
            <Text
              style={{
                borderColor: "gray",
                borderRadius: 4,
                borderWidth: 0.8,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: "bold",
              }}>
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </>
  );
};

export default DressItem;

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { phone, setPhone } = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}>
      <SafeAreaView>
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}>
            <Text
              style={{ fontSize: 20, color: "#662D91", fontWeight: "bold" }}>
              Register
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#662D91",
                fontWeight: "800",
                marginTop: 15,
              }}>
              Create A New Account
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Fontisto name="email" size={24} color="black" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  fontSize: email ? 18 : 18,

                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginVertical: 10,
                  marginLeft: 13,
                  width: 250,
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginVertical: 10,
                  marginLeft: 13,
                  width: 250,
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="phone" size={24} color="black" />
              <TextInput
                placeholder="Phone no"
                placeholderTextColor="black"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                secureTextEntry={true}
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginVertical: 10,
                  marginLeft: 13,
                  width: 250,
                }}
              />
            </View>
          </View>
          <View>
            <Pressable
              style={{
                width: 200,
                backgroundColor: "#008DDA",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}>
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                Register
              </Text>
            </Pressable>
            <Pressable
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "500",
                }}>
                Already Have a Account ? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

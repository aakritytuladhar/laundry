import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
              Sign In
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#662D91",
                fontWeight: "800",
                marginTop: 15,
              }}>
              Sing In To Your Account
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
                Login
              </Text>
            </Pressable>
            <Pressable
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "500",
                }}>
                Don't have an account ? Sign up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const [phoneNumber, setPhoneNumber] = useState(null);
  useEffect(() => {
    if (user) {
      const myUserUid = user.uid;
      const userRef = doc(db, "users", myUserUid);

      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            const phoneNumber = doc.data().phone;
            setPhoneNumber(phoneNumber);

            console.log("User's phone number:", phoneNumber);
          } else {
            console.log("User document not found.");
          }
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
        });
    } else {
      console.log("No user is currently signed in.");
    }
  }, [user]);
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f6f6f6",
        }}>
        <View style={styles.container}>
          <Pressable style={styles.profile}>
            <Image
              style={styles.profileAvatar}
              source={{
                uri: "https://lh3.googleusercontent.com/-RnpzrGr1z-w/AAAAAAAAAAI/AAAAAAAAAAA/AFNEGgL8i7Pea4iiU-eW2pLtFSAapYEdcg/photo.jpg?sz=46",
              }}
            />
            <Text style={styles.profileName}> Welcome {user.email}</Text>
            <Text style={styles.profileName}>Phone number : {phoneNumber}</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={signOutUser}
            style={{
              backgroundColor: "#4CCD99",
              padding: 10,
              borderRadius: 6,
              marginBottom: 50,
            }}>
            <Text style={{ fontSize: 17, fontWeight: "400" }}>Signout</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0.52,
    flex: 0.9,
    // width:
  },
  profile: {
    padding: 50,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 25,
    // fontSize: 5,
    fontWeight: "600",
    color: "#848484",
  },
});

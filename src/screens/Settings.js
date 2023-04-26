import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { auth, firestore } from "../../Firebase";
// import Toast from "react-native-simple-toast";

export default function Settings({ navigation }) {
  const signoutUser = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          // Toast.show("You have signed out!", Toast.LONG, Toast.CENTER);
          navigation.replace("SignIn");
        })
        .catch((error) => alert(error));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <ImageBackground>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => navigation.navigate("TermsAndConditions")}
            style={{
              top: 70,
              alignSelf: "center",
              backgroundColor: "#E3E3E3",
              width: "80%",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>

          <View
            style={{
              top: 70,
              alignSelf: "center",
              backgroundColor: "#E3E3E3",
              width: "80%",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}>
              App Version
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }}>v1.0.0</Text>
          </View>

          <TouchableOpacity
            style={{
              top: 70,
              alignSelf: "center",
              backgroundColor: "#E3E3E3",
              width: "80%",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
            onPress={signoutUser}
          >
            <Text style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});

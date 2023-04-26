import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

function OnboardingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#573E22" }}>
      <View style={styles.topBody}>
        <View style={styles.onboarding}>
          <Image source={require("../assets/logo/SignInLogo.png")} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#CEB89E", "#9F805C"]}
            style={styles.signIn}
          >
            <Text style={styles.signInTxt}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.signUp}
        >
          <Text style={styles.signUpTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default OnboardingScreen;
const styles = StyleSheet.create({
  topBody: {
    flex: 3.8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 2.2,
    justifyContent: "center",
    alignItems: "center",
  },
  signIn: {
    justifyContent: "center",
    backgroundColor: "#BFA688",
    borderRadius: 20,
    height: 50,
    width: 320,
    marginVertical: 15,
  },
  signInTxt: {
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },
  signUp: {
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgb(146, 122, 95)",
    borderRadius: 20,
    height: 50,
    width: 320,
  },
  signUpTxt: {
    textAlign: "center",
    fontSize: 22,
    color: "rgb(146, 122, 95)",
  },
  onboarding: {
    // height: 253,
    // width: 294,
  },
});

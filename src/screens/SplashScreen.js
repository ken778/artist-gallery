import { ImageBackground, View, Image, Text } from "react-native";
import React from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { auth } from "../../Firebase";

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    auth.onAuthStateChanged((userCredential) => {
      // const user = userCredential;
      if (userCredential) {
        navigation.replace("LandingPage");
      } else {
        navigation.replace("Onboarding");
      }
    });
  }, 3000);

  return (
    <ImageBackground
      source={bgImage}
      style={globalStyles.splashContainer}
      resizeMode="stretch"
    >
      <View style={{ flex: 1 }}>{/*  */}</View>

      {/* logo */}
      <View style={globalStyles.body}>
        <Image source={logo} style={globalStyles.splashLogo} />
      </View>

      {/* title */}
      <View style={globalStyles.splashFooter}>
        <Text style={globalStyles.appName}>Gallery 360</Text>
        <Text style={globalStyles.appName2}>Africa</Text>
      </View>
    </ImageBackground>
  );
}

// images
const bgImage = require("../assets/BgImages/splashBg.png");
const logo = require("../assets/logo/splashLogo.png");

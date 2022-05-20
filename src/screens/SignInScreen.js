import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, firestore } from "../../Firebase";
import Toast from "react-native-simple-toast";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // form validation
  const validate = () => {
    setLoading(!loading);
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "" && password == "") {
      Toast.show(
        "Email and Password cannot be empty",
        Toast.LONG,
        Toast.CENTER
      );
    } else if (email == "") {
      Toast.show("Email cannot be empty", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else if (password == "") {
      Toast.show("Password cannot be empty", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else if (!reg.test(email)) {
      Toast.show("Email is not valid", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else if (!strongRegex.test(password)) {
      Toast.show("Password is not valid", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else {
      signIn();
    }
  };

  const signIn = async () => {
    if (email !== "" && password !== "") {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          <ActivityIndicator size="large" color="#0000ff" />;
          console.log(user);
          Toast.show(
            "You have successfully loged in ",
            Toast.LONG,
            Toast.CENTER
          );
          if (user) {
            navigation.replace("LandingPage");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/invalid-email") {
            Toast.show("Email is not valid", Toast.LONG, Toast.CENTER);
            setLoading(false);
          } else if (error.code === "auth/user-not-found") {
            Toast.show("No User Found", Toast.LONG, Toast.CENTER);
            setLoading(false);
          } else if (error.code === "auth/wrong-password") {
            Toast.show("Your Password is Incorrect", Toast.LONG, Toast.CENTER);
          } else {
            console.log(error.code, " this the error you should catch");
            // Toast.show(
            //   "Please check your email id or password",
            //   Toast.LONG,
            //   Toast.CENTER
            // );
            setLoading(false);
          }
        });
    }
  };

  //
  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ backgroundColor: "#573E22", height: "100%", width: "100%" }}
    >
      <View style={styles.topBody}>
        <View>
          <Image
            source={require("../assets/logo/SignInLogo.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ marginLeft: 33, marginBottom: 15 }}>
          <Text style={{ fontSize: 36, color: "#22180E" }}>Welcome Back !</Text>
          <Text style={{ color: "#FFFFFF" }}>LogIn to your account</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(email) => setEmail(email)}
            value={email}
            underlineColorAndroid="#f000"
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.inputStyle}
            onChangeText={(password) => setPassword(password)}
            value={password}
            underlineColorAndroid="#f000"
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            returnKeyType="next"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            validate();
          }}
          activeOpacity={0.5}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#CEB89E", "#9F805C"]}
            style={styles.buttonStyle}
          >
            {!loading ? (
              <>
                <Text style={styles.buttonTextStyle}>Sign In</Text>
              </>
            ) : (
              <>
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={styles.buttonTextStyle}
                />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={{}}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#22180E" }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  topBody: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  footer: {
    //flex: 1,
    // marginVertical: 25
  },
  SectionStyle: {
    flexDirection: "row",
    // height: 40,
    // marginTop: 17,
    // marginLeft: 35,
    // marginRight: 35,
    // margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#BFA688",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 13,
    fontSize: 16,
  },
  inputStyle: {
    color: "white",
    height: 70,
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FFFFFF",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    height: 250,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});

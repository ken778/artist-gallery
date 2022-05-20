import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { auth, firestore } from "../../Firebase";
import Toast from "react-native-simple-toast";
import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";

export default function SignUpScreen({ navigation }) {
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // form validation
  const validate = () => {
    const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
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
    } else if (artistName == "") {
      Toast.show("Your artist name cannot be empty", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else if (!reg.test(email)) {
      Toast.show("Email is not valid", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else if (!pattern.test(artistName)) {
      Toast.show("Name is not valid", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else if (!strongRegex.test(password)) {
      Toast.show("Password is not valid", Toast.LONG, Toast.CENTER);
      setLoading(false);
    } else {
      onSignup();
    }
  };

  const onSignup = () => {
    if (artistName !== "" && email !== "" && password !== "") {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const artist = userCredential.user;
          firestore
            .collection("artists")
            .doc(artist.uid)
            .set({
              timeStamp: new Date().toISOString(),
              artistUid: artist.uid,
              artistName: artistName,
              email: artist.email,
              photoUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU",
            })
            .then(() => {
              Toast.show(
                "You have successfully registered ",
                Toast.LONG,
                Toast.CENTER
              );
              navigation.navigate("SignIn");
            })
            .catch((error) => Toast.show(`${error}`, Toast.LONG, Toast.CENTER));
          // console.log('User account created & signed in!');
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Toast.show(
              "That email address is already in use!",
              Toast.LONG,
              Toast.CENTER
            );
          }
          if (error.code === "auth/invalid-email") {
            Toast.show(
              "That email address is invalid!",
              Toast.LONG,
              Toast.CENTER
            );
          }
          console.error(error);
        });
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior=""
        style={{
          flex: 1,
          backgroundColor: "#573E22",
        }}
      >
        <View style={styles.topBody}>
          <View>
            <Image
              source={require("../assets/logo/SignUpLogo.png")}
              style={styles.logo}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ marginLeft: 33, marginTop: 10 }}>
            <Text style={{ fontSize: 36, color: "#22180E" }}>Sign Up</Text>
            <Text style={{ color: "#FFFFFF" }}>Create your new account</Text>
          </View>
          <View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(artistName) => setArtistName(artistName)}
                value={artistName}
                underlineColorAndroid="#f000"
                placeholder="Full Name"
                placeholderTextColor="#FFFFFF"
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  //  {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#fff' : 'red'}
                ]}
                onChangeText={(email) => setEmail(email)}
                value={email}
                underlineColorAndroid="#f000"
                placeholder="Email"
                placeholderTextColor="#FFFFFF"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(password) => setPassword(password)}
                value={password}
                underlineColorAndroid="#f000"
                placeholder="Password"
                placeholderTextColor="#FFFFFF"
                returnKeyType="next"
                secureTextEntry={true}
                textContentType="password"
              />
            </View>
            <View style={{ width: "80%", alignSelf: "center" }}>
              <PasswordStrengthMeterBar
                password={password}
                showStrenghtText={false}
                height={6}
                radius={4}
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
                <Text style={styles.buttonTextStyle}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              {/* <Text style={{marginHorizontal: 65}}>
              Already have an account?
              <TouchableOpacity style={{marginTop: 9}} onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={{color: '#22180E'}}>
                {' '}
                Sign In
                </Text>
              </TouchableOpacity>
           </Text> */}
              <Text style={{}}>Already have an account?</Text>
              <Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={{ color: "#22180E" }}> Sign In</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  topBody: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 280,
  },
  footer: {
    flex: 1,
  },
  SectionStyle: {
    flexDirection: "column",
    height: 40,
    marginTop: 17,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#0E1822",
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
    flex: 1,
    color: "white",
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FFFFFF",
  },
  logo: {
    height: 220,
    width: 260,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

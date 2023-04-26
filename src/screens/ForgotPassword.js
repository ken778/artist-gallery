import React, { useState,useEffect } from "react";
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
// import Toast from "react-native-simple-toast";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [varified, setVarified] = useState(true)

   const [isVarified, setisVarified] = useState(Boolean)

 
 // form validation
  const validate = () => {
    setLoading(!loading);
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "" && password == "") {
      // Toast.show(
      //   "Email and Password cannot be empty",
      //   Toast.LONG,
      //   Toast.CENTER
      // );
      Alert.alert(
        "Reset Failed",
        "Email cannot be empty",
        [
         
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      ); 
      setLoading(false);

      console.log('fields are empty')
    } else {
      ResetPass();
      setLoading(false);
    }
  };


//reset password
const ResetPass = ()=>{
  auth.sendPasswordResetEmail(email).then(()=>{
    console.log('email sent')
     Alert.alert(
        "Password Reset",
        "Password reset link sent to your email",
        [
         
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
        setLoading(false);

  }).catch((error)=>{
    console.log(error)
  })
}
 


  //use effect
  useEffect(()=>{
   
    console.log('i am running now')
    
    //checking email varification state
    auth.onAuthStateChanged((userCredential) => {
      console.log('checking varification in useEffect')
     
    })
    console.log(varified)

},[])

  

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
        <View style={{ marginLeft: 33, marginBottom: 20 }}>
          <Text style={{ fontSize: 36, color: "#FFFFFF" }}>Forgot Password</Text>
          <Text style={{ color: "#FFFFFF", marginTop:10 }}>Enter Email Address</Text>
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
                <Text style={styles.buttonTextStyle}>Send</Text>
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



       <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={styles.signUp}
        >
          <Text style={styles.signUpTxt}>Back</Text>
        </TouchableOpacity>

      



       

      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    signUp: {
  
    borderWidth: 2,
    borderColor: "rgb(146, 122, 95)",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,

  },
    signUpTxt: {
    textAlign: "center",
    fontSize: 16,
   paddingVertical: 13,
    color: "rgb(146, 122, 95)",
  },
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
    height: 40,
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

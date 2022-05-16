import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
//navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

//backend service
import { firestore, auth } from "./Firebase";

//screens
import SplashScreen from "./src/screens/SplashScreen";
import TermsAndConditions from "./src/screens/TermsAndConditions";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import Sales from "./src/screens/Sales";
import Products from "./src/screens/Products";
import UserProfile from "./src/screens/Profile";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        elevation: 0,
        marginBottom: 5,
        tabStyle: {
          height: 45,
          minHeight: 0,
          backgroundColor: "#ceb89e",
          borderRadius: 20,
          margin: 10,
          marginVertical: 10,
          padding: 3,
          width: 160,
          marginLeft: 10,
        },
        renderIndicator: () => null,
      }}
      screenOptions={{
        tabBarPressColor: "#fff",
        headerTransparent: true,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#000",
        swipeEnabled: false,
      }}
    >
      {/* <Tab.Screen name='Home' component={Home} /> */}
      <Tab.Screen
        options={{ headerShown: false }}
        name="Sales"
        component={Sales}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Products"
        component={Products}
      />
    </Tab.Navigator>
  );
};

export default function App({ navigation, route }) {
  //
  const [artist, setArtist] = useState("");
  const [User, setUser] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const [artistUid, setArtistUid] = useState("");

  useEffect(() => {
    const unregister = auth.onAuthStateChanged((userExist) => {
      // const artistUid = auth()?.currentUser?.uid;

      if (userExist) {
        setArtist(userExist);
        firestore
          .collection("artists")
          .where("artistUid", "==", userExist.uid)
          .onSnapshot((snapShot) => {
            const users = snapShot.docs.map(
              (document) => document.data().photoUrl
            );
            const uName = snapShot.docs.map(
              (document) => document.data().artistName
            );
            // console.log(cartItems + "  this the number of item added to cart")
            setUser(users);
            setArtistName(uName);
            setArtistUid(userExist.uid);
          });
      } else {
        setUser("");
      }
    });

    return () => {
      unregister();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#000",
          },
        }}
      >
        {artist ? (
          <>
            <Stack.Screen
              name="LandingPage"
              component={TabNavigator}
              options={({ navigation }) => ({
                headerBackVisible: false,
                headerShadowVisible: false,
                headerTitleAlign: "left",
                headerTitleStyle: {
                  color: "#000",
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#fff",
                },

                title: "Gallery 360 Africa",
                headerRight: () => (
                  <View
                    style={{
                      flexDirection: "row",
                      width: 45,
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Profile", {
                          artistUid: artistUid,
                          artistName: artistName,
                          photoUrl: User,
                        })
                      }
                    >
                      <Image
                        source={{ uri: `${User}` }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: "lightgrey",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Terms"
              component={TermsAndConditions}
            />
            <Stack.Screen
              options={{ headerShown: true, headerTransparent: true }}
              name="Profile"
              component={UserProfile}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Products"
              component={Products}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Sales"
              component={Sales}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignIn"
              component={SignInScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={SplashScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Onboarding"
              component={OnboardingScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignUp"
              component={SignUpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
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
import UserProfile from "./src/screens/UserProfile";
//import serProfile from "./src/screens/Profile";
import ArtWorkScreen from "./src/screens/ArtWorkScreen";
import SocialMediaScreen from "./src/screens/SocialMediaScreen";
import ArtistProfileScreen from "./src/screens/ArtistProfileScreen";
import { TabNavigator2 } from "./src/screens/HomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EditProfile from "./src/screens/EditProfile";
import UploadedArt from "./src/screens/UploadedArt";
import Sold from "./src/screens/Sold";      
import ForgotPassword from "./src/screens/ForgotPassword";



const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = ({navigation}) => {
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
      {/* <Tab.Screen name='Home' component={HomeScreen}
       /> */}    
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
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");

  const [isVarified, setisVarified] = useState(Boolean)


  // toast message
  // const toastConfig = {
  //   success: (props) => (
  //     <BaseToast
  //       {...props}
  //       style={{ borderLeftColor: "green" }}
  //       contentContainerStyle={{ paddingHorizontal: 15 }}
  //       text1Style={{
  //         fontSize: 17,
  //         fontWeight: "400",
  //       }}
  //       text2Style={{
  //         fontSize: 13,
  //         color: "green",
  //       }}
  //     />
  //   ),
  //   error: (props) => (
  //     <ErrorToast
  //       {...props}
  //       text1Style={{
  //         fontSize: 17,
  //       }}
  //       text2Style={{
  //         fontSize: 13,
  //         color: "red",
  //       }}
  //     />
  //   ),
  //   tomatoToast: ({ text1, props }) => (
  //     <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
  //       <Text>{text1}</Text>
  //       <Text>{props.uuid}</Text>
  //     </View>
  //   ),
  // };

  //checking if email is varified
  const checkEmail = () =>{
    auth.onAuthStateChanged((user)=>{
       // console.log('checking email',user.emailVerified)
        
        //added recently
        if(user!=null){
          setisVarified(user.emailVerified)
        }
      
        console.log(user)


        // if(isVarified ==true){
        //         navigation.navigate('SignUp')
        // }else{
        //   navigation.navigate('SignUp')
        // }
    })

  }
   console.log('varified:',isVarified)
 


  useEffect(() => {
    checkEmail()
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
            const videoIds = snapShot.docs.map(
              (document) => document.data().videoUrl
            );
            const descriptions = snapShot.docs.map(
              (document) => document.data().description
            );
            // console.log(cartItems + "  this the number of item added to cart")
            setVideoUrl(videoIds);
            setUser(users);
            setArtistName(uName);
            setArtistUid(userExist.uid);
            setDescription(descriptions);
          });
      } else {
        setUser("");
      }
    });
    console.log(artistUid)
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
      
         
             {/* te */} 
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
                headerLeft: () => {
                  <View style={{ width: "80%", height: Dimensions }}></View>;
                },

                headerRight: () => (
                  <View key={artistUid}
                    style={{
                      flexDirection: "row",
                      width: 45,
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity key={artistUid}
                      onPress={() =>
                        navigation.navigate("Profile", {
                          artistUid: artistUid,
                          artistName: artistName,
                          photoUrl: User,
                          description: description,
                          videoUrl: videoUrl,
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
              name="ForgotPassword"
              component={ForgotPassword}
            />

            
            <Stack.Screen
                 options={{ headerShown: true, headerTransparent: true }}
              name="Terms"
              component={TermsAndConditions}
            />
            <Stack.Screen
                 options={{ headerShown: true, headerTransparent: true }}
              name="Arts"
              component={UploadedArt}
            />
            <Stack.Screen
                 options={{ headerShown: true, headerTransparent: true }}
              name="sold"
              component={Sold}
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
            <Stack.Screen
              options={{ headerShown: false }}
              name="ArtWork"
              component={ArtWorkScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SocialMedia"
              component={SocialMediaScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ArtistProfile"
              component={ArtistProfileScreen}
            />
            <Stack.Screen
              name="Home"
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

                //title: "Gallery 360 Africa 2 nested",
                headerRight: () => (
                  <View key={artistUid}
                    style={{
                      flexDirection: "row",
                      width: 45,
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Profile", {
                          artistUid: artistUid,
                          artistName: artistName,
                          photoUrl: User,
                          description: description,
                          videoUrl: videoUrl,
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
                    </TouchableOpacity> */}
                  </View>
                ),
              })}
              component={TabNavigator2}
            />
       
      
    
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignIn"
              component={SignInScreen}
            />
            {/* <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={SplashScreen}
            /> */}
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
     
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={SplashScreen}
        />
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

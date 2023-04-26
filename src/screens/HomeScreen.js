import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SocialMediaScreen from "./SocialMediaScreen";
import ArtWorkScreen from "./ArtWorkScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const TabNavigator2 = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        elevation: 0,
        

        marginBottom: 5,
        tabStyle: {
          height: 45,
          //minHeight: 0,
          backgroundColor: "#ceb89e",
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
        name="Art"
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
        })}
        component={ArtWorkScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Social Handles"
        component={SocialMediaScreen}
      />
    </Tab.Navigator>
  );
};
// export default function HomeScreen({ navigation }) {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="HomeScreen"
//           component={TabNavigator}
//           //   options={({ navigation }) => ({
//           //     headerBackVisible: false,
//           //     headerShadowVisible: false,
//           //     headerTitleAlign: "left",
//           //     headerTitleStyle: {
//           //       color: "#000",
//           //       fontWeight: "bold",
//           //     },

//           //     headerRight: () => (
//           //       <View
//           //         style={{
//           //           flexDirection: "row",
//           //           width: 45,
//           //           justifyContent: "space-between",
//           //         }}
//           //       >
//           //         <TouchableOpacity
//           //           onPress={() =>
//           //             navigation.navigate("ArtistProfileScreen", {
//           //               artistUid: artistUid,
//           //               artistName: artistName,
//           //               photoUrl: User,
//           //               description: description,
//           //               videoUrl: videoUrl,
//           //             })
//           //           }
//           //         >
//           //           <Image
//           //             source={{ uri: `${User}` }}
//           //             style={{
//           //               width: 30,
//           //               height: 30,
//           //               borderRadius: 30,
//           //               backgroundColor: "lightgrey",
//           //             }}
//           //           />
//           //         </TouchableOpacity>
//           //       </View>
//           //     ),
//           //   })}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

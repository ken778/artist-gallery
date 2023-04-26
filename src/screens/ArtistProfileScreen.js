import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
// import Toast from "react-native-simple-toast";
//
import { auth, firestore } from "../../Firebase";
//
import { FontAwesome } from "@expo/vector-icons";
//
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
//
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//
import SocialMediaScreen from "./SocialMediaScreen";
import ArtWorkScreen from "./ArtWorkScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//

//Tab
const Tab = createMaterialTopTabNavigator();
const Bottom = createMaterialBottomTabNavigator();

//
export default function ArtistProfileScreen({ route, navigation }) {
  //
  const { artistUid, photoUrl, artistName, description, videoUrl } =
    route.params;

  //
  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [followingBoolean, setFollowingBoolean] = useState(false);
  const [following, setFollowing] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [art, setArt] = useState(null);
  const [size, setSize] = useState(0);

  const controlRef = useRef();

  //  video
  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
    if (state !== "playing") {
      setPlaying(false);
    }
  };

  //

  const getArt = async () => {
    return await firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .where("status", "==", "approved")
      .limit(2)
      .onSnapshot((snapshot) => {
        const allArt = snapshot.docs.map((docSnap) => docSnap.data());
        setArt(allArt);
      });
  };

  const getNumberOfImage = async () => {
    return await firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .where("status", "==", "approved")
      .onSnapshot((snapshot) => {
        const artSizes = snapshot.size - 2;
        // console.log(artSizes, " the art size of the artist");
        setSize(artSizes);
      });
  };
  // follow artist methods
  const onFollow = async () => {
    return await firestore
      .collection("following")
      .doc(artistUid)
      .set({
        artistUid: artistUid,
      })
      .then(() => {
        onFollowing(artistUid);
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };

  const onFollowing = async () => {
    const uuid = auth.currentUser.uid;

    try {
      await firestore
        .collection("following")
        .doc(artistUid)
        .collection("userFollowing")
        .doc(uuid)
        .set({
          uuid: uuid,
          artistUid: artistUid,
          photo: photoURL,
          artistPhoto: photoUrl,
          fullName: FullName,
          artistName: artistName,
        })
        .then(() => {
          // Toast.show(
          //   `You're now Following ${artistName}`,
          //   Toast.LONG,
          //   Toast.CENTER
          // );
        });
    } catch (error) {
      // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
    }
  };

  //
  const onUnFollowing = async () => {
    const uuid = auth.currentUser.uid;

    try {
      await firestore
        .collection("following")
        .doc(artistUid)
        .collection("userFollowing")
        .doc(uuid)
        .delete();
      // Toast.show(
      //   `You're no longer following ${artistName}`,
      //   Toast.LONG,
      //   Toast.CENTER
      // );
    } catch (error) {
      // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
    }
  };

  //
  const followState = () => {
    const uid = auth.currentUser.uid;
    return firestore
      .collection("following")
      .doc(artistUid)
      .onSnapshot((snapShot1) => {
        snapShot1.ref
          .collection("userFollowing")
          .where("uuid", "==", uid)
          .onSnapshot((snapShot) => {
            const follows = snapShot.docs.map(
              (document) => document.data().artistUid
            );
            setFollowing(follows);
          });
      });
  };

  useEffect(() => {
    getArt();
    getNumberOfImage();
    followState();

    return () => followState();
    return () => getArt();
    return () => getNumberOfImage();
  }, []);

  //
  return (
    <ImageBackground
      source={imageBg}
      resizeMode="stretch"
      style={styles.container}
    >
      <View style={styles.TopContainer}>
        <View style={{ marginVertical: 12 }}>
          <VideoPlayer
            style={{ width: "80%", height: 250 }}
            videoProps={{
              style: { width: "100%", height: "100%" },
              shouldPlay: true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
              source: {
                uri: videoUrl,
              },
            }}
          />
          {/* <WebView
            source={{
              html: '<iframe width="100%" height="50%" src="https://www.youtube.com/embed/FHfIeu3Vnrc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
            }}
            videoId={"84WIaK3bl_s"}
            style={{ width: 325, height: 10, borderRadius: 15 }}
          /> */}
        </View>
      </View>

      <View style={styles.MiddleContainer}>
        <View style={styles.listItem}>
          <View style={{ flexDirection: "row", width: "91%" }}>
            <Image source={{ uri: `${photoUrl}` }} style={styles.img2} />

            <View style={{ width: "100%" }}>
              <Text
                style={{
                  color: "#000000",
                  marginLeft: 10,
                  top: 6,
                  fontSize: 20,
                }}
              >
                {artistName}
              </Text>
              <Text style={{ color: "#ceb89e", marginLeft: 10, top: 3 }}>
                Artist
              </Text>

              {following == artistUid ? (
                <View>
                  <TouchableOpacity
                    style={{
                      alignSelf: "flex-end",
                      marginVertical: -25,
                      marginHorizontal: 70,
                      bottom: 10,
                    }}
                    title="following"
                    onPress={() => onUnFollowing()}
                  >
                    <Text style={{ color: "#dc143c", fontSize: 16 }}>
                      Unfollow
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={{
                      alignSelf: "flex-end",
                      marginVertical: -25,
                      marginHorizontal: 70,
                      bottom: 10,
                    }}
                    title="following"
                    onPress={() => onFollow()}
                  >
                    <Text style={{ color: "#deb887", fontSize: 16 }}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={{ width: "95%", top: 15 }}>
            <Text style={{ color: "#000000" }}>{description}</Text>
          </View>
        </View>
      </View>

      <View style={styles.BottomContainer}>
        <View style={styles.moreText}>
          <Bottom.Navigator
            // tabBarOptions={{
            //   elevation: 0,
            //   tabStyle: {
            //     height: 45,
            //     minHeight: 0,
            //     backgroundColor: "#ceb89e",
            //     borderRadius: 20,
            //     margin: 10,
            //     marginVertical: 10,
            //     padding: 3,
            //     width: 160,
            //     marginLeft: 10,
            //   },
            //   renderIndicator: () => null,
            // }}
            screenOptions={{
              tabBarPressColor: "#fff",
              headerTransparent: false,
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#000",
              swipeEnabled: false,
            }}
          >
            <Bottom.Screen
              options={{ headerShown: false }}
              name="ArtWork"
              component={ArtWorkScreen}
            />
            <Bottom.Screen
              options={{ headerShown: false }}
              name="SocialMedia"
              component={SocialMediaScreen}
            />
          </Bottom.Navigator>
        </View>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <FlatList
            scrollEnabled={false}
            horizontal={true}
            data={art}
            keyExtractor={(item) => `${item.ImageUid}`}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItem2}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ArtPreview", {
                        artistUid: artistUid,
                        price: item.price,
                        description: item.description,
                        artUrl: item.artUrl,
                        artistPhoto: item.artistPhoto,
                        artistName: item.artistName,
                        imageUID: item.ImageUid,
                        artType: item.artType,
                        description: description,
                      })
                    }
                  >
                    <Image source={{ uri: item.artUrl }} style={styles.img} />
                    <View style={styles.priceView}>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {size > 0 ? (
            <View
              style={{ backfaceVisibility: "hidden", marginHorizontal: -35 }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ArtWorks", {
                    description: description,
                    artistUid: artistUid,
                    photoUrl: photoUrl,
                    artistName: artistName,
                  })
                }
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  width: 120,
                  height: 150,
                  borderRadius: 15,
                  left: 10,
                  top: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, color: "gray" }}> +{size}</Text>
                {/* <Text style={{color:'blue', fontSize:20, fontWeight:'700'}}>See All</Text> */}
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const imageBg = require("../assets/images/home.png");

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  TopContainer: {
    top: 50,
    flex: 2,
  },
  MiddleContainer: {
    flex: 2,
    top: 95,
    // backgroundColor: "red"
  },
  BottomContainer: {
    flex: 2,
    top: 20,
  },
  moreText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    top: 15,
  },
  img: {
    height: 150,
    width: 120,
    borderRadius: 15,
  },
  listItem2: {
    paddingLeft: 15,
    paddingTop: 20,
    flexDirection: "column",
    marginBottom: 45,
  },
  price: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  priceView: {
    backgroundColor: "rgba(16, 18, 27, 0.4)",
    marginVertical: -25,
    borderRadius: 20,
    alignSelf: "center",
    height: 20,
    width: "90%",
  },
  listItem: {
    // paddingTop: 20,
    marginLeft: 15,
    width: "100%",
    height: 100,
  },
  img2: {
    height: 50,
    width: 50,
    borderRadius: 25,
    // borderColor: 'rgba(196, 196, 196, 0.51)',
    // borderWidth: 4,
    marginLeft: 3,
  },
  BackButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 10,
  },
  Heart: {
    alignSelf: "flex-end",
    marginHorizontal: 160,
    bottom: 15,
  },
  VideoContainer: {
    borderRadius: 20,
    width: 325,
    height: 490,
    backgroundColor: "blue",
    alignSelf: "center",
    marginTop: -95,
  },
});

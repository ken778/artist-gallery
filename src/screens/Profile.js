import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  TextInput,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, firestore, storageRef } from "../../Firebase";
import Toast from "react-native-simple-toast";
import { globalStyles } from "../assets/styles/GlobalStyles";

const background = require("../assets/images/home.png");

export default function UserProfile({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState("");
  const [userName, setUserName] = useState(`${route.params.artistName}`);
  const [description, setDescription] = useState(`${route.params.description}`);
  const [imageUri, setimageUri] = useState(`${route.params.photoUrl}`);
  const [submit, setSubmit] = useState(false);
  // const [photoUrl, setPhotoUrl] = useState("");

  const { artistName, artistUid, photoUrl } = route.params;

  const openImageLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSubmit(!submit);
      //setimageUri(result.uri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed!"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const ref = storageRef.child(new Date().toISOString());
      const snapshot = (await ref.put(blob)).ref
        .getDownloadURL()
        .then((imageUrl) => {
          setimageUri(imageUrl);
          console.log(
            imageUrl,
            "this is setting the image too storage before 3"
          );

          blob.close();
          setSubmit(false);
        });
    } else {
      setimageUri(result.uri);
    }
  };

  const updateUser = () => {
    firestore
      .collection("artists")
      .doc(artistUid)
      .update({
        artistName: userName,
        photoUrl: imageUri,
        timeStamp: new Date().toISOString(),
        description: description,
      })
      .then(() => {
        Toast.show(
          "you have successfully update your profile",
          Toast.LONG,
          Toast.CENTER
        );
        setModalOpen(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const signoutUser = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          Toast.show("You have signed out!", Toast.LONG, Toast.CENTER);
          navigation.replace("Splash");
        })
        .catch((error) => alert(error));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <ImageBackground source={background} style={globalStyles.backgroundImg}>
        <View style={{ top: 135 }}>
          <Modal visible={modalOpen}>
            <View style={styles.modalContainer}>
              <View style={styles.closeBtnContaainer}>
                <EvilIcons
                  onPress={() => setModalOpen(false)}
                  name="close"
                  size={35}
                  color="white"
                />
              </View>

              <View style={styles.editprofileImgContainer}>
                <Image
                  source={{ uri: `${imageUri}` }}
                  style={styles.uploadedImage}
                />
                {!submit ? (
                  <AntDesign
                    onPress={() => openImageLibrary()}
                    style={styles.imgAddIcon}
                    name="pluscircle"
                    size={35}
                    color="#E3E3E3"
                  />
                ) : (
                  <ActivityIndicator
                    style={{ alignSelf: "center", position: "absolute" }}
                    color="black"
                    size="small"
                  />
                )}
              </View>

              <TextInput
                placeholder="Edit Username"
                placeholderTextColor="gray"
                value={`${userName}`}
                onChangeText={(artistName) => setUserName(artistName)}
                style={styles.editUserInput}
              />
              <TextInput
                placeholder="description"
                placeholderTextColor="gray"
                value={`${description}`}
                onChangeText={(description) => setDescription(description)}
                style={styles.editUserInput}
              />
              <TouchableOpacity style={styles.updateBtn} onPress={updateUser}>
                <Text style={styles.modalText}>Update</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <View style={styles.profileImgContainer}>
            <Image source={{ uri: `${photoUrl}` }} style={styles.profileImg} />
            <Text style={styles.userNameText}>{artistName}</Text>

            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={styles.editBtn}
            >
              <Text style={styles.btnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Terms")}
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 70,
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <MaterialIcons
                name="notes"
                size={24}
                color={"#0E1822"}
                style={{
                  marginHorizontal: 10,
                  overflow: "hidden",
                  color: "#0E1822",
                }}
              />
              <Text
                style={{
                  color: "#0E1822",
                  alignSelf: "center",
                  marginHorizontal: 30,
                }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 70,
                flexDirection: "column",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 20,
                marginVertical: 15,
              }}
            >
              <Text
                style={{
                  color: "#0E1822",
                  fontSize: 16,
                  fontWeight: "600",
                  marginVertical: 10,
                }}
              >
                App Version
              </Text>
              <Text style={{ color: "gray", fontSize: 12, marginVertical: -5 }}>
                v1.0.0
              </Text>
            </View>
            <TouchableOpacity
              onPress={signoutUser}
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 70,
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 20,
                // marginVertical: 10,
              }}
            >
              <AntDesign
                name="logout"
                size={24}
                color={"#0E1822"}
                style={{
                  marginHorizontal: 10,
                  overflow: "hidden",
                  color: "#0E1822",
                }}
              />
              <Text
                style={{
                  marginHorizontal: 80,
                  color: "#0E1822",
                  alignSelf: "center",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: "100%",
    height: "100%",
  },

  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    bottom: 85,
  },

  profileImgContainer: {
    width: "80%",
    height: 215,
    borderRadius: 15,
    backgroundColor: "#E3E3E3",
    alignSelf: "center",
    alignItems: "center",
    top: 65,
  },

  topLeftIcon: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#0E1822",
    width: 45,
    height: 45,
    margin: 25,
  },

  userNameText: {
    color: "#000",
    fontSize: 20,
    bottom: 75,
  },

  editBtn: {
    width: 120,
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    bottom: 70,
  },

  btnText: {
    color: "white",
    fontSize: 16,
  },

  optionsContainer: {
    top: 85,
  },

  modalContainer: {
    width: "85%",
    height: 520,
    backgroundColor: "#E3E3E3",
    borderRadius: 15,
    alignSelf: "center",
    top: 30,
    alignItems: "center",
    paddingVertical: 15,
  },

  editprofileImgContainer: {
    width: 200,
    height: 200,
    borderRadius: 150,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },

  editUserInput: {
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 65,
    borderRadius: 15,
    marginVertical: 20,
    backgroundColor: "white",
    color: "#000",
  },

  updateBtn: {
    width: 220,
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  modalText: {
    fontSize: 18,
    color: "white",
  },

  closeBtnContaainer: {
    width: 37,
    height: 37,
    backgroundColor: "#FF5353",
    borderRadius: 18.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    right: 15,
  },

  uploadedImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imgAddIcon: {
    position: "absolute",
  },

  flatlist: {
    height: 280,
  },
});

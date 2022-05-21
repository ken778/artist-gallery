import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, firestore, storageRef } from "../../Firebase";
import Toast from "react-native-simple-toast";
import ProductModal from "../assets/components/ProductModal";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const placeholder = require("../assets/images/index.png");

export default function Products({ navigation }) {
  //
  const [imageUri, setimageUri] = useState("");
  const [submit, setSubmit] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [artPrice, setArtPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [imageUid, setImageUid] = useState("");

  const [modalVisible1, setModalVisible1] = useState(false);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [title, setExhibition] = useState("");
  //date
  // const [date, setDate] = useState(
  //   moment(new Date().toISOString()).format("YYYY-MM-DD")
  // );
  // const [open, setOpen] = useState(false);
  //

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
          blob.close();
          setSubmit(false);
        });
    } else {
      setimageUri(result.uri);
      setSubmit(false);
    }
  };

  const validateExhibition = () => {
    const pattern = /^[a-zA-Z]{2,40} ( [a-zA-Z]{2,40})+$/;
    if (!pattern.test(address)) {
      Toast.show(
        "Email and Password cannot be empty",
        Toast.LONG,
        Toast.CENTER
      );
    } else if (!pattern.test(imageUri)) {
      Toast.show(
        "Email and Password cannot be empty",
        Toast.LONG,
        Toast.CENTER
      );
    } else if (!pattern.test(title)) {
      Toast.show(
        "Email and Password cannot be empty",
        Toast.LONG,
        Toast.CENTER
      );
    } else if (!pattern.test(description)) {
      Toast.show(
        "Exhibition description cannot be empty or less than two words",
        Toast.LONG,
        Toast.CENTER
      );
    } else if (!pattern.test(date)) {
      Toast.show("Date cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (!pattern.test(artPrice)) {
      Toast.show("art empty", Toast.LONG, Toast.CENTER);
    } else if (title == "") {
      Toast.show("Exhibition title cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (date == "") {
      Toast.show("Exhibition date cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (address == "") {
      Toast.show("Address cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (description == "") {
      Toast.show(
        "Exhibition Description cannot be empty",
        Toast.LONG,
        Toast.CENTER
      );
    } else if (title == "") {
      Toast.show("Exhibition title cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (imageUri == "") {
      Toast.show(
        "Please Upload the exhibition Image",
        Toast.LONG,
        Toast.CENTER
      );
    } else {
      exhitionDetails();
    }
  };

  // add to exhibition collection
  const exhitionDetails = async () => {
    const artistUid = auth?.currentUser?.uid;
    setModalVisible1(!modalVisible1);
    await firestore
      .collection("exhibition")
      .add({
        artistUid: artistUid,
        exhibitionImage: imageUri,
        address: address,
        description: description,
        exhibitionTitle: title,
        date: date,
      })
      .then((docSnap) => {
        docSnap.update({
          exhibitionUid: docSnap.id,
        });
      });
  };

  //
  const [artist, setArtist] = useState([]);

  const getArtUrl = () => {
    const artistUid = auth?.currentUser?.uid;

    return firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .onSnapshot((snapShot) => {
        const query = snapShot.docs.map((docSnap) => docSnap.data());
        setArtist(query);
      });
  };
  useEffect(() => {
    getArtUrl();

    return () => getArtUrl();
  }, []);

  //
  return (
    <ScrollView horizontal={true} style={styles.container}>
      <View style={styles.ScrollViewContainer}>
        <View style={styles.ImagePickerStyle}>
          <Text style={styles.HeaderText}>Upload Art to Market</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons
              name="add-photo-alternate"
              size={150}
              color={"gray"}
            />
          </TouchableOpacity>

          <Text style={styles.HeaderText}>Upload Exhibition Details</Text>
          <TouchableOpacity onPress={() => setModalVisible1(true)}>
            <MaterialIcons name="list-alt" size={150} color={"gray"} />
          </TouchableOpacity>
        </View>

        {modalVisible && (
          <ProductModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}

        <FlatList
          horizontal
          showsHorizontalIndicator={false}
          data={artist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem2}>
                <Image source={{ uri: item.artUrl }} style={styles.img} />
              </View>
            );
          }}
        />
        {/* Exhibition Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(!modalVisible1);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ left: 135, bottom: 25 }}>
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color="#ceb89e"
                  onPress={() => setModalVisible1(!modalVisible1)}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#ceb89e",
                  fontSize: 25,
                  bottom: 55,
                }}
              >
                Add Exhibition
              </Text>
              <View style={{ bottom: 45 }}>
                <TouchableOpacity>
                  {imageUri == "" ? (
                    <>
                      <Image source={placeholder} style={styles.image} />
                    </>
                  ) : (
                    <>
                      <Image source={{ uri: imageUri }} style={styles.image} />
                    </>
                  )}
                  {!submit ? (
                    <MaterialIcons
                      onPress={() => openImageLibrary()}
                      name="camera"
                      size={24}
                      color="#ceb89e"
                      style={{ marginLeft: 80, marginTop: -25 }}
                    />
                  ) : (
                    <ActivityIndicator
                      style={{
                        alignSelf: "center",
                        position: "absolute",
                        marginVertical: 50,
                      }}
                      color="black"
                      size="small"
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ bottom: 35 }}>
                <View style={styles.TextField}>
                  <View style={{ flexDirection: "row", marginHorizontal: 3 }}>
                    <Text
                      style={{
                        flexDirection: "row",
                        color: "#ceb89e",
                        marginHorizontal: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Exhibition Title:
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(title) => setExhibition(title)}
                    //value={name}
                    placeholder="Enter Exhibition title"
                  />
                </View>

                <View style={styles.TextField}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginHorizontal: 3,
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        color: "#ceb89e",
                        marginHorizontal: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Date:
                    </Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    onChangeText={(date) => setDate(date)}
                    //value={name}
                    placeholder="Enter Exhibition Date"
                  />
                </View>

                <View style={styles.TextField}>
                  <View style={{ flexDirection: "row", marginHorizontal: 3 }}>
                    <Text
                      style={{
                        flexDirection: "row",
                        color: "#ceb89e",
                        marginHorizontal: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Address:
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(address) => setAddress(address)}
                    //value={price}
                    placeholder="Enter Address"
                  />
                </View>
                <View style={styles.TextField}>
                  <View style={{ flexDirection: "row", marginHorizontal: 3 }}>
                    <Text
                      style={{
                        flexDirection: "row",
                        color: "#ceb89e",
                        marginHorizontal: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Description:
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(description) => setDescription(description)}
                    //value={price}
                    placeholder="Enter Art Description"
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={exhitionDetails}>
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const ProfilePic = require("../assets/images/Ellipse.png");

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  img: {
    height: 500,
    width: 310,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  listItem2: {
    flexDirection: "row",
    marginHorizontal: 10,
    // left: 20
  },
  ImagePickerStyle: {
    height: 500,
    width: 310,
    borderRadius: 15,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
    // left: 15,
    marginLeft: 15,
    borderColor: "gray",
  },
  ScrollViewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    height: 670,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#ceb89e",
    marginHorizontal: 120,
    borderRadius: 20,
    width: 100,
    height: 40,
    justifyContent: "center",
    marginVertical: -25,
    //borderWidth: 1
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#ceb89e",
    marginHorizontal: 120,
    borderRadius: 20,
    width: 100,
    height: 40,
    justifyContent: "center",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  TextField: {
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    height: 95,
    width: 250,
    padding: 10,
    paddingTop: 3,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ceb89e",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    color: "#ceb89e",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 200,
    borderWidth: 2,
    backgroundColor: "gray",
  },
  HeaderText: {
    fontSize: 25,
    color: "#ceb89e",
  },
});

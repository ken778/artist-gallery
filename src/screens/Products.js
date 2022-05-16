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
import { auth, firestore, storage } from "../../Firebase";
import Toast from "react-native-simple-toast";

export default function Products({ navigation }) {
  //
  const [imageUri, setimageUri] = useState("");
  const [submit, setSubmit] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [artType, setArtType] = useState("");
  const [artName, setArtName] = useState("");
  const [artPrice, setArtPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [artSize, setArtSize] = useState(0);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [title, setExhibition] = useState("");

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

  // add to market collection and update artist collection
  const artistArtDetails = async () => {
    const artistUid = auth?.currentUser?.uid;
    setModalVisible(!modalVisible);

    await firestore
      .collection("Market")
      .add({
        ArtistUid: artistUid,
        artUrl: imageUri,
        artType: artType,
        description: description,
        artName: artName,
        artSize: artSize,
        price: parseFloat(artPrice),
      })
      .then((docSnap) => {
        docSnap.update({
          ImageUid: docSnap.id,
        });
      })
      .then(() => {
        update(imageUri, artName, artType);
      });
    alert("you have successfully update your Market");
  };

  const update = async (imageUri, artName, artType) => {
    const artistUid = auth?.currentUser?.uid;

    try {
      await firestore.collection("artists").doc(artistUid).update({
        artUrl: imageUri,
        artName: artName,
        artType: artType,
        artSize: artSize,
      });
    } catch (error) {
      alert(error);
    }
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ left: 135, bottom: 25 }}>
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color="#ceb89e"
                  onPress={() => setModalVisible(!modalVisible)}
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
                Upload Your Art
              </Text>

              <View style={{ bottom: 45 }}>
                <TouchableOpacity>
                  <Image source={{ uri: imageUri }} style={styles.image} />
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
                      style={{ alignSelf: "center", position: "absolute" }}
                      color="black"
                      size="small"
                    />
                  )}
                </TouchableOpacity>
              </View>

              <ScrollView style={{ bottom: 30 }}>
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
                      Art Type:
                    </Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    onChangeText={(artType) => setArtType(artType)}
                    //value={name}
                    placeholder="Enter Art Type"
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
                      Art Name:
                    </Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    onChangeText={(artName) => setArtName(artName)}
                    //value={name}
                    placeholder="Enter Art Name"
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
                      Price:
                    </Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    onChangeText={(artPrice) => setArtPrice(artPrice)}
                    //value={price}
                    placeholder="Enter Art Price"
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
                      Art Size:{" "}
                    </Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    onChangeText={(artSize) => setArtSize(artSize)}
                    //value={price}
                    placeholder="Enter Art Size"
                  />
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.button}
                onPress={artistArtDetails}
              >
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
                Upload Exhibition Details
              </Text>

              <View style={{ bottom: 45 }}>
                <TouchableOpacity>
                  <Image source={{ uri: imageUri }} style={styles.image} />
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
                      style={{ alignSelf: "center", position: "absolute" }}
                      color="black"
                      size="small"
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={{ bottom: 30 }}>
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
    marginVertical: -20,
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

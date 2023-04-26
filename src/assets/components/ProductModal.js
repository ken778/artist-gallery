import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  image,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, firestore, storageRef } from "../../../Firebase";
// import Toast from "react-native-simple-toast";

const placeholder = require("../images/index.png");

export default function ProductModal({ navigation, isVisible, onClose }) {
  const [submit, setSubmit] = useState(false);
  const [imageUri, setimageUri] = useState("");
  const [modalVisible, setModalVisible] = useState(isVisible);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [artType, setArtType] = useState("");
  const [artName, setArtName] = useState("");
  const [artPrice, setArtPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [artSize, setArtSize] = useState(0);
  const [imageUid, setImageUid] = useState("");

  const openImageLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
   
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
          // blob.close();
          setSubmit(false);
        });
    } else {
      setimageUri(result.uri);
      setSubmit(false);
    }
  };

  const validateProducts = () => {
    const pattern = /^[a-zA-Z]{2,40} ( [a-zA-Z]{2,40})+$/;
    if (imageUri == "") {
      // Toast.show("Please Upload your Art Image", Toast.LONG, Toast.CENTER);
    } else if (description == "") {
      // Toast.show(
      //   "Art description should be at least 150 characters/words",
      //   Toast.LONG,
      //   Toast.CENTER
      // );
    } else if (artType == "") {
      // Toast.show(
      //   "art type should not be empty or less than two characters",
      //   Toast.LONG,
      //   Toast.CENTER
      // );
    } else if (artName == "") {
      // Toast.show(
      //   "art name should not be empty or less than two characters",
      //   Toast.LONG,
      //   Toast.CENTER
      // );
    } else if (artPrice == "") {
      // Toast.show("Art price cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (artSize == "") {
      // Toast.show(
      //   `your art size should be for example "1080x1080"`,
      //   Toast.LONG,
      //   Toast.CENTER
      // );
    } else {
      artistArtDetails();
    }
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
        timeStamp: new Date().toISOString(),
        isEnabled: false,
      })
      .then((docSnap) => {
        docSnap.update({
          ImageUid: docSnap.id,
        });
      });

    alert("you have successfully update your Market");
  };

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [modalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 1000 - 720],
  });

  return (
    <>
   
        <View>
     <KeyboardAvoidingView behavior="height">
     <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisible}
       onRequestClose={() => {
         setModalVisible(!modalVisible);
       }}
     >
      <ScrollView>
      <View style={styles.centeredView}>
         <View style={styles.modalView}>
           <View style={{ left: 135, bottom: 25 }}>
             <AntDesign
               name="closecircleo"
               size={24}
               color="#ceb89e"
               onPress={() => setModalVisible(false)}
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
                 multiline={true}
                 numberOfLines={2}
                 textAlignVertical = "top"
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
                 keyboardType="phone-pad"
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
                     marginTop: 14,
                   }}
                 >
                   Description:
                 </Text>
               </View>

               <TextInput
                 style={styles.input}
                 multiline={true}
                 numberOfLines={3}
                 textAlignVertical = "top"
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
            
           
           

           <TouchableOpacity style={styles.button} onPress={validateProducts}>
             <Text style={styles.textStyle}>Add</Text>
           </TouchableOpacity>
         </View>
       </View>
      </ScrollView>
    
      
     </Modal>
     </KeyboardAvoidingView>
     
  
     
     </View>
 
    
    </>
   
  );
}

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
    height: 790,
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
    marginTop:8,
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
 
    margin: 12,
   
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

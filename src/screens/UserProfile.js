import React, { useEffect, useState,useRef } from "react";
import { FlatGrid } from 'react-native-super-grid';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar, 
  Alert
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';

import {Video}  from "expo-av";

import * as ImagePicker from "expo-image-picker";
import { auth, firestore, storageRef } from "../../Firebase";
// import Toast from "react-native-simple-toast";
import { globalStyles } from "../assets/styles/GlobalStyles";
import ProfileScreen from "./ProfileScreen";
import { LogBox } from 'react-native';
import LoadingSpinner from "../assets/components/LoadingSpinner";

LogBox.ignoreLogs(['Setting a timer']);

const background = require("../assets/images/home.png");
const staticImage =  require("../assets/images/home.png");

 function UserProfile({ route, navigation }) {



 const placeHolderImage = "https://www.seekpng.com/png/full/966-9665317_placeholder-image-person-jpg.png"
  const image = "https://cdn.shopify.com/s/files/1/1276/6549/products/AmandiArtwork-Front_800x.jpg?v=1642510318";
  //   const products = [
  //   {brand:"john Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"20",productImage:image},
  //   {brand:"john Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"70",productImage:image},
  //   {brand:"john Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"50",productImage:image},
  //   {brand:"kenneth Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"40",productImage:image},
  //   {brand:"thabo Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"20",productImage:image},
  //   {brand:"percy Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"20",productImage:image},
  //   {brand:"percy Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"20",productImage:image},
  //   {brand:"percy Jacobs", type:"Eyeclasses", name:"john blue Glasses", price:"20",productImage:image},
  // ]
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState("");
  const [userName, setUserName] = useState(`${route.params.artistName}`);
  const [description, setDescription] = useState(`${route.params.description}`);
  const [imageUri, setimageUri] = useState(`${route.params.photoUrl}`);
  const [submit, setSubmit] = useState(false);
  const [introClip, setIntroClip] = useState('');
  // const [photoUrl, setPhotoUrl] = useState("");
  const [artist, setArtist] = useState([]);
  const { artistName, artistUid, photoUrl } = route.params;
  const [userDetails, setUserDetails] = useState({})
  //video
  const video = React.useRef(null);
  const secondVideo = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [statusSecondVideo, setStatusSecondVideo] = React.useState({});
  const [vid, setVid] = useState("")
  const [introVid, setIntroVid] = useState(
    [""]
  )
  const [modalVisible1, setModalVisible1] = useState(false);
  const [bio, setBio] = useState('')
  const [empty, setEmpty] = useState(false)

  //testing video
  const [clip,setClip] = useState('')
  const [userId, setUserId] = useState('')
 
  
 const [items, setItems] = useState([
  { name: 'TURQUOISE', code: '#1abc9c' },
  { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#3498db' },
  { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' },
  { name: 'GREEN SEA', code: '#16a085' },
  { name: 'NEPHRITIS', code: '#27ae60' }])

  console.log(items)
  console.log(introVid.length)
    

  //getting artist 
  const getArtUrl = () => {
    const artistUid = auth?.currentUser?.uid;

    return firestore
      .collection("Market")
      .where("artistUid", "==", artistUid)
      .onSnapshot((snapShot) => {
        const query = snapShot.docs.map((docSnap) => docSnap.data());
        setArtist(query);


      });


  };

  //get video from backend
  const displayVid = () => {
    const artistUid = auth?.currentUser?.uid;
    setIsLoading(true)
    return firestore.collection("introduction").where("artistUid", "==", artistUid)
      .onSnapshot((snapShot) => {
        const query = snapShot.docs.map((docSnap) => docSnap.data());
       console.log('video arr',query)
 
        // console.log('intro video link', query[0].introductionVideo)
       console.log('query lenfth,' , query.length)
         if(query.length >0){
          setIsLoading(false)
          setIntroVid(query[0].introductionVideo)
         }
         if(query.length ==0){
          setIntroVid("")
          setIsLoading(false)
         }

      


      })
  }

     //fetching data from firebase
     const getUserData = ()=>{
      const artistUid = auth?.currentUser?.uid;
      console.log('rrrrrr',artistUid)
      setUserId(artistUid)
  
      return firestore
        .collection("artists")
        .where("artistUid", "==", artistUid)
        .onSnapshot((snapShot) => {
          const query = snapShot.docs.map((docSnap) => docSnap.data());
          //setAmount(query);
  
         console.log('details',query)
          setBio(query[0].bio)
         if(query[0]){
          setUserDetails(query[0])
          setIntroClip(query[0].introClip)
         
          console.log('something',query)
         }else{
           console.log('nothing',query)
  
         }
         
        });    
    }

  useEffect(() => {
 

    // return firestore.collection('introduction').get()
    // .then((snap) => {
    //    if(!snap.empty) {
    //       // work with documents
    //       console.log('exists')
    //       displayVid();

    //    } else {
    //      // Create some documents
    //      console.log('no')
    //    }
    // })
    getUserData()

     
  

    // return () =>  displayVid();
  }, [])

   console.log('user data',userDetails)
   console.log('user id',userId)
  
 
  useEffect(() => {
   
    getArtUrl();
    // return () => getArtUrl();
    
    

  }, []);
  console.log(artist)






  //picking video
  const getVideo = async () => {
    setIsLoading(true)
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
      //loader
      setIsLoading(true);
      const ref = storageRef.child(new Date().toISOString());
      const snapshot = (await ref.put(blob)).ref
        .getDownloadURL()
        .then((vid) => {
          setVid(vid);
         
          console.log( vid, "this is setting the video to storage");
          console.log('video url from firebase', vid)
          console.log('i ran afterwards')
          //displaying video from firebase
           setIsLoading(false)

           //commented out

           //introVideo(vid)


           //uploading a clipVid
           vidClip(vid).then(()=>{
            
        

            setIntroClip(vid)
           

           }).catch((error)=>{
            // alert('vid not updated!')
            Alert.alert(
              "Failed",
              "Failed to upload a video.",
              [
               
                { text: "OK" }
              ]
            );
             console.log(error)
           })


          // blob.close();
          setSubmit(false);
        }).then(() => {
          console.log('i ran afterwards')
     
          //adding video function

        });
    } else {
      // setVid(result.uri);
    
    }
  };


  //adding video to firebase
  const introVideo = async (yu) => {
    const artistUid = auth?.currentUser?.uid;
    
    await firestore.collection('introduction').doc(artistUid).set({
      artistUid: artistUid,
      introductionVideo: yu,

    }).then(() => {
      console.log('file added')
      setIsLoading(false)
      
  
    })
  }

  const vidClip = async(link)=>{
    firestore
    .collection("artists")
    .doc(artistUid)
    .set({
      artistName: userName,
      photoUrl: imageUri,
      timeStamp: new Date().toISOString(),
      bio: bio,
      introClip: link,
      artistUid:userId
      
    }).then(()=>{
        // alert('updated')
    }).catch((error)=>{
         console.log(error)
    })
  }


  //
  const openImageLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
          console.log(
            imageUrl,
            "this is setting the image too storage before 3"
          );

          // blob.close();
          setSubmit(false);
        });
    } else {
      //saving url from 
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
        bio: bio,

      })
      .then(() => {
        // Toast.show(
        //   "you have successfully update your profile",
        //   Toast.LONG,
        //   Toast.CENTER
        // );
        Alert.alert(
          "success",
          "you have successfully update your profile",
          [
           
            { text: "OK" }
          ]
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
          // Toast.show("You have signed out!", Toast.LONG, Toast.CENTER);

           navigation.replace("Onboarding");
          
        })
        .catch((error) => alert(error));
    } catch (e) {
      console.log(e);
    }
  };
//checking if the video is there or not 
  if(introClip===undefined){
   console.log('undefined')

   
  }else{
     console.log('available')
 
  }

//  console.log('testing',empty)

  return (
      <>
       <ImageBackground source={background} style={globalStyles.backgroundImg}>
           {/* The video view */}
           {
            isLoading ? <LoadingSpinner/> : introClip === undefined || introClip.length<=0 ? 
            <View style ={{marginTop:70, padding:20, textAlign:"center"}}> 
            <Text style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20
            }}>Your 30 sec introduction video will appear here</Text>
              <Text style={{marginHorizontal:5, alignSelf:"center"}}>You can upload a video by using the button below</Text>
              

               


          </View>
            
            : <View style={{marginTop:70}}>
       
       < Video 
             
             style={styles.videoPlaye}
               ref={video}
               source={{ uri: `${introClip}` }}
               useNativeControls
               resizeMode="contain"
               
 
             />
             

          </View>
           }



           {/* {
            isLoading? <LoadingSpinner/> :  introClip.length <=0 || introClip === 'undefined' ?(
              <View style ={{marginTop:70, padding:20, textAlign:"center"}}> 
              <Text style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20
              }}>Your 30 sec introduction video will appear here</Text>
                <Text style={{marginHorizontal:5, alignSelf:"center"}}>You can upload a video by using the button below</Text>
                
  
                 
  
  
            </View>
            ):(
              <View style={{marginTop:70}}>
              <Video style={styles.videoPlaye}
                ref={video}
                source={{ uri: `${introClip}` }}
                useNativeControls
                resizeMode="contain"
  
  
              />
  
  
  
  
            </View>
            )
           } */}

           {
           
           }
          

          <View style={styles.videoButtons}>
              <View>
              <TouchableOpacity onPress={() => introVideo()}>
                <Entypo onPress={() => getVideo()}
                  name="video-camera"  size={24} color="black" style={{alignSelf:'center'}} />
              </TouchableOpacity>
              </View>

             
            </View> 
           

           {/* profile details view*/}
           <TouchableOpacity onPress={() => setModalOpen(true)}>
           <View style={styles.profileNames}  >
              <View>
                <Image style={{ width: 50, height: 50, borderWidth: 2, borderColor: 'red', borderRadius:50 }} source={{ uri: `${photoUrl}` }} />
              </View>
              <View>
                <Text style={styles.profileName}>{artistName}</Text>
              </View>
            </View>
            
           </TouchableOpacity>

           
              {/* End of profile view */}
               {/* Bio view */}
          <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignSelf: 'center' }}>
            <View>
              <Text style={{ padding: 10, width: 200 }}>{bio}
              </Text>
            </View>
          </View>
          {/* images heading */}
         
        {/* the end of Bio view */}
        
        {/*The buttons View */}
         <View></View>
        {/*The end of buttons View */}
        
          
          <View>

            <Modal visible={modalOpen}
            >
              <ScrollView>
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
                  {
                    imageUri ?  <Image
                   
                    source={{ uri: `${imageUri}` }}
                    style={styles.uploadedImage}
                      resizeMode='cover'

                  /> : <Image
                   
                  source={{ uri: `${placeHolderImage} `}}
                  style={styles.uploadedImage}
                  resizeMode='contain'
                /> 
                  }
                 
                  {!submit ? (
                    <AntDesign
                      onPress={() => openImageLibrary()}
                      style={styles.imgAddIcon}   
                      name="pluscircle"
                      size={35}
                      color="black"
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
                 multiline={true}
                 numberOfLines={5}
                 textAlignVertical = "top"
                  placeholder="Bio"
                  placeholderTextColor="gray"
                  value={`${bio}`}
                  onChangeText={(bio) => setBio(bio)}
                  style={styles.editUserInputBio}
                />
                <TouchableOpacity style={styles.updateBtn} onPress={updateUser}>
                  <Text style={styles.modalText}>Update</Text>
                </TouchableOpacity>
              </View>
              </ScrollView>
            </Modal>
            

           




          </View>
        





         


          <View style={styles.optionsContainer}>
            {/* uploaded art View*/}
            <TouchableOpacity  onPress={() => navigation.navigate("Arts")}>
            <View  style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                justifyContent:"space-around",
                borderRadius: 20,
                marginVertical: 15,
                marginTop:-5
              }}>
                   <View style={{alignSelf:"auto",width:'20%'}} >
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
                   </View>
                   <View  style={{width:"70%"}}>
                   <Text style={{alignSelf:"flex-start"}}>  Aploaded Art</Text>
                   </View>

            </View>
            </TouchableOpacity>
            {/* Terms and conditions View */}
            <TouchableOpacity  onPress={() => navigation.navigate("Terms")}>
            <View  style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                justifyContent:"space-around",
                borderRadius: 20,
                marginVertical: 15,
              }}>
                   <View style={{alignSelf:"auto",width:'20%', }} >
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
                   </View>
                   <View  style={{width:"70%"}}>
                   <Text style={{alignSelf:"flex-start"}}>   Terms & Conditions</Text>
                   </View>

            </View>
            </TouchableOpacity>
            
           
            {/* app vision View */}
            
            <View
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
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
                  marginVertical: 8,
                  marginRight:50,
                }}
              >
                App Version
              </Text>
              <Text style={{ color: "gray", fontSize: 12, marginVertical: -8, marginRight:50}}>
                v1.0.0
              </Text>
            </View>
           {/* logout View */}
           <TouchableOpacity   onPress={signoutUser}>
           <View  style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                justifyContent:"space-around",
                borderRadius: 20,
                marginVertical: 15,
              }}>
                   <View style={{alignSelf:"auto",width:'20%',}} >
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
                   </View>
                   <View  style={{width:"70%"}}>
                   <Text style={{alignSelf:"flex-start"}}>      Logout</Text>
                   </View>

            </View>
            </TouchableOpacity>
           
          



          {/* another button */}
          {/* <TouchableOpacity
              onPress={signoutUser}
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
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
                 marginRight:4
                }}
              >
                   Logout
              </Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity  onPress={() => navigation.navigate("Arts")}>
          <View
          
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
                flexDirection: "row",
                justifyContent:"space-evenly",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 20,
                marginVertical: 15,
              }}
            >
                <MaterialIcons
                name="notes"
                size={24}
                color={"#0E1822"}
                style={{  
                  marginHorizontal: 10,
                  marginLeft:-70,
                  overflow: "hidden",
                  color: "#0E1822",
                }}
              />
              <Text
                style={{
                  color: "#0E1822",
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop:5,
                  marginRight:25
              
                }}
              >
               Aploaded Art
              </Text>
              
            </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Terms")}
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
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
            </TouchableOpacity> */}
           
            
            {/* <TouchableOpacity
              onPress={signoutUser}
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 50,
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
            </TouchableOpacity> */}
          </View>

  
       </ImageBackground>
      
    
     
      
     
   
    </>
    
  );
}
export default UserProfile;

const styles = StyleSheet.create({
  backgroundImg: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  profileImg: {
    width: 200,
    height: 200,
    // borderRadius: 100,
    bottom: 85,
  },

  profileImgContainer: {
    width: "80%",
    height: 215,
    // borderRadius: 15,
    backgroundColor: "#E3E3E3",
    alignSelf: "center",
    alignItems: "center",
    top: 65,
  },

  topLeftIcon: {
    borderWidth: 1,
    // borderRadius: 14,
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
  safe : {
    paddingTop: StatusBar.currentHeight,
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
   

  
  },

  modalContainer: {
    width: "85%",
    height: 550,
    backgroundColor: "#E3E3E3",
    borderRadius: 15,
    alignSelf: "center",
    top: 30,
    alignItems: "center",
    paddingVertical: 15,
  },

  

  editUserInput: {
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginVertical: 20,
    backgroundColor: "white",
    color: "#000",
    width:250
  },
  editUserInputBio: {
    borderColor: "black",
    borderWidth: 1,
    width:250,
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 12,
    padding:5
    
  },



  updateBtn: {
    width: 220,
    height: 50,
    backgroundColor: "black",
     borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
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

  editprofileImgContainer: {
    width: 200,
    height: 200,
     borderRadius: 150,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadedImage: {
    width: 200,
    height: 200,
   borderRadius: 150,
    
    
  },
  imgAddIcon: {
    position: "absolute",
  
   right:15,
   bottom:0,
  },

  flatlist: {
    height: 280,
  },
  profileNames: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    justifyContent: 'space-evenly',
    // borderWidth:2,
    padding:10,
  },
  profileName: {
    padding: 12,
    marginLeft: -60,
    fontSize: 20,
    fontWeight:"bold"
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    justifyContent: 'space-around'
  },
  videoButtons: {
    display: 'flex',
    flexDirection: 'row'
  },
  addButton: {
    margin: 5,
    backgroundColor: "#E3E3E3",
  
    width: 200,
    //  borderRadius: 20,
    textAlign: 'center',
    borderRadius: 15,

  },
  videoPlaye: {
    width: '100%',
    height: 150,

  },
  artHeader:{
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-evenly',
    // borderWidth:2

    
  },
  gridView: {
    marginTop: 10,
    flex: 1,
   
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 100,
    borderWidth:1,
    borderColor: "black",
    borderRadius:12
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  videoButtons:{
    marginTop:10,
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: "#E3E3E3",
    width:'70%',
    alignSelf:'center',
    padding:5,
    borderRadius:15
  }

});

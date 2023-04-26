import React, { useEffect } from 'react';
import { Text, View,ImageBackground, StyleSheet,  Image,Modal, Pressable} from 'react-native';
import { globalStyles } from "../assets/styles/GlobalStyles";
import { FlatGrid } from 'react-native-super-grid';
import { useState } from 'react';
import { auth, firestore, storageRef } from "../../Firebase";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";


const background = require("../assets/images/home.png");

const UploadedArt = () => {

  const [modalVisible1, setModalVisible1] = useState(false);
  const [clickedImage, setClickedImage] = useState('')

   const [artist, setArtist] = useState([]);
   const [items, setItems] = useState([{ name: 'Mens Treat', code: '#1abc9c'},
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71' },
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'},
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'},
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'},
   { name: 'Ladies Treat', code: '#2ecc71'},
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'},
   { name: 'Ladies Treat', code: '#2ecc71'},
   { name: 'Ladies Treat', code: '#2ecc71'  },
   { name: 'Ladies Treat', code: '#2ecc71'},
]) 


//getting artist 
const getArtUrl = () => {
   const artistUid = auth?.currentUser?.uid;

   return firestore
     .collection("Market")
     .where("ArtistUid", "==", artistUid)
     .onSnapshot((snapShot) => {
       const query = snapShot.docs.map((docSnap) => docSnap.data());
        setArtist(query)
        console.log(query)


     });
        

 };

 //getiing clicked item
 const getClickedItem = (item) =>{
    console.log('clicked', item)
    setClickedImage(item.artUrl)
 }


useEffect(()=>{

   getArtUrl()
   
},[])




   
    return (
      <>
     <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
        
          <View style={styles.modalView}>
            <View>
            <Text style={styles.closeButton} > <AntDesign
               name="closecircleo"
               size={24}
               color="#ceb89e"
               onPress={() => setModalVisible1(false)}
             /></Text>
            </View>
          
                <View style={{width:'100%', backgroundColor:'orange'}}>
               
                  <Image
                    style={styles.modalImage}
                    source={{
                    uri:clickedImage
                  }}
                  />
                </View>

           
          </View>
        </View>
      </Modal>
     
    </View>
      
       
          <ImageBackground source={background} style={globalStyles.backgroundImg}>
            <View style={styles.mainCont}></View>

            {
              artist.length == 0 ?(

              <View style={styles.message} ><Text style={styles.alert}>Your uploaded art will appear here</Text>
                <Text style={styles.alert2}>This page shows all of your uploaded art on the market.</Text>
              </View>
              ):(


                   <> 

                       <FlatGrid
              itemDimension={80}
              data={artist}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              spacing={20}
              renderItem={({ item }) => (
                <Pressable   onPress={() =>{ getClickedItem(item), setModalVisible1(true)}}>
                     <View style={[styles.box]}>
                
                <View  style={[styles.image]}>
                    <Image source={{ uri: item.artUrl  }}  style={[styles.image]} /> 
                </View>
                <View style={{backgroundColor:"#E3E3E3",borderBottomEndRadius:15,borderBottomLeftRadius:15}}>
                    <Text style={{padding:10}} >{item.artType}</Text>
                </View>
                 
                
               </View>
                </Pressable>
               
              )}
            />

                   </>
              )
            }
           
             
          </ImageBackground>
 
      </>
    );
}





const styles = StyleSheet.create({
  alert2 : {
      textAlign:"center",
      marginTop:40
  },
  alert:{
    textAlign:"center",
    fontSize: 20,
    fontWeight:"bold",
    marginTop:20

  },
  message:{
   width:"80%",
    alignSelf: "center",
  },
   mainCont:{
      marginTop:100
   },
   gridView: {
     marginTop: 10,
     flex: 1,
   },
   itemContainer: {
     justifyContent: 'flex-end',
    
     padding: 10,
     height: 150,
     borderTopLeftRadius:25,
     borderTopRightRadius:25,
     borderBottomLeftRadius:25,
 
 
   },
   itemName: {
     fontSize: 16,
     color: '#fff',
     fontWeight: '600',
     marginLeft:'auto',
     marginRight:'auto',
     marginTop:30
   },
   itemCode: {
     fontWeight: '600',
     fontSize: 12,
     color: '#fff',
   },
   mainPage :{
     backgroundColor:'#383443',
     height:'100%'
   },
   header :{
     
     display:'flex',
     flexDirection:'row',
     justifyContent:'space-between',
     padding:50
   
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
    gridView: {
      marginTop: 10,
      flex: 1,
     
    },
    image:{
      width:"100%",
        height: 110,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
      itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:30
    },
    box:{
      borderWidth: 0.001,
      borderColor:"#E3E3E3",
      borderRadius:15
    },
      
    modalView: {
  
      marginTop: '20%',
       height:200,
      borderRadius: 20,
     
    
      shadowColor: '#000',
   
     
      
    },
    modalImage:{
      width:'100%',
      height: 300,
      // aspectRatio: 1.1,
      resizeMode:'stretch',
      alignSelf:'center'

    },
    closeButton:{
      alignSelf:'flex-end',
       marginRight:10
    }
    
 });
export default UploadedArt;

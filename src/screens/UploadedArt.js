import React, { useEffect } from 'react';
import { Text, View,ImageBackground, StyleSheet,  Image} from 'react-native';
import { globalStyles } from "../assets/styles/GlobalStyles";
import { FlatGrid } from 'react-native-super-grid';
import { useState } from 'react';
import { auth, firestore, storageRef } from "../../Firebase";


const background = require("../assets/images/home.png");

const UploadedArt = () => {

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


useEffect(()=>{

   getArtUrl()
   
},[])




   
    return (
       
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
                <View style={[styles.box]}>
                
                 <View  style={[styles.image]}>
                     <Image source={{ uri: item.artUrl  }}  style={[styles.image]} /> 
                 </View>
                 <View style={{backgroundColor:"#E3E3E3",borderBottomEndRadius:15,borderBottomLeftRadius:15}}>
                     <Text style={{padding:10}} >{item.artType}</Text>
                 </View>
                  
                 
                </View>
              )}
            />

                   </>
              )
            }
           
             
          </ImageBackground>
 
      
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
    }
 });
export default UploadedArt;

import React,{ useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
// import PieChart from "react-native-pie-chart";
//import { LineChart } from "react-native-chart-kit";

import { auth, firestore, storageRef } from "../../Firebase";
import PureChart from 'react-native-pure-chart';
import LoadingSpinner from "../assets/components/LoadingSpinner";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
// import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const screenWidth = Dimensions.get("screen").width;

export default function Sales({ navigation }) {

  const [amount, setAmount] = useState([]);
  const [sold, setSold] = useState()






  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#f44336", "#2196f3", "#ffeb3b", "#4caf50", "#ff9800"];


   //
   const data = [
    {
       "email":"gowtham@outlook.com",
       "firstname":"gowtham",
       "lastname":"ss",
       "password":"outlook010"
    },
    {
       "email":"ss@ss.com",
       "firstname":"ss",
       "lastname":"ss",
       "password":"ss"
    },
    {
       "email":"gow@gow.com",
       "firstname":"gow",
       "lastname":"gow",
       "password":"gow"
    }
 ];
//  const totalPrice = amount.reduce((total, curVal) => {
//   return total + curVal.price;
// }, 0);

//console.log('total',totalPrice);
 let sampleData = [{
  
  data: [
    {x: 'Jan', y: 0},
    {x: 'February', y:0},
    {x: 'March', y: 0},
    {x: 'April', y: 0},
    {x: 'May', y: 0},
    {x: 'June', y: 0},
    {x: 'July', y: 0},
    {x: 'August', y:0},
    {x: 'September', y: 0},
    {x: 'October', y: 0},
    {x: 'November', y: 0},
    {x: 'December', y: 0},
   
  ],
  color: '#297AB1'
},]

const items = [
  { name: 'Bike', price: 100 },
  { name: 'TV', price: 200 },
  { name: 'Album', price: 10 },
  { name: 'Book', price: 5 },
  { name: 'Phone', price: 500 },
  { name: 'Computer', price: 1000 },
  { name: 'Keyboard', price: 25 }
];


 //
//  const prices = [
//   {title:"One",prix:100},
//   {title:"Two",prix:200},
//   {title:"Three",prix:300} 
// ];

 //fetching amout from firebase


//  const getArtUrl = () => {
  
//   const artistUid = auth?.currentUser?.uid;

//   return firestore
//     .collection("Market")
//     .where("ArtistUid", "==", artistUid)
//     .onSnapshot((snapShot) => {
//       const query = snapShot.docs.map((docSnap) => docSnap.data());
//       setAmount(query);
//      console.log('amount',query)
//     });
// };


// const getPayments = () =>{
//   return firestore.collection('payment').where("uuid", '==' , 'eaow7cYStDO4Mc2PrQ8fIoHaIeJ3').onSnapshot((snapShot=>{
//     const query  = snapShot.docs.map((docSnap)=>docSnap.data());
//     console.log("payments", query)


//    query.forEach((re)=>{
//         console.log('res', re.totalAmount)
//    })
  
//     setSold(query)
//   }))
// }





useEffect (() => {
 // getArtUrl();
  //getPayments();


}, []);

//console.log('bought',sold)





  return (

     
    <View style={styles.container}>
     

      
     
       <Text style={styles.marketTotal}>On Market Total Amount</Text>
       <View style={{height:5,backgroundColor:'black', width:'25%',alignSelf:'center',}}></View>
      <View style={styles.AmountContainer}>
        
       
        {/* <Text style={styles.Total}>R{ totalPrice}.00</Text> */}
        

        
      </View>

     


      <TouchableOpacity  onPress={() => navigation.navigate("sold")}>
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
                marginTop:40
              }}>
                   <View style={{alignSelf:"auto",width:'30%'}} >
                   <FontAwesome name="file-photo-o" size={24} color="black"  style={{  
               
                  overflow: "hidden",
                  color: "#0E1822",
                  alignSelf:"center"
                 
                }} />
                   
                   </View>
                   <View  style={{width:"50%"}}>
                   <Text style={{alignSelf:"center"}}>  Sold Items</Text>
                   </View>

            </View>   
      </TouchableOpacity>

      <View><Text style={{alignSelf:'center',paddin:5,marginBottom:-20,paddingTop:20}}>PRODUCT SALES</Text></View>
      
      
      <View style={{height:5,backgroundColor:'black', width:'20%',alignSelf:'center', marginTop:25,}}></View>
      
      <View style={{marginTop:20, width:'97%', marginLeft:'auto', marginRight:'auto', backgroundColor:"yellow"}}>
        
      <PureChart style={styles.Chart} data={sampleData} type='bar' />
      </View>
     
      
    
     

    
     

    </View>
  ); 
}

const styles = StyleSheet.create({
  Chart:{
      height:400,
      backgroundColor: "yellow"
  },
  container: {
    height: "100%",
    width: "100%",
  },
  AmountContainer: {
    backgroundColor: "green",
    justifyContent: "center",
    alignSelf: "center",
    width: "45%",
    height: "10%",
    margin: 20,
    borderRadius: 10,

    
  },
  Total: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
  
  },
  marketTotal:{
    alignSelf:"center",
    padding:10,
    marginTop:15,
    textTransform:"uppercase"
  }
});

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
import moment from "moment";
import Ionicons from '@expo/vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';
// import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const screenWidth = Dimensions.get("screen").width;

export default function Sales({ navigation }) {

  const [amount, setAmount] = useState([]);
  const [sold, setSold] = useState()
  const [june, setJune] = useState([''])
 let date = ''


 //variable
 var januaryAmount = 0;
 var februaryAmount = 0;
 var marchAmount =0;
 var aprilAmount = 0;
 var mayAmount = 0;
 var juneAmount = 0;
 var julyAmount = 0;
 var augustAmount = 0;
 var sepAmount = 0;
 var octoberAmount = 0;
 var novemberAmount = 0;
 var decAmount = 0;

 console.log('sold', sold) 




 

  if (sold !== undefined) {
    sold.forEach((item) => {
      console.log('items', item)
      let d = item.date;
      console.log('ddd', d.slice(3, 5))

      //detimine month
      if (d.slice(3, 5) === '01') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "01")
        console.log('checking', d)

        //calculating monthly amount
        let januaryData = []
        januaryData.push(d)
        try {
          if(d.length<=1){
            januaryAmount = januaryData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for jan is', januaryAmount)
          }else{
            if (januaryData[0]) {
              januaryAmount = januaryData[0].reduce((total, curVal) => {
                return total + parseFloat(curVal.totalAmount);
              }, 0);
              console.log('total for jan is', januaryAmount)
            }
          }
       
        
        } catch (error) {
          console.log('error occured')
        }

        console.log("January")
      } else if (d.slice(3, 5) === '02') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "02")
        console.log('checking', d)

        //calculating monthly amount
        let februaryData = []
        februaryData.push(d)
        try {
          if(d.length<=1){
            februaryAmount = februaryData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for feb is', februaryAmount)
          }else{
            
          if (februaryData[0]) {
            februaryAmount = februaryData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for feb is', februaryAmount)
          }
          }
        
        } catch (error) {
          console.log('error occured')
        }

        console.log("February")
      } else if (d.slice(3, 5) === '03') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "03")
        console.log('checking', d)

        //calculating monthly amount
        let marchData = []
        marchData.push(d)
        try {
          if(d.length<=1){
            marchAmount = aprilData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for march is', marchAmount)
          }else{
            if (marchData[0]) {
              marchAmount = aprilData[0].reduce((total, curVal) => {
               return total + parseFloat(curVal.totalAmount);
             }, 0);
             console.log('total for march is', marchAmount)
           }
          }
         
         
        } catch (error) {
          console.log('error occured')
        }

        console.log("March")
      } else if (d.slice(3, 5) === '04') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "04")
        console.log('checking', d)

        //calculating monthly amount
        let aprilData = []
        aprilData.push(d)
        try {
          if(d.length<=1){
            aprilAmount = aprilData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for april is', aprilAmount)
          }else{
            if (aprilData[0]) {
              aprilAmount = aprilData[0].reduce((total, curVal) => {
               return total + parseFloat(curVal.totalAmount);
             }, 0);
             console.log('total for april is', aprilAmount)
           }
          }
         
         
        } catch (error) {
          console.log('error occured')
        }

        console.log("April")
      } else if (d.slice(3, 5) === '05') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "05")
        console.log('checking', d)

        //calculating monthly amount
        let mayData = []
        mayData.push(d)
        try {
          if(d.length<=1){
            mayAmount = mayData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for may is', mayAmount)
          }else{
            if (mayData[0]) {
              mayAmount = mayData[0].reduce((total, curVal) => {
                  return total + parseFloat(curVal.totalAmount);
                }, 0);
                console.log('total for may is', mayAmount)
              }
          }
         
         
        } catch (error) {
          console.log('error occured')
        }
        console.log("May")
      }
      else if
        (d.slice(3, 5) === '06') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "06")
        console.log('checking', d)

        //calculating monthly amount
        let juneData = []
        juneData.push(d)
        try {
          if(d.length<=1){
            juneAmount = juneData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for june is', juneAmount)
          }else{
            if (juneData[0]) {
              juneAmount = juneData[0].reduce((total, curVal) => {
               return total + parseFloat(curVal.totalAmount);
             }, 0);
             console.log('total for june is', juneAmount)
           }
          }
         
        
        } catch (error) {
          console.log('error occured')
        }

        console.log("June")




      } else if (d.slice(3, 5) === '07') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "07")
        console.log('july data', d.length)

        //calculating monthly amount
        let julyData = []
        julyData.push(d)

        try {
         
          if(d.length<=1){
            julyAmount = julyData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for july is', julyAmount)
          }else{
            if (juneData[0]) {
              julyAmount = julyData[0].reduce((total, curVal) => {
                   return total + parseFloat(curVal.totalAmount);
                 }, 0);
                 console.log('total for july is', julyAmount)
               }
          }
        
         
        } catch (error) {
          console.log('error occured')
        }

        console.log("July")
      } else if (d.slice(3, 5) === '08') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "08")
        console.log('checking', d)

        //calculating monthly amount
        let augustData = []
        augustData.push(d)
        try {
          if(d.length<=1){
            augustAmount = julyData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for august is', augustAmount)
          }else{
            if (augustData[0]) {
              augustAmount = julyData[0].reduce((total, curVal) => {
               return total + parseFloat(curVal.totalAmount);
             }, 0);
             console.log('total for august is', augustAmount)
           }
          }
         
        
        } catch (error) {
          console.log('error occured')
        }
        console.log("August")

      } else if (d.slice(3, 5) === '09') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "09")
        console.log('checking', d)

        //calculating monthly amount
        let sepData = []
        sepData.push(d)
        try {
          if(d.length<=1){
            sepAmount = julyData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for sep is', sepAmount)
          }else{
            if (sepData[0]) {
              sepAmount = julyData[0].reduce((total, curVal) => {
                  return total + parseFloat(curVal.totalAmount);
                }, 0);
                console.log('total for sep is', sepAmount)
              }
          }
         
         
        } catch (error) {
          console.log('error occured')
        }
        console.log("September")

      }
      else if (d.slice(3, 5) === '10') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "10")
        console.log('checking', d)
        //calculating monthly amount
        let octoberData = []
        octoberData.push(d)
        try {
          if(d.length<=1){
            octoberAmount = julyData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for oct is', octoberAmount)
          }else{
            if (octoberData[0]) {
              octoberAmount = julyData[0].reduce((total, curVal) => {
                return total + parseFloat(curVal.totalAmount);
              }, 0);
              console.log('total for oct is', octoberAmount)
            }
          }
        
         
        } catch (error) {
          console.log('error occured')
        }
        console.log("October")
      } else if (d.slice(3, 5) === '11') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "11")
        console.log('checking', d)

        //calculating monthly amount
        let novemberData = []
        novemberData.push(d)
        try {
          if(d.length<=1){
            novemberAmount = novemberData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for oct is', novemberAmount)
          }else{
               
          if (novemberData[0]) {
            novemberAmount = novemberData[0].reduce((total, curVal) => {
             return total + parseFloat(curVal.totalAmount);
           }, 0);
           console.log('total for oct is', novemberAmount)
         }
          }
        
        } catch (error) {
          console.log('error occured')
        }
        console.log("November")
      } else if (d.slice(3, 5) === '12') {
        let d = sold.filter((res) => res.date.slice(3, 5) === "12")
        console.log('checking', d)

        //calculating monthly amount
        let decData = []
        decData.push(d)
        try {
          if(d.length<=1){
            decAmount = decData[0].reduce((total, curVal) => {
              return total + parseFloat(curVal.totalAmount);
            }, 0);
            console.log('total for dec is', decAmount)
          }else{
            if (decData[0]) {
              decAmount = decData[0].reduce((total, curVal) => {
                  return total + parseFloat(curVal.totalAmount);
                }, 0);
                console.log('total for dec is', decAmount)
              }
          }
        
         
        } catch (error) {
          console.log('error occured')
        }
        console.log("December") 

      }

    })
  }


 console.log('outside',juneAmount) 




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
 const totalPrice = amount.reduce((total, curVal) => {
  return total + curVal.price;
}, 0);

console.log('total',totalPrice);
 let sampleData = [{
  
  data: [
    {x: 'Jan', y: januaryAmount},
    {x: 'February', y:februaryAmount},
    {x: 'March', y: marchAmount},
    {x: 'April', y: aprilAmount },
    {x: 'May', y: mayAmount},
    {x: 'June', y: juneAmount},
    {x: 'July', y: julyAmount},
    {x: 'August', y:augustAmount},
    {x: 'September', y: sepAmount},
    {x: 'October', y: octoberAmount},
    {x: 'November', y: novemberAmount},
    {x: 'December', y: decAmount},
   
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


 const getArtUrl = () => {
  
  const artistUid = auth?.currentUser?.uid;

  return firestore
    .collection("Market")
    .where("ArtistUid", "==", artistUid)
    .onSnapshot((snapShot) => {
      const query = snapShot.docs.map((docSnap) => docSnap.data());
      setAmount(query);
     console.log('amount',query)
    });
};


const getPayments = () =>{
  
  const artistUid = auth?.currentUser?.uid;

  return firestore.collection('payment').where("uuid", '==' , artistUid).onSnapshot((snapShot=>{
    const query  = snapShot.docs.map((docSnap)=>docSnap.data());
    //console.log("payments", query)


   query.forEach((re)=>{
        console.log('res', re.totalAmount)
   })
  
    setSold(query)
  })) 
}





useEffect (() => {
  getArtUrl();
  getPayments();


}, []);

//console.log('bought',sold)





  return (

     
    <View style={styles.container}>
     

      
     
       <Text style={styles.marketTotal}>On Market Total Amount</Text>
       <View style={{height:5,backgroundColor:'black', width:'25%',alignSelf:'center',}}></View>
      <View style={styles.AmountContainer}>
        
       
        <Text style={styles.Total}>R{ totalPrice}.00</Text>
        

        
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

      <View><Text style={{alignSelf:'center',padding:5,marginBottom:-20,paddingTop:20}}>PRODUCT SALES</Text></View>
      
      
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

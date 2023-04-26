import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
const LoadingSpinner = () => {
    return (
       
        <View style={{ marginTop: 60, padding: 48 }}>
            <ActivityIndicator size="large" color="brown" />
        </View>
      
    );
}

const styles = StyleSheet.create({
    //  spinner-container:{
    //        display: grid;
    // justify-content: center;
    // align-items: center;
    // height: 350px;
    //  },
    //  loading-spinner:{
    //  	width: 50;
    // height: 50;
    // //border: 10px solid #f3f3f3; /* Light grey */
    // //border-top: 10px solid #383636; /* Blue */
    // borderRadius: 50;
    // animation: spinner 1.5s linear infinite;
    //  }

})

export default LoadingSpinner;

import React, { Component } from 'react'
import { Image, Text, View } from 'react-native-web'

export default class ProfileScreen extends Component {
  render() {


    
    
    // const {name, brand, price, productImage} = this.props.product
    const {artUrl,artType,imageUid} = this.props.product;
    return (
        
        <View style={{ width: '25%', alignItems: 'center', margin: '3%', borderRadius:10 }} key={imageUid} >
            <Image style={{ width: 100, height: 100, borderRadius:10 }} source={{ uri: artUrl }} />
            <Text>{artType}</Text>
        </View>
        
       
     
    )
  }
}


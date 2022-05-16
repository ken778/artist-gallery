import { StyleSheet, Dimensions } from 'react-native';

const globalStyles = StyleSheet.create({
    body: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // SPLASH STYLES
    splashFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    splashLogo: {
       width: 130,
       height: 130 
    },
    splashContainer: {
      height:'100%',
      width: '100%'
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
    },
    appName2: {
        fontSize: 20,
        color: '#000',
    },
    wrongLogo: {
        width: 220,
        height: 200
    },
})

export { globalStyles };
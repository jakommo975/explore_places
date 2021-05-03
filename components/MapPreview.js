import React from 'react';
import {View,Image, StyleSheet, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';



import ENV from '../env';


const MapPreview = props => {
    let imagePreviewUrl;
    if (props.location) {
        imagePreviewUrl= `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.location.lat
        },${
            props.location.lng
        }&zoom=10&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            props.location.lat
        },${
            props.location.lng
        }&key=${ENV.googeApiKey}`;
    }

    return (
        <View style={{...styles.mapPreview, ...props.style}}>
            {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : props.children}
        </View>
    )
}


const styles = StyleSheet.create({
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/colors';
import MapPreview from '../components/MapPreview';
import MyButton from '../components/MyButton';
import * as placesActions from '../store/places-actions';

const PlacesDetailScreen = props => {
    const placeId = props.navigation.getParam('placeId');
    const isFromExplore = props.navigation.getParam('isFromExplore');
    const selectedPlace = useSelector(
        state => {
            if (!isFromExplore){
                return state.places.places.find(place => place.id == placeId)
            }
            else {
                return state.places.onlinePlaces.find(place => place.id == placeId)
            }

        }
    );

    const dispatch = useDispatch();

    const publishHandler = () => {

        dispatch(placesActions.publishPlace(selectedPlace));
        Alert.alert('Place has been published.')
        props.navigation.navigate('Places');
    }
    return <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Image source={{uri: selectedPlace.imageUri}} style={styles.image}/>
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{selectedPlace.address}</Text>
            </View>
            <MapPreview style={styles.mapPreview} location={{lat: selectedPlace.lat, lng: selectedPlace.lng}}></MapPreview>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionHeader}>Descripion:</Text>
            <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
        </View>
        {!isFromExplore && <MyButton style={{width: '95%', marginBottom: 20}} onPress={publishHandler} title="PUBLISH"/>}
    </ScrollView>
}



PlacesDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle'),
        drawerLabel: 'Place Detail',

    }
}


const styles = StyleSheet.create({
    image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
      backgroundColor: '#ccc'
    },
    locationContainer: {
      marginVertical: 20,
      width: '95%',
      //maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      //borderRadius: 10
    },
    addressContainer: {
      padding:0,
      marginVertical: 10
    },
    address: {
      color: Colors.primary,
      textAlign: 'center'
    },
    mapPreview: {
      width: '100%',
      maxWidth: 350,
      height: 220,
      //borderBottomLeftRadius: 10,
      //borderBottomRightRadius: 10
    },
    descriptionContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        marginBottom: 25,
        width: '95%'
    },
    description:{
        fontSize: 16,
        textAlign: 'auto'
    },
    descriptionHeader: {
        width: '100%',
        fontSize: 18,
        textAlign: 'left',
        marginBottom: 4
    }
  });

export default PlacesDetailScreen;
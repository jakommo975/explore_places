import React, { useState, useEffect, useCallback } from 'react';
import {View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors  from '../constants/colors';
import MyButton from './MyButton';
import MapPreview from './MapPreview';

const LocationPicker = props => {
    const [isFeching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const mapPickedLocation = props.navigation.getParam('pickedLocation');
    const {onLocationPicked} = props;

    useEffect(() => {
        if (mapPickedLocation){
            setPickedLocation(mapPickedLocation)
            props.onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked]);

    const verifyLocPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted'){
            Alert.alert('Insuficient permissions!', 'You need to grant access to location.', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyLocPermissions();
        if (!hasPermission){
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (err){
            //Alert.alert('Could not fetch loctation', [{text: 'Okay'}]);
        }
        setIsFetching(false);
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview location={pickedLocation}>
            {
                isFeching ?
                <ActivityIndicator />
                    :
                <Text>No locaton chosen yet.</Text>
            }
            </MapPreview>
            <View style={styles.buttonContainer}>
                <MyButton style={styles.button} title="GET LOCATION" color={Colors.primary} onPress={getLocationHandler}/>
                <MyButton style={styles.button} title="PICK ON MAP" color={Colors.primary} onPress={pickOnMapHandler}/>
            </View>
            
        </View>
    )
}



const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,

    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '48%'
    }
})

export default LocationPicker;
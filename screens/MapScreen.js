import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const MapScreen = props => {
    const [isFetching, setIsFetching] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState();
    const [mapRegion, setMapRegion] = useState();

    const verifyLocPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted'){
            Alert.alert('Insuficient permissions!', 'You need to grant access to location.', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    }
    const getLocationHander = async () => {
        const hasPermission = await verifyLocPermissions();
        if (!hasPermission){
            return;
        }
        
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            setMapRegion ({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } catch (err){
            Alert.alert('Could not fetch loctation', [{text: 'Okay'}]);
        }
        setIsFetching(false);
    }
    useEffect(() => {
        getLocationHander();
    }, [])

    const savePickedLocation = useCallback(() => {
        if (!selectedLocation){
            Alert.alert('Please choose location.');
            return;
        }
        props.navigation.navigate('NewPlace', {
            pickedLocation: selectedLocation
        });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({
            saveLocation: savePickedLocation
        });
    }, [savePickedLocation]);

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    const checkInputs = () => {
        if (!selectedLocation){
            Alert.alert('Please choose location.');
            return;
        }
    }
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            {
            isFetching ? <ActivityIndicator/> :
            <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
           {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>}
            </MapView>
        }
        </View>
        
       
    )
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    return {
        headerTitle: 'Map',
        headerRight: <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButonText}>Save</Text>
        </TouchableOpacity>
    }
}


const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButonText: {
        fontSize: 16,
        color: 'white'
    }
});

export default MapScreen;
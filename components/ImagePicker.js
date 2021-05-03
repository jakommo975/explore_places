import React, {useState} from 'react';
import {View, Button, Image, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/colors';
import { color } from 'react-native-reanimated';
import MyButton from './MyButton';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyCamPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if (result.status !== 'granted'){
            Alert.alert('Insuficient permissions!', 'You need to grant access to camera.', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }
    const verifyGalPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (result.status !== 'granted'){
            Alert.alert('Insuficient permissions!', 'Youneed to grant access to camera.', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyCamPermissions();
        if (!hasPermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });

        setPickedImage(image.uri)
        props.onImageTaken(image.uri);
    }

    const chooseImageHandler = async () => {
        const hasPermission = await verifyGalPermissions();
        if (!hasPermission){
            return;
        }
        const image =  await ImagePicker.launchImageLibraryAsync({
            //allowsEditing: true,
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    }

    return (
    <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
        {
            !pickedImage ? 
            <Text>No image picked yet.</Text> :
            <Image style={styles.image} source={{uri: pickedImage}}/>
        }
            
        </View>
        <View style={styles.buttonContainer}>
            <MyButton title='TAKE IMAGE' style={styles.button} onPress={takeImageHandler}/>
            <MyButton title='OPEN GALLERY' style={styles.button} onPress={chooseImageHandler}/>
        </View>
        
    </View>
    )
}


const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 10
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '48%'
    }
});

export default ImgPicker;
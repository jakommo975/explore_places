import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux'
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import MyButton from '../components/MyButton';

import  Colors  from '../constants/colors';
import * as placesActions from '../store/places-actions';



const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    
    
    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const savePlaceHandler = () => {
        if (!checkInputs()){
            return;
        }
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))

        Alert.alert('The place was saved')
        props.navigation.goBack();
    }

    const checkInputs = () => {
        if (titleValue.length < 1){
            Alert.alert('Title cannot be empty.');
            return false;
        }
        if (!selectedImage){
            Alert.alert('Please take an image.');
            return false;
        }
        if (!selectedLocation){
            Alert.alert('Please choose location.');
            return false;
        }
        return true;
    }

    const locationPickedHandler = useCallback(location => {
       setSelectedLocation(location);
    }, [])

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    placeholder="Enter the title"
                    style={styles.textInput} 
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
                {/* <Text>Desription:</Text>
                <TextInput multiline={true} style={styles.description} numberOfLines={6}/> */}
                <MyButton title='SAVE PLACE'  onPress={() => {savePlaceHandler()}}/>
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    description: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 8,
        flex: 1,
        textAlignVertical: 'top'
    }
});

export default NewPlaceScreen;
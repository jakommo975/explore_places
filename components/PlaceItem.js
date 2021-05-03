import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from 'react-redux';

import Colors from '../constants/colors';
import * as placesActios from '../store/places-actions';


const PlaceItem = props => {
    const dispatch = useDispatch();

    const onDeleteHandler = () => {
        dispatch(placesActios.removePlace(props.id));
    }

    const leftSwipe = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.deleteBox} onPress={onDeleteHandler}>
                <Text style={{color: 'white', fontSize: 16}}>DELETE</Text>
            </TouchableOpacity >
        )
    }

   
  return (
    <Swipeable  renderLeftActions={props.isExplore ? null : leftSwipe}>
        <TouchableOpacity onPress={props.onSelect} activeOpacity={0.8} style={styles.placeItem} on>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.address}>{props.address}</Text>
            {props.userName && <Text style={styles.author}>By: {props.userName}</Text>}
          </View>
        </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 0,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 20,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  },
  deleteBox: {
    backgroundColor: 'salmon',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 12,
    
  },
  author: {
      marginTop: 4,
      fontStyle: 'italic'
  }
});

export default PlaceItem;

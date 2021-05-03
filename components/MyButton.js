import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const MyButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.9} style={{...styles.button,...props.style}} onPress={props.onPress}>
            <Text style={{ color: 'white' }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 4
    }
});

export default MyButton;
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux'

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places);
    const userName = useSelector(state => state.auth.displayName)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);
    useEffect(() => {
        props.navigation.setParams({
            userName: userName
        });
    }, [userName])
    

    

    
    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    id={itemData.item.id}
                    onSelect={
                        () => {
                            props.navigation.navigate('PlaceDetail', { 
                                placeTitle: itemData.item.title,
                                placeId: itemData.item.id,

                            })
                        }
                    }
                />
            )}
        />
    )
}


PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('userName'),
        drawerLabel: 'My Places',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title={'Add Place'}
                    iconName={'md-add'}
                    onPress={() => { navData.navigation.navigate('NewPlace') }}
                />
            </HeaderButtons>
        ),
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title={'Add Place'}
                    iconName={'md-menu'}
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({});

export default PlacesListScreen;
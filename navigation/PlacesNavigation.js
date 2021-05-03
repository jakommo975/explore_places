import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';
import {SafeAreaView, Text,Button, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/colors';
import PlacesDetailScreen from '../screens/PlaceDetailScreen';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/auth-actions';
import ExplorePlacesScreen from '../screens/ExplorePlacesScreen';

const PlacesNavigator = createStackNavigator({
    MyPlaces: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
})

PlacesNavigator.navigationOptions = navData => {
    return {
        drawerLabel: 'My Places',
    }
}

const ExplorePlacesNavigator = createStackNavigator({
    Explore: ExplorePlacesScreen,
    PlaceDetail: PlaceDetailScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
})




const DrawerNavigator = createDrawerNavigator({
    Explore: ExplorePlacesNavigator,
    Places: PlacesNavigator
    
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return <View style={{flex: 1}}>
            <SafeAreaView style={{marginTop: 20}} forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerItems  {...props}/>
                <View style={{marginVertical: 4}}>
                    <Button title={"LOGOUT"}  color={Colors.primary} onPress={
                        () => {
                            dispatch(authActions.logout());
                            props.navigation.navigate('Auth');
                        }
                    }/>
                </View>
            </SafeAreaView>
        </View>
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
}
);

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Places: DrawerNavigator,
});



export default createAppContainer(MainNavigator)
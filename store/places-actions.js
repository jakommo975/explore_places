import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import * as firebase from 'firebase';
import uuid from 'uuid';


import {insertPlace, fetchPlaces, deletePlace} from '../helpers/db';
import ENV from '../env';
import Place from '../models/place';

const firebaseConfig = {
    ...ENV.firebase
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const SET_ONLINE_PLACES = 'SET_ONLINE_PLACES';
export const PUBLISH_PLACE = 'PUBLISH_PLACE';

export const addPlace = (title, image, location) => {
    return async (dispatch, getState) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            location.lat
        },${
            location.lng
        }&key=${
            ENV.googeApiKey
        }`

         const response = await fetch(url)
        if (!response.ok){
            throw new Error('Somehing went wrong!');
        }

        const resData = await response.json();
        const address = resData.results[0].formatted_address;


        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        const userId = getState().auth.userId;
        try{
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng, userId);
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    title: title,
                    image: newPath,
                    id: dbResult.insertId,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    },
                    userId: userId
                }
            })
        } catch (err){
            console.log(err);
            throw err;
        }
        
        
    }
}

export const loadPlaces = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const dbResult = await fetchPlaces(userId);
            dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array
            });
        } catch (err) {
            console.log(err)
            throw(err);
        }
        
        
    }
}

export const removePlace = (id) => { 
    return async dispatch => {
        try {
            const dbResult = await deletePlace(id);
            dispatch({
                type: REMOVE_PLACE,
                id: id
            });
        } catch (err) {
            console.log(err)
            throw(err);
        }
        
        
    }
}

export const loadPlacesFromServer = () => {
    return async (dispatch, getState) => {
        
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        try {
        const response = await fetch(
            `https://places-b12af-default-rtdb.europe-west1.firebasedatabase.app/places.json?auth=${token}`
        );
        
        if (!response.ok) {

            throw new Error('Something went wrong!');
        }
        
        const resData = await response.json();
        const loadedPlaces = [];
        
        for (const key in resData) {
            console.log(key)
            loadedPlaces.push(
                new Place(
                    key,
                    resData[key].title,
                    resData[key].imageUri,
                    resData[key].address,
                    resData[key].lat,
                    resData[key].lng,
                    resData[key].userId,
                    resData[key].userName
                )
            );
        }
        dispatch({ type: SET_ONLINE_PLACES, places: loadedPlaces });
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}

export const publishPlace = (place) => {
    return async (dispatch, getState) => {
        const result = await uploadImageAsync(place.imageUri);
        if (!result){
            return;
        }
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const displayName = getState().auth.displayName
        const response = await fetch(
            `https://places-b12af-default-rtdb.europe-west1.firebasedatabase.app/places.json?auth=${token}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  ...place,
                  imageUri: result,
                  userId: userId,
                  userName: displayName
              })
            }
          );
          
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
      
          const resData = await response.json();
          let newPlace = new Place(resData.name, place.title, result, place.address, place.lat, place.lng, userId, displayName);
          //console.log("TU SOOOM")
          console.log(newPlace)
          dispatch({
              type: PUBLISH_PLACE,
              place: newPlace
          });
    }
}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
      try {
        const snapshot = await ref.put(blob);
        console.log(snapshot)
    // We're done with the blob, close and release it
        blob.close();
  
        return await snapshot.ref.getDownloadURL();
      }catch (err){
          console.log(err)
      }
      return null;
    
    
  }
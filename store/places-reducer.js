import {ADD_PLACE, PUBLISH_PLACE, REMOVE_PLACE, SET_ONLINE_PLACES, SET_PLACES} from './places-actions';
import Place from '../models/place';


const initialState = {
    places: [],
    onlinePlaces: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(), 
                action.placeData.title, 
                action.placeData.image,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng,
                action.placeData.userId
            );
            return {
                ...state,
                places: state.places.concat(newPlace)
            }
        
        case SET_PLACES:
            return {
                ...state,
                places: action.places.map(pl => new Place(
                    pl.id.toString(), 
                    pl.title, 
                    pl.imageUri,
                    pl.address,
                    pl.lat,
                    pl.lng,
                    pl.userId
                ))
            }

        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(pl => pl.id != action.id)
            }
        
        case SET_ONLINE_PLACES:
            return {
                ...state,
                onlinePlaces: action.places
            }

        case PUBLISH_PLACE:
            
            return {
                ...state,
                onlinePlaces: state.onlinePlaces.concat(action.place)
            }
        
        default:
            return state;

    }


    return state;
}
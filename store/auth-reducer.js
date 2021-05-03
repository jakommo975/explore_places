import { AUTHENTICATE, LOGOUT } from './auth-actions';

const initialState = {
  token: null,
  userId: null,
  displayName: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        displayName: action.displayName
      };

    
    case LOGOUT:
        return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};

import * as ActionTypes from '../actions/common/actionTypes';

const initialState = {
    user: null,
    isLoggedIn: false,
    token: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.SET_USER:
        return {
          ...state,
          user: action.payload.user,
          isLoggedIn: true,
          token: action.payload.token,
        };
      case ActionTypes.SET_USER_FROM_COOKIES:
        return {
          ...state,
          user: action.payload.user,
          isLoggedIn: action.payload.isLoggedIn,
          token: action.payload.token,
        };
      case ActionTypes.SIGNOUT_USER:
        return {
          ...state,
          user: null,
          isLoggedIn: false,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
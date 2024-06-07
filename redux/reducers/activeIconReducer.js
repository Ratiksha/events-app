import * as ActionTypes from '../actions/common/actionTypes';

const initialState = {
    icon: null,
  };
  
  const activeIconReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.SET_ACTIVE_ICON:
        return {
          ...state,
          icon: action.payload,
        };
      case ActionTypes.UNSET_ACTIVE_ICON:
        return {
          ...state,
          icon: null,
        };
      default:
        return state;
    }
  };
  
  export default activeIconReducer;
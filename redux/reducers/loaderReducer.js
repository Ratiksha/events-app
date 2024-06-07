import * as ActionTypes from '../actions/common/actionTypes';

const initialState = {
    displayLoader: false,
}

const loaderReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.TOGGLE_LOADER: {
            return {
                ...state,
                displayLoader: action.payload
            }
        }

        default: 
        return state;
    }
}

export default loaderReducer
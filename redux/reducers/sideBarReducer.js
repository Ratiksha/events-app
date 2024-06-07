import * as ActionTypes from '../actions/common/actionTypes';

const initialState = {
    isOpen: false,
}

const sideBarReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.TOGGLE_SIDEBAR: {
            return {
                ...state,
                isOpen: action.payload
            }
        }

        default: 
        return state;
    }
}

export default sideBarReducer
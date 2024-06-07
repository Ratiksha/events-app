import * as ActionTypes from '../actions/common/actionTypes';

const initialState = {
    isOpen: false,
}

const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.TOGGLE_MODAL: {
            return {
                ...state,
                isOpen: action.payload
            }
        }

        default: 
        return state;
    }
}

export default modalReducer
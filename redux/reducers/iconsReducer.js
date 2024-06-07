import { HYDRATE } from "next-redux-wrapper";
import * as ActionTypes from '../actions/common/actionTypes';

const initialState = {
    icons: [],
    page: 1,
    loading: false,
    error: null,
};

const iconsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.icons };

        case ActionTypes.SET_ICONS: 
            const newIcons = action.payload.icons.filter(newIcon => !state.icons.some(oldIcon => oldIcon._id === newIcon._id));
            return { ...state, icons: [...state.icons, ...newIcons] };
        default:
            return state;
    }
};

export default iconsReducer
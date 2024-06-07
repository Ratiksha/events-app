import * as ActionTypes from '../actions/common/actionTypes';

const initialState = {
    freeIcons: [],
    premiumIcons: [],
}



const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case  ActionTypes.SET_CART: {
          const freeIcons = action.payload.filter(item => item.type === 'free');
          const premiumIcons = action.payload.filter(item => item.type === 'premium');
          return {
              ...state,
              freeIcons: freeIcons,
              premiumIcons: premiumIcons
          };
        }
          
        case  ActionTypes.ADD_TO_CART: {
          if (action.payload.type === 'free') {
            return {
              ...state,
              freeIcons: [...state.freeIcons, action.payload]
            };
          } else if (action.payload.type === 'premium') {
            return {
              ...state,
              premiumIcons: [...state.premiumIcons, action.payload]
            };
          }
          return state;
        }
            
        case ActionTypes.REMOVE_FROM_CART: {
          if (action.payload.type === 'free') {
            const filteredFreeIcons = state.freeIcons.filter(icons => icons._id !== action.payload._id)
            return {
              ...state,
              freeIcons: filteredFreeIcons
            };
          } else if (action.payload.type === 'premium') {
            const filteredPremiumIcons = state.premiumIcons.filter(icons => icons._id !== action.payload._id)
            return {
              ...state,
              premiumIcons: filteredPremiumIcons
            };
          }
          return state;
        }
            
        case  ActionTypes.RESET_CART: {
          if (action.payload === 'free') {
            return {
                ...state,
                freeIcons: []
            };
          } else if(action.payload === 'premium') {
            return {
              ...state,
              premiumIcons: []
            };
          } else {
            return state;
          }
        }
           
        default: 
            return state;
    }

}

export default cartReducer;
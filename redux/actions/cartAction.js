import * as cartActionType from './common/actionTypes';

const setCart = (data) => {
    return {
        type: cartActionType.SET_CART,
        payload: data,
    }
}

const addToCart = (data) => {
    return {
        type: cartActionType.ADD_TO_CART,
        payload: data,
    }
}

const removeFromCart = (data) => {
    return {
        type: cartActionType.REMOVE_FROM_CART,
        payload: data
    }
}

const resetCart = (data) => {
    return {
        type: cartActionType.RESET_CART,
        payload: data
    }
}

export { addToCart, removeFromCart, setCart, resetCart }
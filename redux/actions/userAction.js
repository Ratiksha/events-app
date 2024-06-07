import * as UserActionType from './common/actionTypes';

const setUser = (data) => {
    return {
        type: UserActionType.SET_USER,
        payload: data,
    }
}

const setUserFromCookies = (data) => {
    return {
        type: UserActionType.SET_USER_FROM_COOKIES,
        payload: data,
    }
}

const signOutUser = () => {
    return {
        type: UserActionType.SIGNOUT_USER,
    }
}

export { setUser, setUserFromCookies, signOutUser }
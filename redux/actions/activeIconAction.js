import * as ActiveIconActionType from './common/actionTypes';

const setActiveIcon = (data) => {
    return {
        type: ActiveIconActionType.SET_ACTIVE_ICON,
        payload: data,
    }
}

const unsetActiveIcon = () => {
    return {
        type: ActiveIconActionType.UNSET_ACTIVE_ICON,
    }
}

export { setActiveIcon,  unsetActiveIcon}
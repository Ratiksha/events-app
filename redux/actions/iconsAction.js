import * as IconsActionType from './common/actionTypes';

const setIconsList = (data) => {
    return {
        type: IconsActionType.SET_ICONS,
        payload: data,
    }
}

export { setIconsList }
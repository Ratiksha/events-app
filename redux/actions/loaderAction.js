import * as LoaderActionType from './common/actionTypes';

const toggleLoader = (data) => {
    return {
        type: LoaderActionType.TOGGLE_LOADER,
        payload: data,
    }
}

export { toggleLoader }
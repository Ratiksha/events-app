import * as ModalActionType from './common/actionTypes';

const toggleModal = (data) => {
    return {
        type: ModalActionType.TOGGLE_MODAL,
        payload: data,
    }
}

export { toggleModal }
import * as SideBarActionType from './common/actionTypes';

const toggleSideBar = (data) => {
    return {
        type: SideBarActionType.TOGGLE_SIDEBAR,
        payload: data,
    }
}

export { toggleSideBar }
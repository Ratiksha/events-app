import  iconsReducer from './iconsReducer';
import userReducer from './userReducer';
import activeIconReducer from './activeIconReducer';
import cartReducer from './cartReducer';
import sideBarReducer from './sideBarReducer';
import modalReducer from './modalReducer';
import loaderReducer from './loaderReducer';

const rootReducer = {
  icons: iconsReducer,
  user: userReducer,
  activeIcon: activeIconReducer,
  cart: cartReducer,
  sideBar: sideBarReducer,
  modal: modalReducer,
  loader: loaderReducer,
};

export default rootReducer;
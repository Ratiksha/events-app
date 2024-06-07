
import '../styles/globals.css';
import '../styles/general.scss';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from '../src/components/MainLayout';
import { wrapper } from '../redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const MyApp = ({ Component, ...rest }) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ToastContainer />
      <MainLayout>
        <Component {...props.pageProps} />
      </MainLayout>
    </Provider>)
}

export default MyApp

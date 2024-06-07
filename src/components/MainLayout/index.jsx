import Header from '../Header';
import Footer from '../Footer';
import Loader from '../Loader';
import styles from './Main.module.scss';
import { useSelector } from 'react-redux';

const MainLayout = ({children}) => {
    const loader = useSelector((state) => state.loader)
    return (
        <> 
            <Header></Header>
            { loader.displayLoader && <Loader /> }
            <main className={styles.main}>{children}</main>
            <Footer></Footer>
        </>
    )
}

export default MainLayout
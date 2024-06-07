import { useCallback } from 'react';
import Cart from '../Cart';
import styles from './SideBar.module.scss';

const SideBar = ({ isOpen, onClose }) => {
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose])

    const overlay = isOpen && <div className={styles.overlay} onClick={handleClose}></div>

    return(
        <div>
            {overlay}
            <div className={`${styles.sideBar} ${isOpen ? styles.open : ''}`}>
                <p onClick={handleClose} className={styles.closeSideBar}>CLOSE</p>
                <Cart />
            </div>
        </div>
   )
}

export default SideBar;
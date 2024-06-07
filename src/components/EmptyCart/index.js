import Image from "next/image";
import styles from './EmptyCart.module.scss';

const EmptyCart = ({ type }) => {
    return(<div className={`absoluteCenterAlign ${styles.cartEmpty}`}>
            <Image src='/images/emptyCart.svg' alt='empty cart' width={140} height={140} />
            <p>No {type} icons in cart</p>
            <p className={styles.subtext}>It seems like you have not added any {type} icons yet. Feel free to explore our top icons!</p>
        </div>)
}

export default EmptyCart;
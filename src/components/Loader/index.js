import styles from './Loader.module.scss';

const Loader = () => {
    return(
        <div className={styles.loadingContainer}>
            <div>
                <p className={styles.loader}></p>
                <p>Loading.....</p>
            </div>
        </div>
    )
}

export default Loader
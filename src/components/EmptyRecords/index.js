import Image from "next/image";
import styles from './EmptyRecords.module.scss';

const EmptyRecords = () => {
    return(
        <div className={styles.emptyRecords}>
            <Image src='/images/emptyTable.svg' alt='empty Table' width={140} height={140} />
            <p>No records found</p>
        </div>
    )
}

export default EmptyRecords;
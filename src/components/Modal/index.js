import React from "react";
import styles from './Modal.module.scss';

const Modal = ({ onClose, children, title }) => {

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
    <div className={styles.modalOverlay}>
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    {title && <h4>{title}</h4>}
                    <a href="#" onClick={handleCloseClick}>
                        x
                    </a>
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    </div>);
};

export default Modal
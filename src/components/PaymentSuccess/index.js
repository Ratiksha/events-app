import Image from "next/image";
import Download from "../Download";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getIcons,updateDownloadStatus } from '../../../services/apiServices/paymentHistoryApi';
import styles from './PaymentSuccess.module.scss';

const PaymentSuccess = () => {
    const user = useSelector((state) => state.user);
    const token = user?.isLoggedIn ? user?.token : '';
    const router = useRouter();
    const [iconIds, setIconIds] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const [payment, setPayment] = useState({});

    const fetchIcons = async (customerId) => {
        setIsDataLoading(true)
        const payload = {
            id: customerId
        }
        try {
            const data = await getIcons(payload, token);
            if(data.success) {
                const paymentHistory = data.paymentHistory[0];
                const ids = paymentHistory?.icons.map(id => id._id);
                setPayment(paymentHistory);
                setDisable(paymentHistory.iconsDownloaded);
                setIconIds(ids);
            }
        } catch (error) {
            console.log(error)
        }
        setIsDataLoading(false);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const customerId = urlParams.get('customerId');
        user?.isLoggedIn && fetchIcons(customerId);
    }, [user])

    useEffect(() => {
        if(disable) {
            router.push('/')
        }
    }, [disable])

    const handlerDownloadButton = async () => {
        setIsDataLoading(true);
        const payload = {
            id: payment._id,
          }
            try {
              const data = await updateDownloadStatus(payload, token);
              if (data.success) {
                setDisable(true);
              }
            } catch (error) {
                console.error('Error:', error);
            }
            setIsDataLoading(false);
    }

    return(
        <>
            { isDataLoading && <Loader /> }
            <div className={styles.successWrapper}>
                <div>
                    <Image src="/images/free.svg" alt="premium" width={100} height={100} />
                    <h2>Thank You!</h2>
                    <p className={styles.paymentSuccessMsg}>Your payment was completed successfully.</p>
                    <p className={styles.downloadMsg}>You can now click on the button below to download the icons you have selected..</p>
                    {iconIds && <Download 
                        type="multiple" 
                        page="success" 
                        btnSmall={true}
                        iconIds={iconIds}
                        setIsDataLoading={setIsDataLoading}
                        callback={() => handlerDownloadButton()}
                    />}
                </div>
            </div>
        </>)
}

export default PaymentSuccess;
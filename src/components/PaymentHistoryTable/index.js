import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Image from 'next/image';
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getPaymentHistory, updateDownloadStatus } from "../../../services/apiServices/paymentHistoryApi";
import Download from "../Download";
import Loader from "../Loader";
import { getLocalDate, getPaymentStatus } from '../../../utils/helperFunctions';
import styles from './PaymentHistoryTable.module.scss';


const PaymentHistoryTable = () => {
    const router = useRouter();
    const user = useSelector((state) => state.user);
    const token = user?.isLoggedIn ? user?.token : '';
    const [allPayments, setAllPayments] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);

    

    const fetchAllPayments = async () => {
        setIsDataLoading(true);
        try {
            const data = await getPaymentHistory(token);
            if(data.success) {
                setAllPayments(data?.allPayments);
                setIsDataLoading(false);
            } else {
                if(data.redirectTo) {
                    toast(data.error);
                    router.push('/signin');
                } else {
                    console.error('Failed to get cart items');
                }
                setIsDataLoading(false);
            }
        } catch (error) {
            console.error('Error fetching cart items');
            setIsDataLoading(false);
        }
    }

    useEffect(() => {
        if(user?.isLoggedIn) {
            fetchAllPayments();
        }
    }, [user])

    const getIconIds = (icons) => {
        const ids = icons.map(icon => icon._id)
        return ids;
    }

    const handlerDownloadButton = async (item) => {
        setIsDataLoading(true);
        const payload = {
            id: item._id,
          }
            try {
              const data = await updateDownloadStatus(payload, token);
              if (data.success) {
                const updatedAllPayments = allPayments.map(paymentEntry => {
                    if(paymentEntry._id === item._id) {
                        paymentEntry['iconsDownloaded'] = true;
                    }
                    return paymentEntry;
                })
                setAllPayments(updatedAllPayments);
              }
            } catch (error) {
                console.error('Error:', error);
            }
            setIsDataLoading(false);
    }

    return(<div className={styles.paymentHistoryWrapper}>
        <div className={styles.caption}>Payment History</div>
        <div className={styles.tableWrapper}>
                        <table className={styles.historyTable}>
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Icons</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isDataLoading ? (
                                    <tr> <td colSpan="6"><Loader /></td></tr>
                                ) : (
                                    <>
                                        {allPayments.length === 0 ? (
                                            <td colSpan="6" className={styles.emptyRecords}>
                                                <Image src='/images/emptyTable.svg' alt='empty Table' width={140} height={140} />
                                                <p>No records found</p>
                                            </td>
                                        ) : (
                                            <>
                                                {allPayments?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td data-label="Payment ID">{item.paymentId}</td>
                                                        <td data-label="Amount"><span className={styles.currency}>{item.currency}</span> {item.amount}</td>
                                                        <td data-label="Status">{getPaymentStatus(item.paymentStatus)}</td>
                                                        <td data-label="Date">{getLocalDate(item.createdAt)}</td>
                                                        <td data-label="Icons">
                                                            {item.icons.map((icon, index) => (
                                                                <Image key={index} src={icon.thumbnail} alt='' width={25} height={25} />
                                                            ))}
                                                        </td>
                                                        <td data-label="Actions">
                                                            {item.iconsDownloaded ? 'Downloaded' :
                                                                <>
                                                                    {item?.icons?.length === 1 ?
                                                                        <Download
                                                                            type="single"
                                                                            iconName={item?.icons[0]?.name}
                                                                            iconIds={getIconIds(item.icons)}
                                                                            setIsDataLoading={setIsDataLoading}
                                                                            btnSmall={true}
                                                                            callback={() => handlerDownloadButton(item)}
                                                                        /> :
                                                                        <Download
                                                                            type="multiple"
                                                                            iconIds={getIconIds(item.icons)}
                                                                            setIsDataLoading={setIsDataLoading}
                                                                            btnSmall={true}
                                                                            callback={() => handlerDownloadButton(item)}
                                                                        />
                                                                    }
                                                                </>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                        </tbody>

                            </table>
            </div>
            </div>)
}

export default PaymentHistoryTable;
import { PAID , FAILED } from './constants';

export const getLocalDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
}

export const getPaymentStatus = (status) => {
    switch(status) {
        case 'succeeded': return PAID;
        case 'failed': return FAILED;
        default: return status;
    }
}
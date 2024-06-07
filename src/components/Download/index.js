import { publicIconDownload, authenticatedIconDownload } from '../../../services/apiServices/downloadApi';
import CryptoJS from 'crypto-js';
import JSZip from 'jszip';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from '../../../redux/actions/cartAction';

const IMAGE_ENCRYPTION_SECRET_KEY = process.env.NEXT_PUBLIC_IMAGE_ENCRYPTION_SECRET_KEY

const Download = ({ type, page="", iconName="", iconIds, setIsDataLoading, callback, btnSmall=false }) => {
    const cart = useSelector((state) => state.cart); 
    const user = useSelector((state) => state.user);
    const token = user?.isLoggedIn ? user?.token : '';
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDownload = async (type, iconName, iconIds, setIsDataLoading) => {
        
        setIsDataLoading(true);
        try {
            let downloadUrl = [];
            if(user?.isLoggedIn) {
                const data = await authenticatedIconDownload(iconIds, token);
                if(data.success) {
                    downloadUrl =  data.urls;
                } else {
                    if(data.redirectTo) {
                        toast(data.error);
                        router.push('/signin');
                      }
                }
            } else {
                const data = await publicIconDownload(iconIds);
                if(data.success) {
                    downloadUrl =  data.urls;
                }
            }
            setIsDataLoading(false);
            let link = document.createElement('a');
            if (downloadUrl.length !== 0) {
                const decryptedUrls = downloadUrl.map((encryptedUrl) => {
                    const decryptedUrl = CryptoJS.AES.decrypt(encryptedUrl, IMAGE_ENCRYPTION_SECRET_KEY).toString(CryptoJS.enc.Utf8);
                    return decryptedUrl;
                });
                
                if(type === 'single') {
                    link.href = decryptedUrls[0];
                    link.download = iconName;
                } else if (type ==="multiple") {
                    if (page === 'cart') {
                        dispatch(resetCart('free'));
                    } else if (page === 'success') {
                        dispatch(resetCart('premium'));
                    }
                    const zip = new JSZip();
    
                    // Add each image to the zip file
                    await Promise.all(decryptedUrls.map(async (url, index) => {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        zip.file(`${index + 1}.svg`, blob);
                    }));
        
                    // Generate the zip file
                    const content = await zip.generateAsync({ type: 'blob' });
        
                    // Download the zip file
                    const url = window.URL.createObjectURL(content);
    
                    link.href = url;
                    link.setAttribute('download', 'icons.zip');
                }

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                callback && callback();
            } else {
              console.error('Failed to download icons');
            }
        } catch (error) {
            setIsDataLoading(false);
            console.error('Failed to download icons');
        } 
    }
     
    
    return(<button className={`btn btn-primary ${!btnSmall && 'btn-large'}`} onClick={() => handleDownload(type, iconName, iconIds, setIsDataLoading)}>Download</button>)
};

export default Download;
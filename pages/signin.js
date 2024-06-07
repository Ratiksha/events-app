import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import AccountForm from './../src/components/AccountForm';
import Loader from '../src/components/Loader';
import { setUser } from '../redux/actions/userAction';
import { toggleSideBar } from '../redux/actions/sideBarAction';
import { toggleLoader } from '../redux/actions/loaderAction';
import { signin } from '../services/apiServices/authApi';
import { SIGN_UP_LINK, SIGN_IN_TEXT, SIGN_UP_TEXT } from '../src/utils/constants';

const Signin = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isDataLoading, setIsDataLoading] = useState(false);
    const footer = {
        text: ' Don\'t have an account?',
        link: SIGN_UP_LINK,
        buttonText: SIGN_UP_TEXT,
    }
    const [formData, setFormData] = useState({ 
        email: '', 
        password: ''
    });

    useEffect(() => {
        dispatch(toggleSideBar(false));
        dispatch(toggleLoader(false));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDataLoading(true);
        try {
            const data = await signin(formData);
            if (data?.user) {
                const expirationTime = new Date(
                    new Date().getTime() + 1 * 60 * 60 * 1000
                  );
            
                  Cookies.set("accessToken", data.token, {
                    expires: expirationTime,
                    path: "/",
                  });

                router.push('/').finally(() => {
                    setIsDataLoading(false);
                });
                dispatch(setUser(data));
                toast('Sign In successful.');
                
            } else {
                toast(`Sign In failed: ${data.message}`);
                setIsDataLoading(false);
            }
        }
        catch (error) {
            toast(`Error signing in: ${error}`);
            setIsDataLoading(false);
        }

    }

    return(
        <>
            {isDataLoading && <Loader />}
            <AccountForm 
                title = "Sign In to your account"
                button = {SIGN_IN_TEXT}
                footer = {footer}
                formData = {formData}
                setFormData= {setFormData}
                handleSubmit = {handleSubmit} />
        </>)
}

export default Signin
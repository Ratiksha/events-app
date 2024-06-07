import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import AccountForm from './../src/components/AccountForm';
import Loader from '../src/components/Loader';
import { signup } from '../services/apiServices/authApi';
import { SIGN_IN_LINK, SIGN_UP_TEXT, SIGN_IN_TEXT } from '../src/utils/constants';

const Signup = () => {
    const router = useRouter();
    const footer = {
        text: 'Have an account?',
        link: SIGN_IN_LINK,
        buttonText: SIGN_IN_TEXT,
    }
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isDataLoading, setIsDataLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDataLoading(true)
        try {
            const data = await signup(formData);
            if(data?.user) {
                router.push('/signin');
                setIsDataLoading(false);
                toast('Sign Up successful. Please Sign In.');
            } else {
                toast(`Sign Up failed: ${data.message}`);
                setIsDataLoading(false);
            } 
        } catch (error) {
            toast(`Error signing up: ${error}`);
            setIsDataLoading(false);
        }
    };

    return(
        <>
            {isDataLoading && <Loader />}
            <AccountForm 
                title = "Create your account"
                button = {SIGN_UP_TEXT}
                footer = {footer}
                formData = {formData}
                setFormData= {setFormData}
                handleSubmit = {handleSubmit} />
        </>)
}

export default Signup
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toggleLoader } from '../../../redux/actions/loaderAction';
import styles from './AccountForm.module.scss';
import { useCallback } from 'react';

const AccountForm = ({title, button, footer, formData, setFormData, handleSubmit}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleLoader = useCallback(() => {
        dispatch(toggleLoader(true));
        router.push(footer.link).finally(() => {
            dispatch(toggleLoader(false));
        });
    }, [dispatch, router, footer.link])

    return(
        <div className={styles.accountFormContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.accountForm}>
                        <h2>{title}</h2>
                        { button === 'Sign Up' && 
                            <div className={styles.accountFormField}>
                                <label>Username</label>
                                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                            </div>
                        }
                        <div className={styles.accountFormField}>
                            <label>Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className={styles.accountFormField}>
                            <label>Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <button className='btn btn-primary btn-large' type="submit">{button}</button>
                        <p className={styles.accountFormFooter}>{footer.text} <span onClick={handleLoader}>{footer.buttonText}</span></p>
                    </div>
                </form>
            </div>)
}

export default AccountForm
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { SIGN_OUT } from '../../utils/constants';
import { signOutUser } from '../../../redux/actions/userAction';
import { toggleLoader } from '../../../redux/actions/loaderAction';

const Signout = ({toggleDropdown}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignout = (event) => {
        toggleDropdown(event);
        dispatch(toggleLoader(true));
        Cookies.remove('accessToken', { path: '' })
        dispatch(signOutUser());
        router.push('/signin').finally(() => {
            dispatch(toggleLoader(false));
        });
    };

    return (<button className='btn btn-primary' onClick={(event) => handleSignout(event)}>{SIGN_OUT}</button>)
}

export default Signout;
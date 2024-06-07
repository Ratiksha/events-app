import Link from 'next/link';
import Image from 'next/image';
import Cookies from "js-cookie";
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserFromCookies } from '../../../redux/actions/userAction';
import { toggleSideBar } from '../../../redux/actions/sideBarAction';
import SideBar from '../SideBar';
import Navbar from '../Navbar';
import { getUserDetails } from '../../../services/apiServices/userApi';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector((state) => state.sideBar.isOpen);

  const getUserData  = useCallback(async (token) => {
    try {
      const data = await getUserDetails(token);
      data.token = token;
      dispatch(setUserFromCookies(data));
    } catch {
      console.log('Error fetching user details');
    }
  }, [dispatch])

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
      if (accessToken) {
          getUserData(accessToken)
      }
  }, [getUserData]);
  
  useEffect(() => {
      document.body.style.overflow = isSideBarOpen ? 'hidden' : 'unset';
  }, [isSideBarOpen]);

  const handleToggleSideBar = useCallback(() => {
    dispatch(toggleSideBar(!isSideBarOpen))
  },  [dispatch, isSideBarOpen])

    return(
      <header className={styles.header}>
          <div className={styles.topNav}>
            <Link href="/">
              <Image alt="logo" className={styles.logo} src={'/images/logo.png'} width={116} height={50} />
            </Link>
            <Navbar handleToggleSideBar={handleToggleSideBar}/>
          </div>
          <SideBar isOpen={isSideBarOpen} onClose={handleToggleSideBar}/>
    </header>
    )
}

export default Header;
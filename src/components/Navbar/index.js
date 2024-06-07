import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../Dropdown";
import Signout from "../signout";
import { toggleLoader } from "../../../redux/actions/loaderAction";
import styles from "./Navbar.module.scss";

const Navbar = ({ handleToggleSideBar }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isSignUpSignInPage = useMemo(() => router.pathname.includes("/signup") || router.pathname.includes("/signin"), [router.pathname]);

  const toggleDropdown = useCallback((event) => {
    event.stopPropagation();
    setDropdownOpen((prevState) => !prevState);
  }, []);

  const handlePaymentHistory = useCallback(() => {
    dispatch(toggleLoader(true));
    router.push("/paymentHistory").finally(() => {
      dispatch(toggleLoader(false));
    });
    setDropdownOpen(false);
  }, [dispatch, router]);

  const cartItems = useMemo(() => {
    return (cart?.freeIcons?.length || 0) + (cart?.premiumIcons?.length || 0);
  }, [cart])

  const handleSignIn = useCallback(() => {
    dispatch(toggleLoader(true));
    router.push("/signin").finally(() => {
      dispatch(toggleLoader(false));
    });
  }, [dispatch, router]);

  return (
    <nav>
      <ul className={styles.navbar}>
        {!isSignUpSignInPage && (
          <li>
            <span className={styles.cart} onClick={handleToggleSideBar}>
              <Image src="/images/cart.svg" alt="cart" width={25} height={25} />
              <span className={styles.cartItems}>{cartItems}</span>
            </span>
          </li>
        )}
        {user?.isLoggedIn ? (
          <Dropdown
            label={user?.user?.username}
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          >
            <li onClick={handlePaymentHistory}>Payment History</li>
            <li>
              <Signout toggleDropdown={toggleDropdown} />
            </li>
          </Dropdown>
        ) : (
          !isSignUpSignInPage && (
            <li>
              <button onClick={handleSignIn} className="btn btn-primary">
                Sign In
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

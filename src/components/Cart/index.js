import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCart, removeFromCart } from "../../../redux/actions/cartAction";
import { toast } from "react-toastify";
import {
  getCartApi,
  removeIconFromCart,
} from "../../../services/apiServices/cartApi";
import Download from "../Download";
import Checkout from "../Checkout";
import Loader from "../Loader";
import EmptyCart from "../EmptyCart";
import styles from "./Cart.module.scss";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const token = user?.isLoggedIn ? user?.token : "";
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("freeIcons");
  const [isDataLoading, setIsDataLoading] = useState(false);

  const handleOpenTab = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchCartItems = async () => {
    try {
      const data = await getCartApi(token);
      if (data.success) {
        dispatch(setCart(data?.cart));
      } else {
        handleApiError(data, "Failed to get cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
      toast("Failed to fetch cart items");
    }
  };

  const handleApiError = (data, errorType) => {
    if (data.redirectTo) {
      toast(data.error);
      router.push("/signin");
    } else {
      console.error(errorType);
      toast(errorType);
    }
  };

  useEffect(() => {
    if (user?.isLoggedIn) {
      fetchCartItems();
    }
  }, [user]);

  const subTotal = useMemo(() => {
    return cart?.premiumIcons?.reduce(
      (accumulator, currentIcon) => accumulator + currentIcon.price,
      0
    );
  }, [cart]);

  const handleRemoveIcon = async (icon) => {
    setIsDataLoading(true);
    try {
      if (user?.isLoggedIn) {
        const payload = {
          id: icon._id,
        };
        const data = await removeIconFromCart(payload, token);
        if (data.success) {
          dispatch(removeFromCart(icon));
          toast(`${icon.name} removed from the cart.`);
        } else {
          handleApiError(data, "Failed to remove icon from cart");
        }
      } else {
        dispatch(removeFromCart(icon));
        toast(`${icon.name} removed from the cart.`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Failed to remove icon from cart");
    } finally {
      setIsDataLoading(false);
    }
  };

  const TabButton = ({ tabName, onClick, children }) => {
    const className = `btn btn-primary btn-large ${
      activeTab === tabName ? `${styles.active}` : ""
    }`;
    return (
      <button className={className} onClick={() => onClick(tabName)}>
        {children}
      </button>
    );
  };

  const CartIcons = ({ cart, handleRemoveIcon, type, id, subTotal }) => {
    if(!cart || cart.length === 0) {
        return <EmptyCart type={type} />
    }

    return(
        <div id={id} className={styles.tabContent}>
            <div className={styles.iconsContainer}>
                {cart.map(icon => (
                    <div className={styles.icon + " " + (type === 'free' && styles.free)} key={icon._id}>
                        <span className={styles.close} onClick={() => handleRemoveIcon(icon)}>&#x2715;</span>
                        <Image src={icon.thumbnail} alt={icon.name} width={45} height={45} />
                        {type === 'premium' && <p>${icon.price}</p>}
                    </div>
                ))}
                
                    <div className={styles.checkoutWrapper}>
                        {type === 'free' && (
                            <Download
                                type="multiple"
                                page="cart"
                                iconIds={cart?.map((icon) => icon._id)}
                                setIsDataLoading={setIsDataLoading}
                            />
                        )}
                        {type === 'premium' && (
                            <>
                                <div className={styles.subTotal}>
                                    <span>Subtotal:</span>
                                    <span>${subTotal}</span>
                                </div>
                                <Checkout text='Checkout' icons={cart} setIsDataLoading={setIsDataLoading} />
                            </>
                        )}
                    </div>
            </div>
        </div>
    )
  }

  return (
    <div>
      {isDataLoading && <Loader />}
      <div className={styles.tabs}>
        <TabButton tabName="freeIcons" onClick={handleOpenTab}>
          Free Icons
        </TabButton>
        <TabButton tabName="premiumIcons" onClick={handleOpenTab}>
          Premium Icons
        </TabButton>
      </div>

      {activeTab === "freeIcons" && (
        <CartIcons
          cart={cart?.freeIcons}
          handleRemoveIcon={handleRemoveIcon}
          type="free"
          id="freeIcons"
        />
      )}

    {activeTab === "premiumIcons" && (
        <CartIcons
          cart={cart?.premiumIcons}
          handleRemoveIcon={handleRemoveIcon}
          type="premium"
          id="premiumIcons"
          subTotal={subTotal}
        />
      )}
    </div>
  );
};

export default Cart;

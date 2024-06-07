import {useCallback} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import payment from "../../../services/apiServices/paymentApi";
import { toggleSideBar } from "../../../redux/actions/sideBarAction";

const Checkout = ({ text, icons, setIsDataLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const token = user?.isLoggedIn ? user?.token : "";

  const handleCheckout = useCallback(
    async (icons) => {
      setIsDataLoading(true);

      const handleApiError = (data) => {
        if (data.redirectTo) {
          toast(data.error);
          router.push("/signin");
        } else {
          toast("Error fetching payment page");
        }
      };

      if (user.isLoggedIn) {
        const formData = { icons };
        try {
          const data = await payment(formData, token);
          if (data.success) {
            window.location.href = data.url;
          } else {
            handleApiError(data);
          }
        } catch (error) {
          console.error("Error fetching payment page");
          toast("Error fetching payment page");
        } finally {
          setIsDataLoading(false);
        }
      } else {
        dispatch(toggleSideBar(false));
        setIsDataLoading(false);
        router.push("/signin");
      }
    },
    [dispatch, router, setIsDataLoading, token, user]
  );

  return (
    <button
      className="btn btn-primary btn-large"
      onClick={() => handleCheckout(icons)}
    >
      {text}
    </button>
  );
};

export default Checkout;

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Download from "../Download";
import Checkout from '../Checkout';
import Modal from "../Modal";
import Loader from "../Loader";
import { addToCart } from '../../../redux/actions/cartAction';
import { addIconToCart } from "../../../services/apiServices/cartApi";
import { unsetActiveIcon } from '../../../redux/actions/activeIconAction';
import { toggleModal } from '../../../redux/actions/modalAction';
import styles from './IconModal.module.scss';

const IconModal = ({ onSearch }) => {
    const user = useSelector((state) => state.user); 
    const cart = useSelector((state) => state.cart);
    const token = user?.isLoggedIn ? user?.token : '';
    const selectedIcon = useSelector((state) => state.activeIcon.icon);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isDataLoading, setIsDataLoading] = useState(false);

    
    const closeModal = () => {
        dispatch(unsetActiveIcon());
        dispatch(toggleModal(false));
    }

    const handleAddToCart = async (selectedIcon) => {
        setIsDataLoading(true);
        if(user?.isLoggedIn) {
          const payload = {
            id: selectedIcon._id,
          }
            try {
              const data = await addIconToCart(payload, token);
              if(data.success) {
                dispatch(addToCart(selectedIcon));
                setIsDataLoading(false);
                toast(`${selectedIcon.name} added to the cart.`);
                closeModal();
              } else {
                  if(data.redirectTo) {
                    toast(data.error);
                    router.push('/signin');
                  } else {
                    toast('Failed to add icon to cart');
                    setIsDataLoading(false);
                  }
              }
            } catch (error) {
              console.error('Error:', error);
              setIsDataLoading(false);
            } 
        } else {
          dispatch(addToCart(selectedIcon));
          setIsDataLoading(false);
          toast(`${selectedIcon.name} added to the cart.`);
          closeModal();
        }
      }

    const isIconInCart = (selectedIcon) => {
        for(const icon of cart?.freeIcons) {
          if(icon._id === selectedIcon?._id) {
            return true;
          }
        }
        for(const icon of cart?.premiumIcons) {
          if(icon._id === selectedIcon?._id) {
            return true;
          }
        }
        return false;
      }

    const handleTagClick = (tag) => {
      onSearch(tag);
      closeModal();
    }

    const isSelectedIconInCart = isIconInCart(selectedIcon);

    return(<Modal title={selectedIcon.name} onClose={() => closeModal()}>
                { isDataLoading && <Loader /> }
                <div className={styles.iconContent}>
                <div className={styles.icon}>
                    <Image src={selectedIcon.thumbnail} alt={selectedIcon.name} width={300} height={300} objectFit="contain" />
                    <div className={styles.tags}>
                    {selectedIcon.tags.map((tag, index) => (
                        <span key={index} onClick={() => handleTagClick(tag)}>{tag}</span>
                    ))}
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.iconType}>
                    <div className={styles.leftIcon}>
                        <Image src={`/images/${selectedIcon.type}.svg`} alt={selectedIcon.type} className={styles.iconType} width={20} height={20} />
                        {selectedIcon.type} Icon
                    </div>
                    {selectedIcon.type === 'premium' && <span> <span className={styles.separator}>|</span>Price: <span className={styles.price}>${selectedIcon.price}</span></span>}
                    </div>
                    <div className={styles.verticalGoogleAd}>vertical Google Ads</div>
                        <div className={styles.buttonsWrapper}>
                        { selectedIcon.type === 'free' ? 
                            <Download 
                            type="single" 
                            iconName={selectedIcon.name} 
                            iconIds={[selectedIcon._id]} 
                            setIsDataLoading={setIsDataLoading}
                            callback={() => closeModal()}
                            /> :
                            <Checkout 
                            text='Buy Now' 
                            icons={[selectedIcon]} 
                            setIsDataLoading={setIsDataLoading}
                            />
                        }
                        <button className='btn btn-primary btn-large' onClick={() => handleAddToCart(selectedIcon)} disabled={isSelectedIconInCart}>
                        { isSelectedIconInCart ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                        </div>
                </div>
                </div>
                <div className={styles.horizontalGoogleAd}>
                horizontal Google Ads
                </div>
            </Modal>)
}

export default IconModal;






import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIcon } from '../../../redux/actions/activeIconAction';
import { toggleModal } from '../../../redux/actions/modalAction';
import Loader from "../Loader";
import IconModal from '../IconModal';
import styles from './IconsList.module.scss';
import EmptyRecords from "../EmptyRecords";

const IconList = ({ icons, onSearch, isLoading }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const handleIconClick = (icon) => {
    dispatch(setActiveIcon(icon));
    dispatch(toggleModal(true));
  };

  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modal]);

  return (
    <>
      <div className={`${styles.iconsWrapper} ${icons.length === 0 && styles.bgWhite}`}>
        {isLoading ? <Loader /> : 
        <>
          {icons.length === 0 ?
            <EmptyRecords /> :
            <div className={styles.iconsContainer}>
              {icons.map((icon, index) => (
                  <div className={styles.icon} key={index} onClick={() => handleIconClick(icon)} >
                      {icon.type === "premium" && <Image src="/images/premium.svg" alt="premium" className={styles.iconType} width={20} height={20} />}
                      <Image src={icon.thumbnail} alt={icon.name} width={45} height={45} />
                      <p>{icon.name}</p>
                  </div>
              ))}
            </div>
          }
        </>
          
        }
        
      </div>
      {modal.isOpen &&
          <IconModal onSearch={onSearch} />
      }
    </>
  );
};

export default IconList;
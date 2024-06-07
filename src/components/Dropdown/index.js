import React, { useRef, useEffect, useCallback } from 'react';
import styles from './Dropdown.module.scss';

const Dropdown = ({ label, toggleDropdown, dropdownOpen, setDropdownOpen, children }) => {
  const dropdownRef = useRef(null);

  const onClickOutsideDropdown = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }, [setDropdownOpen]);

  useEffect(() => {
    document.addEventListener('click', onClickOutsideDropdown);
    return () => {
      document.removeEventListener('click', onClickOutsideDropdown);
    };
  }, [onClickOutsideDropdown]);

  const handleToggle = useCallback((event) => {
    event.stopPropagation();
    toggleDropdown(event);
  }, [toggleDropdown])

  return (
    <li className={styles.dropdown} >
      <span onClick={handleToggle}>
        {label} <span className={styles.caret}>&#9660;</span>
      </span>
      {dropdownOpen && (
        <ul ref={dropdownRef} className={styles.dropdownContent}>
            {children}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;

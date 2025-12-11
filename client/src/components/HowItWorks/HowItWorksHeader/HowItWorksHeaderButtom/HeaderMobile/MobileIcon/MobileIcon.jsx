import React from 'react';
import styles from './MobileIcon.module.sass';

const MobileIcon = ({ isMobileOpen }) => {
  return (
    <div className={`${styles.mobileIcon} ${isMobileOpen ? styles.open : ''}`}>
      <span className={styles.mobileIconElement}></span>
      <span className={styles.mobileIconElement}></span>
      <span className={styles.mobileIconElement}></span>
    </div>
  );
};

export default MobileIcon;

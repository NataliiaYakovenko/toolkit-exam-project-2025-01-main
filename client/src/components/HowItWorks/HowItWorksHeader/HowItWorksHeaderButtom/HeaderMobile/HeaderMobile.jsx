import React from 'react';
import styles from './HeaderMobile.module.sass';

const HeaderMobile = () => {
  return (
    <div>
      <div className={styles.mobileIcon}>
        <span className={styles.mobileIconElement}></span>
        <span className={styles.mobileIconElement}></span>
        <span className={styles.mobileIconElement}></span>
      </div>
    </div>
  );
};

export default HeaderMobile;

import React from 'react';
import styles from './HeaderMobile.module.sass';
import CONSTANTS from '../../../../../constants';

const HeaderMobile = () => {
  const handlerSearch = (e) => {
    e.preventDefault();
    window.location.href = 'https://www.atom.com/premium-domains-for-sale/q';
  };
  return (
    <div>
      <div className={styles.mobileIcon}>
        <span className={styles.mobileIconElement}></span>
        <span className={styles.mobileIconElement}></span>
        <span className={styles.mobileIconElement}></span>
      </div>

      <div className={styles.mobileMenuContainer}>
        <div className={styles.mobileSearchWrapper}>
          <img
            className={styles.mobileDundruff}
            src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SEARCH}
            alt="Search"
          />
          <input
            className={styles.mobileSearchInput}
            type="text"
            name="searchForm"
            placeholder="Search Over 300,000+ Premium Names"
            autoFocus
          />
          <a href="https://www.atom.com/premium-domains-for-sale/q">
            <button onClick={handlerSearch} className={styles.btnMobileSearch}>
              <img
                className={styles.searchArrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SEARCH_ARROW}
                alt="Arrow"
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;

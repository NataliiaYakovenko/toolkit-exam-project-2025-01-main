import React from 'react';
import styles from './MobileSearch.module.sass';
import CONSTANTS from '../../../../../../constants';

const MobileSearch = () => {
  const handlerSearch = (e) => {
    e.preventDefault();
    window.location.href = 'https://www.atom.com/premium-domains-for-sale/q';
  };

  return (
    <div>
      <section className={styles.mobileSearchWrapper}>
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
        />

        <button onClick={handlerSearch} className={styles.btnMobileSearch}>
          <img
            className={styles.searchArrow}
            src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SEARCH_ARROW}
            alt="Arrow"
          />
        </button>
      </section>
    </div>
  );
};

export default MobileSearch;

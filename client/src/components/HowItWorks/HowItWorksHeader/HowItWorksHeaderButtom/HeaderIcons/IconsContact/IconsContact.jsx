import React, { useState } from 'react';
import CONSTANTS from '../../../../../../constants';
import styles from './IconsContact.module.sass';

const IconsContact = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = 'https://www.atom.com/premium-domains-for-sale/q';
  };

  return (
    <>
      <div className={styles.iconsContactContainer}>
        <div
          className={`${styles.search} ${
            isSearchOpen ? styles.searchActive : ''
          }`}
          onClick={toggleSearch}
        >
          <img
            className={styles.dundruff}
            src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SEARCH}
            alt="Search"
          />
        </div>

        {isSearchOpen && (
          <div className={styles.searchForm}>
            <div className={styles.searchFormOpen}>
              <input
                className={styles.searchInput}
                type="text"
                name="searchForm"
                placeholder="Search Over 300,000+ Premium Names"
                autoFocus
              />
              <button
                onClick={handleSearch}
                className={styles.btnSearch}
                style={{
                  backgroundImage: `url(${CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SEARCH_WHITE})`,
                }}
              ></button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default IconsContact;

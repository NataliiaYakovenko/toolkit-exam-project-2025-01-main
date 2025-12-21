import React from 'react';
import styles from './Search.module.sass';
import CONSTANTS from '../../../../constants';
import searchToolTip from './SearchToolTip';
import SearchElement from '../Common/SearchElement/SearchElement';

const Search = () => {
  const handlerSearch = (e) => {
    e.preventDefault();
    window.location.href = 'https://www.atom.com/premium-domains-for-sale/q';
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <img
            className={styles.searchDundruff}
            src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_SEARCH}
            alt="Search"
          />
          <input
            className={styles.searchInput}
            type="text"
            name="searchForm"
            placeholder="Search Over 300,000+ Premium Names"
            autoFocus
          />
          <div className={styles.toolTip}>{searchToolTip.toolTip}</div>

          <button onClick={handlerSearch} className={styles.btnSearch}>
            <img
              className={styles.btnSearchDundruff}
              src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SEARCH_WHITE}
              alt="Search"
            />
          </button>
        </div>
        <div className={styles.searchList}>
          <SearchElement
            link="https://www.atom.com/premium-domains-for-sale/q/technology"
            title="Tech"
          />
          <SearchElement
            link="https://www.atom.com/premium-domains-for-sale/q/fashion-clothing"
            title="Clothing"
          />
          <SearchElement
            link="https://www.atom.com/premium-domains-for-sale/q/finance"
            title="Finance"
          />
          <SearchElement
            link="https://www.atom.com/premium-domains-for-sale/q/real-estate"
            title="Real Estate"
          />
          <SearchElement
            link="https://www.atom.com/premium-domains-for-sale/q/cryptocurrency-blockchain"
            title="Crypto"
          />
          <SearchElement
            link="https://www.atom.com/premium-domains-for-sale/length/Short"
            title="Short"
          />
          <SearchElement
            link="https://www.atom.com/premium-domains-for-sale/type_of_name/One%20Word"
            title="One Word"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;

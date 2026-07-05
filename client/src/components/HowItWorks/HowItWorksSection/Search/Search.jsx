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
    <section
      className={styles.searchContainer}
      aria-labelledby="search-heading"
    >
      <div className={styles.searchWrapper}>
        <form className={styles.searchBox} onSubmit={handlerSearch}>
          <img
            className={styles.searchDundruff}
            src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_SEARCH}
            alt="Search"
          />
          <label
            className={styles.visuallyHidden}
            htmlFor="premium-domain-search"
          >
            Search premium domain names
          </label>
          <input
            id="premium-domain-search"
            className={styles.searchInput}
            type="text"
            name="searchForm"
            placeholder="Search Over 300,000+ Premium Names"
          />
          <div className={styles.toolTip}>{searchToolTip.toolTip}</div>

          <button type="submit" className={styles.btnSearch}>
            <img
              className={styles.btnSearchDundruff}
              src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SEARCH_WHITE}
              alt="Search"
            />
          </button>
        </form>
        <ul className={styles.searchList}>
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
        </ul>
      </div>
    </section>
  );
};

export default Search;

import React, { useState } from 'react';
import CONSTANTS from '../../../../../../constants';
import styles from './IconsContact.module.sass';
import ContactForm from '../ContactForm/ContactForm';
import CommunicationWithUser from '../CommunicationWithUser/CommunicationWithUser';

const IconsContact = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = 'https://www.atom.com/premium-domains-for-sale/q';
  };

  return (
    <>
      {isSearchOpen && (
        <div className={styles.overlay} onClick={toggleSearch} />
      )}

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

        <div
          onMouseEnter={() => setActiveTab('contactForm')}
          onMouseLeave={() => setActiveTab('')}
          className={styles.userContactFormContainer}
        >
          <div className={styles.userContactFormIcon}>
            <img src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_USER} alt="user" />
          </div>
          {activeTab === 'contactForm' && <ContactForm />}
        </div>

        <div
          onMouseEnter={() => setActiveTab('communicationWithUser')}
          onMouseLeave={() => setActiveTab('')}
          className={styles.communicationWithUserContainer}
        >
          <div className={styles.communicationWithUserIcon}>
            <img src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_PHONE} alt="phone" />
          </div>
          {activeTab === 'communicationWithUser' && <CommunicationWithUser />}
        </div>

        <div className={styles.likesContainer}>
          <a href="https://www.atom.com/shortlisted-domains">
            <img
              className={styles.likesIcon}
              src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_HEART}
              alt="Heart"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default IconsContact;

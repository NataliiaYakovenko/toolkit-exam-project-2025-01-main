import React, { useState } from 'react';
import CONSTANTS from '../../../../../../constants';
import styles from './IconsContact.module.sass';
import ContactForm from '../ContactForm/ContactForm';

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

        <div className={styles.userContactFormContainer}>
          <div
            className={styles.userContactFormIcon}
            onMouseEnter={() => setActiveTab('contactForm')}
            onMouseLeave={() => setActiveTab('')}
          >
            <img src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_USER} alt="user" />
          </div>
          {activeTab === 'contactForm' && <ContactForm/>}
        </div>

 



        {/* <li>
              <a href="/">
                <MdLocalPhone />
                <ul>
              
                  <li>
                    <a href="/">
                      <MdLocalPhone />
                      <span>(877) 355-3585</span>
                    </a>
                  </li>
         
                  <li>
                    <a href="/">
                      <BsChatLeftDotsFill />
                      <span>Chat</span>
                    </a>
                  </li>
             
                        <li>
                    <a href="/">
                      <MdEmail />
                      <span>Email</span>
                    </a>
                  </li>
         
                  <li>
                    <a href="/">
                      <img
                        src={CONSTANTS.HOW_IT_WORKS_HEADER_TARGET}
                        alt="Help Desk"
                      />
                      <span>Help Desk</span>
                    </a>
                  </li>

                  
                  <a href="/">
                    <FaHeart />
                  </a>

                  
                </ul>
              </a>
            </li> */}
      </div>
    </>
  );
};

export default IconsContact;

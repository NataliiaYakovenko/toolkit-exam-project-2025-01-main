import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import withRouter from '../../hocs/withRouter';

const Header = ({ data, isFetching, navigate, getUser, clearUserStore }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, [data, getUser]);

  const logOut = useCallback(() => {
    localStorage.clear();
    clearUserStore();
    navigate('/login', { replace: true });
  }, [clearUserStore, navigate]);

  const startContests = useCallback(() => {
    navigate('/startContest');
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const renderLoginButtons = useCallback(() => {
    if (data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li key="dashboard">
                <Link
                  to="/dashboard"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li key="account">
                <Link
                  to="/account"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>My Account</span>
                </Link>
              </li>
              <li key="messages">
                <Link
                  to="http://www.google.com"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li key="affiliate">
                <Link
                  to="http://www.google.com"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              {data?.role === CONSTANTS.CUSTOMER && (
                <li key="events">
                  <Link
                    to="/events"
                    style={{ textDecoration: 'none' }}
                    onClick={closeMobileMenu}
                  >
                    <span>My Events</span>
                  </Link>
                </li>
              )}
              {data?.role === CONSTANTS.MODERATOR && (
                <li key="offers">
                  <Link
                    to="/moderator/offers"
                    style={{ textDecoration: 'none' }}
                    onClick={closeMobileMenu}
                  >
                    <span>Offers</span>
                  </Link>
                </li>
              )}
              <li key="logout">
                <button
                  onClick={() => {
                    logOut();
                    closeMobileMenu();
                  }}
                  className={styles.logoutBtn}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <Link to="http://www.google.com" style={{ textDecoration: 'none' }}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
              className={styles.emailIcon}
              alt="email"
            />
          </Link>
        </>
      );
    }
    return (
      <>
        <Link
          key="login"
          to="/login"
          style={{ textDecoration: 'none' }}
          onClick={closeMobileMenu}
        >
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link
          key="signup"
          to="/registration"
          style={{ textDecoration: 'none' }}
          onClick={closeMobileMenu}
        >
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  }, [data, closeMobileMenu, logOut]);

  if (isFetching) {
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <a href="http://www.google.com">
          <div className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>(877)&nbsp;355-3585</span>
          </div>
        </a>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <a href="/">
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </a>

        <button
          className={`${styles.burgerMenu} ${
            isMobileMenuOpen ? styles.active : ''
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`${styles.mobileMenuOverlay} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ''
          }`}
          onClick={closeMobileMenu}
          role="presentation"
        />

        <div
          className={`${styles.leftNav} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ''
          }`}
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <div className={styles.nav}>
            <ul>
              <li key="name-ideas">
                <span>NAME IDEAS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {[
                    'BEAUTY',
                    'CONSULTING',
                    'E-COMMERCE',
                    'FASHION & CLOTHING',
                    'FINANCE',
                    'REAL ESTATE',
                    'TECH',
                  ].map((item) => (
                    <li key={item}>
                      <a href="http://www.google.com" onClick={closeMobileMenu}>
                        {item}
                      </a>
                    </li>
                  ))}
                  <li key="more" className={styles.last}>
                    <a href="http://www.google.com" onClick={closeMobileMenu}>
                      MORE CATEGORIES
                    </a>
                  </li>
                </ul>
              </li>
              <li key="contests">
                <span>CONTESTS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {[
                    'HOW IT WORKS',
                    'PRICING',
                    'AGENCY SERVICE',
                    'ACTIVE CONTESTS',
                    'WINNERS',
                    'LEADERBOARD',
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href={
                          item === 'HOW IT WORKS'
                            ? 'http://localhost:3000/howItWorks'
                            : 'http://www.google.com'
                        }
                        onClick={closeMobileMenu}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                  <li key="become-creative" className={styles.last}>
                    <a href="http://www.google.com" onClick={closeMobileMenu}>
                      BECOME A CREATIVE
                    </a>
                  </li>
                </ul>
              </li>
              <li key="our-work">
                <span>OUR WORK</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {['NAMES', 'TAGLINES', 'LOGOS'].map((item) => (
                    <li key={item}>
                      <a href="http://www.google.com" onClick={closeMobileMenu}>
                        {item}
                      </a>
                    </li>
                  ))}
                  <li key="testimonials" className={styles.last}>
                    <a href="http://www.google.com" onClick={closeMobileMenu}>
                      TESTIMONIALS
                    </a>
                  </li>
                </ul>
              </li>
              <li key="names-for-sale">
                <span>NAMES FOR SALE</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {[
                    'POPULAR NAMES',
                    'SHORT NAMES',
                    'INTRIGUING NAMES',
                    'NAMES BY CATEGORY',
                    'VISUAL NAME SEARCH',
                  ].map((item) => (
                    <li key={item}>
                      <a href="http://www.google.com" onClick={closeMobileMenu}>
                        {item}
                      </a>
                    </li>
                  ))}
                  <li key="sell-domains" className={styles.last}>
                    <a href="http://www.google.com" onClick={closeMobileMenu}>
                      SELL YOUR DOMAINS
                    </a>
                  </li>
                </ul>
              </li>
              <li key="blog">
                <span>BLOG</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {[
                    'ULTIMATE NAMING GUIDE',
                    'POETIC DEVICES IN BUSINESS NAMING',
                    'CROWDED BAR THEORY',
                  ].map((item) => (
                    <li key={item}>
                      <a href="http://www.google.com" onClick={closeMobileMenu}>
                        {item}
                      </a>
                    </li>
                  ))}
                  <li key="all-articles" className={styles.last}>
                    <a href="http://www.google.com" onClick={closeMobileMenu}>
                      ALL ARTICLES
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {data && data.role === CONSTANTS.CUSTOMER && (
            <button
              className={styles.startContestBtn}
              onClick={() => {
                startContests();
                closeMobileMenu();
              }}
            >
              START CONTEST
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

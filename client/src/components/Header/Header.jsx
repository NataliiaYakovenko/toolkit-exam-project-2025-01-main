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
    setIsMobileMenuOpen(prev => !prev);
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
              <li>
                <Link
                  to="/dashboard"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http://www.google.com"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http://www.google.com"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              {data?.role === CONSTANTS.CUSTOMER && (
                <li>
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
                <li>
                  <Link
                    to="/moderator/offers"
                    style={{ textDecoration: 'none' }}
                    onClick={closeMobileMenu}
                  >
                    <span>Offers</span>
                  </Link>
                </li>
              )}
              <li>
                <span
                  onClick={() => {
                    logOut();
                    closeMobileMenu();
                  }}
                >
                  Logout
                </span>
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
          to="/login"
          style={{ textDecoration: 'none' }}
          onClick={closeMobileMenu}
        >
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link
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
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
              alt="phone"
            />
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
        <div
          className={`${styles.burgerMenu} ${
            isMobileMenuOpen ? styles.active : ''
          }`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          className={`${styles.mobileMenuOverlay} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ''
          }`}
          onClick={closeMobileMenu}
        >
          <div
            className={`${styles.leftNav} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        BEAUTY
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        CONSULTING
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        E-COMMERCE
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        FASHION & CLOTHING
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        FINANCE
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        REAL ESTATE
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        TECH
                      </a>
                    </li>
                    <li className={styles.last}>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        MORE CATEGORIES
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>CONTESTS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a
                        href="http://localhost:3000/howItWorks"
                        onClick={closeMobileMenu}
                      >
                        HOW IT WORKS
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        PRICING
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        AGENCY SERVICE
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        ACTIVE CONTESTS
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        WINNERS
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        LEADERBOARD
                      </a>
                    </li>
                    <li className={styles.last}>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        BECOME A CREATIVE
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>OUR WORK</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        NAMES
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        TAGLINES
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        LOGOS
                      </a>
                    </li>
                    <li className={styles.last}>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        TESTIMONIALS
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>NAMES FOR SALE</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        POPULAR NAMES
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        SHORT NAMES
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        INTRIGUING NAMES
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        NAMES BY CATEGORY
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        VISUAL NAME SEARCH
                      </a>
                    </li>
                    <li className={styles.last}>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        SELL YOUR DOMAINS
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>BLOG</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        ULTIMATE NAMING GUIDE
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        CROWDED BAR THEORY
                      </a>
                    </li>
                    <li className={styles.last}>
                      <a
                        href="http://www.google.com"
                        onClick={closeMobileMenu}
                      >
                        ALL ARTICLES
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {data && data.role === CONSTANTS.CUSTOMER && (
              <div
                className={styles.startContestBtn}
                onClick={() => {
                  startContests();
                  closeMobileMenu();
                }}
              >
                START CONTEST
              </div>
            )}
          </div>
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
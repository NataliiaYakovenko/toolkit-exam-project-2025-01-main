import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import withRouter from '../../hocs/withRouter';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false,
    };
  }

  componentDidMount() {
    if (!this.props.data) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.navigate('/login', { replace: true });
  };

  startContests = () => {
    this.props.navigate('/startContest');
  };

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  closeMobileMenu = () => {
    this.setState({
      isMobileMenuOpen: false,
    });
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link
                  to="/dashboard"
                  style={{ textDecoration: 'none' }}
                  onClick={this.closeMobileMenu}
                >
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  style={{ textDecoration: 'none' }}
                  onClick={this.closeMobileMenu}
                >
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http://www.google.com"
                  style={{ textDecoration: 'none' }}
                  onClick={this.closeMobileMenu}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http://www.google.com"
                  style={{ textDecoration: 'none' }}
                  onClick={this.closeMobileMenu}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  style={{ textDecoration: 'none' }}
                  onClick={this.closeMobileMenu}
                >
                  <span>My Events</span>
                </Link>
              </li>
              <li>
                <span
                  onClick={() => {
                    this.logOut();
                    this.toggleMobileMenu();
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
          onClick={this.closeMobileMenu}
        >
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link
          to="/registration"
          style={{ textDecoration: 'none' }}
          onClick={this.closeMobileMenu}
        >
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    if (this.props.isFetching) {
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
            {this.renderLoginButtons()}
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
              this.state.isMobileMenuOpen ? styles.active : ''
            }`}
            onClick={this.toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div
            className={`${styles.mobileMenuOverlay} ${
              this.state.isMobileMenuOpen ? styles.mobileMenuOpen : ''
            }`}
            onClick={this.closeMobileMenu}
          >
            <div
              className={`${styles.leftNav} ${
                this.state.isMobileMenuOpen ? styles.mobileMenuOpen : ''
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
                          onClick={this.closeMobileMenu}
                        >
                          BEAUTY
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          CONSULTING
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          E-COMMERCE
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          FASHION & CLOTHING
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          FINANCE
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          REAL ESTATE
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          TECH
                        </a>
                      </li>
                      <li className={styles.last}>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
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
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          HOW IT WORKS
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          PRICING
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          AGENCY SERVICE
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          ACTIVE CONTESTS
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          WINNERS
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          LEADERBOARD
                        </a>
                      </li>
                      <li className={styles.last}>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
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
                          onClick={this.closeMobileMenu}
                        >
                          NAMES
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          TAGLINES
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          LOGOS
                        </a>
                      </li>
                      <li className={styles.last}>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
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
                          onClick={this.closeMobileMenu}
                        >
                          POPULAR NAMES
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          SHORT NAMES
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          INTRIGUING NAMES
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          NAMES BY CATEGORY
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          VISUAL NAME SEARCH
                        </a>
                      </li>
                      <li className={styles.last}>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
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
                          onClick={this.closeMobileMenu}
                        >
                          ULTIMATE NAMING GUIDE
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          POETIC DEVICES IN BUSINESS NAMING
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          CROWDED BAR THEORY
                        </a>
                      </li>
                      <li className={styles.last}>
                        <a
                          href="http://www.google.com"
                          onClick={this.closeMobileMenu}
                        >
                          ALL ARTICLES
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              {this.props.data &&
                this.props.data.role !== CONSTANTS.CREATOR && (
                  <div
                    className={styles.startContestBtn}
                    onClick={() => {
                      this.startContests();
                      this.closeMobileMenu();
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
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

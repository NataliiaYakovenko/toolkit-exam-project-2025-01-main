import React from 'react';
import styles from './HeaderLogo.module.sass';
import CONSTANTS from '../../../../../constants';

class HowItWorksHeaderLogo extends React.Component {
  render() {
    return (
      <>
        <div className={styles.headerLogo}>
          <a href="/">
            <img src={CONSTANTS.HOW_IT_WORKS_HEADER_LOGO_ATOM} alt="logo" />
          </a>
        </div>
      </>
    );
  }
}

export default HowItWorksHeaderLogo;

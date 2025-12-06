import React from 'react';
import styles from './HeaderLogo.module.sass'

class HowItWorksHeaderLogo extends React.Component {


  render() {
    return (
      <>
        <div className={styles.headerLogo}>
          <a href="/">
            <img
              src="https://img.atom.com/public/images/atom-logo.png"
              alt="logo"
            />
          </a>
        </div>
      </>
    );
  }
}

export default HowItWorksHeaderLogo;

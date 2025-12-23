import React from 'react';
import styles from './Social.module.sass';
import CONSTANTS from '../../../../../constants';

const Social = () => {
  return (
    <div className={styles.container}>
      <a href="https://www.facebook.com/atomdotcom">
        <img src={CONSTANTS.HOW_IT_WORKS_FOOTER_FACEBOOK} alt="Facebook" />
      </a>
      <a href="https://x.com/atomhq">
        <img src={CONSTANTS.HOW_IT_WORKS_FOOTER_X} alt="X" />
      </a>
      <a href="https://www.instagram.com/workwithatom/">
        <img src={CONSTANTS.HOW_IT_WORKS_FOOTER_INSTAGRAM} alt="Instagram" />
      </a>
      <a href="https://www.linkedin.com/company/atomdotcom/">
        <img src={CONSTANTS.HOW_IT_WORKS_FOOTER_LINKEDIN} alt="LinkedIn" />
      </a>
      <a href="https://www.youtube.com/@atomdotcom">
        <img src={CONSTANTS.HOW_IT_WORKS_FOOTER_YOUTUBE} alt="YouTube" />
      </a>
    </div>
  );
};

export default Social;

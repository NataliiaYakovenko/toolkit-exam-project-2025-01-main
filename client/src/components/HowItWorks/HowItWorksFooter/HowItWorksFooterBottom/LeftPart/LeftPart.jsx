import React from 'react';
import styles from './LeftPart.module.sass';

const LeftPart = () => {
  return (
    <adress className={styles.container}>
      <span className={styles.text}>Copyright © 2025 Atom.com</span>
      <div className={styles.point}></div>
      <a href="./">Consent Preferences</a>
    </adress>
  );
};

export default LeftPart;

import React from 'react';
import styles from './LeftPart.module.sass';

const LeftPart = () => {
    return (
        <div className={styles.container}>
            <span className={styles.text}>Copyright © 2025 Atom.com</span>
            <div className={styles.point}></div>
            <a href="./">Consent Preferences</a>
        </div>
    );
}

export default LeftPart;

import React from 'react';
import styles from './Bottom.module.sass';
import LeftPart from '../LeftPart/LeftPart';
import CentralPart from '../CentralPart/CentralPart';

const Bottom = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LeftPart />
        <CentralPart/>
      </div>
    </div>
  );
};

export default Bottom;

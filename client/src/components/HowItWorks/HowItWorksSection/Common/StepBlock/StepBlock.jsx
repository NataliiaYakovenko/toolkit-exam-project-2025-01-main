import React from 'react';
import styles from './StepBlock.module.sass';
import CONSTANTS from '../../../../../constants';

const StepBlock = (props) => {
  return (
    <article className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.titleContainer}>
          <strong className={styles.title}>{props.title}</strong>
        </header>
        <p className={styles.description}>{props.description}</p>
        <img
          className={styles.arrow}
          src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_STEP_ARROW}
          alt="Arrow"
        />
      </div>
    </article>
  );
};

export default StepBlock;

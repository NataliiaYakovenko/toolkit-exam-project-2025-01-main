import React from 'react';
import styles from './StepBloc.module.sass';
import CONSTANTS from '../../../../../constants';

const StepBloc = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{props.title}</span>
        </div>
        <p className={styles.description}>{props.description}</p>
        <img
          className={styles.arrow}
          src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_STEP_ARROW}
          alt="Arrow"
        />
      </div>
    </div>
  );
};

export default StepBloc;

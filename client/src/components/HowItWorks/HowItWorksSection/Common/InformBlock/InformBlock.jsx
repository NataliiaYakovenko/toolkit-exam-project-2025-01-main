import React from 'react';
import styles from './InformBlock.module.sass';
import CONSTANTS from '../../../../../constants';

const InformBlock = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapperInfo}>
        <img className={styles.icon} src={props.icon} alt={props.altIcon} />
        <h3 className={styles.title}>{props.title}</h3>
        <p className={styles.description}>{props.description}</p>
      </div>
      <a className={styles.link} href={props.link}>
        <span className={styles.linkTitle}>{props.linkTitle}</span>
        <img
          className={styles.arrow}
          src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_ARROW}
          alt="arrow"
        />
      </a>
    </div>
  );
};

export default InformBlock;

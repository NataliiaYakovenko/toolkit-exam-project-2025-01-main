import React from 'react';
import styles from './FeatureCard.module.sass';
import CONSTANTS from'../../../../../../../constants'

const FeatureCard = (props) => {
  return (
    <div className={styles.featureWrapper}>
      <a className={styles.featureLeftLink} href={props.link}>
        <img
          className={styles.featureLeftIcon}
          src={props.leftIcon}
          alt={props.leftIconAlt}
        />
        <h3 className={styles.featureLeftTitle}>
          {props.title}

          <img
            className={styles.featureLeftArrow}
            src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW}
            alt="arrow"
          />
        </h3>
        <p className={styles.featureLeftComment}>{props.discription}</p>
      </a>

      
    </div>
  );
};

export default FeatureCard;

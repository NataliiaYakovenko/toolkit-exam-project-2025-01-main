import React from 'react';
import styles from './FeatureCard.module.sass';
import CONSTANTS from '../../../../../../../constants';

const FeatureCard = (props) => {
  return (
    <div className={styles.featureWrapper}>
      <a className={styles.featureLink} href={props.link}>
        {props.showIcon !== false && props.icon && (
          <img
            className={styles.featureIcon}
            src={props.icon}
            alt={props.iconAlt || ''}
          />
        )}

        <div className={styles.containerTitleAndDiscription}>
          <h3 className={`${styles.featureTitle} ${props.titleClassName || ''}`}>
            {props.title}

            <img
              className={styles.featureArrow}
              src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW}
              alt="arrow"
            />
          </h3>
          <p className={styles.featureComment}>{props.discription}</p>
        </div>
      </a>
    </div>
  );
};

export default FeatureCard;

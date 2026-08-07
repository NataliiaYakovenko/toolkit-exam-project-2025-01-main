import React from 'react';
import styles from './CentralPart.module.sass';
import CONSTANTS from '../../../../../constants';

const CentralPart = () => {
  return (
    <a
      className={styles.container}
      href="https://www.trustpilot.com/review/atom.com"
    >
      <section className={styles.excellentWrapper}>
        <strong className={styles.title}>Excellent</strong>
        <figure className={styles.starsWrapper}>
          <img
            className={styles.star}
            src={CONSTANTS.HOW_IT_WORKS_FOOTER_STAR}
            alt="star"
          />
          <img
            className={styles.star}
            src={CONSTANTS.HOW_IT_WORKS_FOOTER_STAR}
            alt="star"
          />
          <img
            className={styles.star}
            src={CONSTANTS.HOW_IT_WORKS_FOOTER_STAR}
            alt="star"
          />
          <img
            className={styles.star}
            src={CONSTANTS.HOW_IT_WORKS_FOOTER_STAR}
            alt="star"
          />
          <img
            className={styles.star}
            src={CONSTANTS.HOW_IT_WORKS_FOOTER_HALFSTAR}
            alt="half-star"
          />
        </figure>
        <span className={styles.text}>Trustpilot</span>
      </section>

      <section className={styles.ratingWrapper}>
        <strong className={styles.rating}>
          4.5/
          <span className={styles.maxReting}>5</span>
        </strong>
        <p>
          based on
          <span> 751 ratings</span>
        </p>
      </section>
    </a>
  );
};

export default CentralPart;

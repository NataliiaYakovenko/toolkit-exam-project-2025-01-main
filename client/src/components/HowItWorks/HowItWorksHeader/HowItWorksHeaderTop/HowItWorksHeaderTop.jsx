import React from 'react';
import styles from './HowItWorksHeaderTop.module.sass';
import CONSTANTS from '../../../../constants';

const HowItWorksHeaderTop = () => {
  return (
    <section className={styles.containerTop}>
      <div
        className={styles.wrapperBunner}
        style={{
          backgroundImage: `url(${CONSTANTS.HOW_IT_WORKS_HEADER_BACKGROUND})`,
        }}
      >
        <div className={styles.bunner}>
          <div className={styles.leftBunner}></div>

          <div className={styles.middleBunner}>
            <h2 className={styles.title}>Black Friday Sale!</h2>
            <p className={styles.subtitle}>
              25% Off The Best Domains on The Web
            </p>
            <p className={styles.mobileSubtitle}>Get 25% Off Top Domains.</p>
            <a
              className={styles.mobileButtonShopNow}
              href="https://www.atom.com/black-friday-sale"
            >
              SHOP NOW
            </a>
          </div>

          <aside className={styles.rightBunner}>
            <p className={styles.hurryText}>Hurry! Sale Ends In:</p>
            <p className={styles.mobileHurryText}>Hurry! Ends In:</p>

            <div className={styles.bannerTimer}>
              <div className={styles.timerItem}>
                <p className={styles.timerNumber}>4</p>
                <span className={styles.timerLabel}>DAYS</span>
              </div>

              <div className={styles.timerItem}>
                <p className={styles.timerNumber}>17</p>
                <span className={styles.timerLabel}>HOURS</span>
              </div>

              <div className={styles.timerItem}>
                <p className={styles.timerNumber}>58</p>
                <span className={styles.timerLabel}>MONTH</span>
              </div>
            </div>
            <a
              className={styles.buttonShopNow}
              href="https://www.atom.com/black-friday-sale"
            >
              Shop Now
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHeaderTop;
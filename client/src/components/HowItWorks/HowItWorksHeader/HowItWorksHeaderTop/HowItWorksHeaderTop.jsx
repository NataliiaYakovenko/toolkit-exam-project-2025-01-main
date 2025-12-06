import React from 'react';
import styles from './HowItWorksHeaderTop.module.sass';

class HowItWorksHeaderTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.containerTop}>
        <div className={styles.wrapperBunner}>
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

            <div className={styles.rightBunner}>
              <p className={styles.hurryText}>Hurry! Sale Ends In:</p>
              <p className={styles.mobileHurryText}>Hurry! Ends In:</p>

              <div className={styles.bannerTimer}>
                <div className={styles.timerItem}>
                  <p className={styles.timerNumber}>4</p>
                  <p className={styles.timerLabel}>DAYS</p>
                </div>

                <div className={styles.timerItem}>
                  <p className={styles.timerNumber}>17</p>
                  <p className={styles.timerLabel}>HOURS</p>{' '}
                </div>

                <div className={styles.timerItem}>
                  <p className={styles.timerNumber}>58</p>
                  <p className={styles.timerLabel}>MOUNTS</p>
                </div>
              </div>
              <a
                className={styles.buttonShopNow}
                href="https://www.atom.com/black-friday-sale"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorksHeaderTop;

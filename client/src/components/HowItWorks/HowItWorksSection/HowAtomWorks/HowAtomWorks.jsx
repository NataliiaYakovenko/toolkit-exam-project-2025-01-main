import React from 'react';
import styles from './HowAtomWorks.module.sass';


const HowAtomWorks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapperParts}>

        <div className={styles.leftPart}>
          <h4 className={styles.miniTitle}>World's #1 Naming Platform</h4>
          <h1 className={styles.mainTitle}>How Does Atom Work?</h1>
          <p className={styles.description}>
            Atom helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </p>
        </div>

        <div className={styles.rightPart}>
            <div className={styles.videoWrapper}>
                <iframe className={styles.video} src="https://iframe.mediadelivery.net/embed/239474/327efcdd-b1a2-4891-b274-974787ae8362?autoplay=false&loop=false&muted=false&preload=true&responsive=true"/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HowAtomWorks;

import React from 'react';
import styles from './HowAtomWorks.module.sass';

const HowAtomWorks = () => {
  return (
    <section className={styles.section} aria-labelledby="atom-work-title">
      <div className={styles.container}>
        <div className={styles.wrapperParts}>
          <article className={styles.leftPart}>
            <header className={styles.contentHeader}>
              <p className={styles.miniTitle}>World's #1 Naming Platform</p>
              <h2 id="atom-work-title" className={styles.mainTitle}>
                How Does Atom Work?
              </h2>
            </header>
            <p className={styles.description}>
              Atom helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
          </article>

          <aside className={styles.rightPart}>
            <figure className={styles.videoWrapper}>
              <iframe
                className={styles.video}
                src="https://iframe.mediadelivery.net/embed/239474/327efcdd-b1a2-4891-b274-974787ae8362?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                title="Business name"
              />
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HowAtomWorks;

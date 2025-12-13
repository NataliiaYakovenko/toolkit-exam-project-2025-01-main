import React from 'react';
import styles from './WaysUseAtom.module.sass';
import InformBloc from '../Common/InformBloc/InformBloc';
import CONSTANTS from '../../../../constants';

const WaysUseAtom = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.topPartContaner}>
            <span className={styles.miniTitle}>Our Services</span>
            <h2 className={styles.mainTitle}>3 Ways To Use Atom</h2>
            <p className={styles.description}>
              Atom offers 3 ways to get you a perfect name for your business.
            </p>
          </div>

          <div className={styles.lowerPartContainer}>
            <InformBloc
              icon={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_FLASH}
              altIcon="Flash"
              title="Launch a Contest"
              description="Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability."
              link="https://www.atom.com/start-contest"
              linkTitle="Launch a Contest"
            />

            <InformBloc
              icon={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_MONITOR}
              altIcon="Monitor"
              title="Explore Names For Sale"
              description="Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design"
              link="https://www.atom.com/premium-domains-for-sale"
              linkTitle="Explore Names For Sale"
            />

            <InformBloc
              icon={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_LIGHT}
              altIcon="Light"
              title="Agency-level Managed Contests"
              description="Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs"
              link="https://www.atom.com/managed-contests"
              linkTitle="Learn More"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaysUseAtom;

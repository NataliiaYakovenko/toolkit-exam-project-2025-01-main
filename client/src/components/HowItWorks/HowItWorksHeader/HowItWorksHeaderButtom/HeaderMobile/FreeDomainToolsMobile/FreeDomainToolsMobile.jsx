import React from 'react';
import FeatureCard from '../../HeaderNavigation/Common/FeatureCard/FeatureCard';
import styles from './FreeDomainToolsMobile.module.sass';

const FreeDomainToolsMobile = () => {
  return (
    <div className={styles.containerMobileTools}>
      <div className={styles.wrapperMobileTools}>
        <FeatureCard
          link="https://www.atom.com/domain-name-generator"
          title="AI Domain Name Generator"
          titleClassName={styles.mobileTitle}
          discription="Get hundreds of smart domain ideas in seconds."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/domain-appraisal"
          title="AI Domain Appraisal Tool"
          titleClassName={styles.mobileTitle}
          discription="Instantly check your domain’s market"
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/whois"
          title="WHOIS Domain Lookup"
          titleClassName={styles.mobileTitle}
          discription="Find domain ownership and registration details."
          showIcon={false}
        />
      </div>
    </div>
  );
};

export default FreeDomainToolsMobile;

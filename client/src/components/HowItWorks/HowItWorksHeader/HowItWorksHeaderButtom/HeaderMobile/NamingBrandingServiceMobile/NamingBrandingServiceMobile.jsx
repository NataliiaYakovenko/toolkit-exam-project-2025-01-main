import React from 'react';
import styles from './NamingBrandingServiceMobile.module.sass';
import FeatureCard from '../../HeaderNavigation/Common/FeatureCard/FeatureCard';

const NamingBrandingServiceMobile = () => {
  return (
    <div className={styles.nameMobileContainer}>
      <div className={styles.nameMobileWrapperLeft}>
        <FeatureCard
          link="https://www.atom.com/branding-marketing-naming-contests"
          title="Launch a Naming Contest"
          titleClassName={styles.mobileTitle}
          discription="Get 1000s of unique names from real creatives."
          showIcon={false}
        />
        <FeatureCard
          link="https://www.atom.com/brand-naming-agency"
          title="Hire Our Naming Agency"
          titleClassName={styles.mobileTitle}
          discription="Get agency-level naming without agency fees."
          showIcon={false}
        />
        <FeatureCard
          link="https://www.atom.com/logo-maker"
          title="AI Logo Generator"
          titleClassName={styles.mobileTitle}
          discription="Create instant, professional logos in minutes."
          showIcon={false}
        />
      </div>

      <div className={styles.nameMobileRight}>
        <FeatureCard
          link="https://www.atom.com/research"
          title="Audience Research"
          titleClassName={styles.mobileTitle}
          discription="Test almost anything with your target customers."
          showIcon={false}
        />
        <FeatureCard
          link="https://trademark.io/"
          title="Trademark Services"
          titleClassName={styles.mobileTitle}
          discription="Search, file, and protect your trademarks."
          showIcon={false}
        />
        <FeatureCard
          link="https://trademark.io/brand-monitoring"
          title="Brand monitoring"
          titleClassName={styles.mobileTitle}
          discription="Track and protect your brand online."
          showIcon={false}
        />
      </div>
    </div>
  );
};

export default NamingBrandingServiceMobile;

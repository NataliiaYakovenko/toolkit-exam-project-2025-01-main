import React from 'react';
import styles from './WyAtomMobile.module.sass';
import FeatureList from '../../HeaderNavigation/Common/FeatureList/FeatureList';
import FeatureCard from '../../HeaderNavigation/Common/FeatureCard/FeatureCard';

const WyAtomMobile = () => {
  return (
    <div className={styles.atomMobileContainer}>
      <div className={styles.atomMobileWrapperTop}>
        <FeatureList
          tittle="Atom.com"
          link1="https://www.atom.com/AboutUs"
          titleLink1="About Us"
          link2="https://www.trustpilot.com/review/atom.com"
          titleLink2="Testimonials"
          link3="https://www.atom.com/blog/"
          titleLink3="Blog"
        />
      </div>

      <div className={styles.atomMobileWrapperDown}>
        <h4 className={styles.titleMobileDown}>Partner With Us</h4>
        <FeatureCard
          link="https://www.atom.com/connect/distribution-network"
          title="Distribution Network API"
          titleClassName={styles.mobileTitle}
          discription="Share our premium domains with your clients."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/atom-mcp-server"
          title="MCP Server"
          titleClassName={styles.mobileTitle}
          discription="Access premium domains, availability checks, and trademark data."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/connect/marketplace-builder"
          title="White Label Marketplace"
          titleClassName={styles.mobileTitle}
          discription="Offer a turnkey branded domain marketplace on your site."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/connect"
          title="Atom Connect"
          titleClassName={styles.mobileTitle}
          discription="Learn more about our full partner ecosystem."
          showIcon={false}
        />
      </div>
    </div>
  );
};

export default WyAtomMobile;

import React from 'react';
import styles from './WyAtomMobile.module.sass';
import FeatureList from '../../HeaderNavigation/Common/FeatureList/FeatureList';
import FeatureCard from '../../HeaderNavigation/Common/FeatureCard/FeatureCard';

const WyAtomMobile = () => {
  const atomItems = [
    { link: 'https://www.atom.com/AboutUs', title: 'About Us', mark: '' },
    {
      link: 'https://www.trustpilot.com/review/atom.com',
      title: 'Testimonials',
      mark: '',
    },
    { link: 'https://www.atom.com/blog/', title: 'Blog', mark: '' },
  ];

  return (
    <div className={styles.atomMobileContainer}>
      <div className={styles.atomMobileWrapperTop}>
        <FeatureList title="Atom.com" items={atomItems} />
      </div>

      <div className={styles.atomMobileWrapperDown}>
        <h4 className={styles.titleMobileDown}>Partner With Us</h4>
        <FeatureCard
          link="https://www.atom.com/connect/distribution-network"
          title="Distribution Network API"
          titleClassName={styles.mobileTitle}
          description="Share our premium domains with your clients."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/atom-mcp-server"
          title="MCP Server"
          titleClassName={styles.mobileTitle}
          description="Access premium domains, availability checks, and trademark data."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/connect/marketplace-builder"
          title="White Label Marketplace"
          titleClassName={styles.mobileTitle}
          description="Offer a turnkey branded domain marketplace on your site."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/connect"
          title="Atom Connect"
          titleClassName={styles.mobileTitle}
          description="Learn more about our full partner ecosystem."
          showIcon={false}
        />
      </div>
    </div>
  );
};

export default WyAtomMobile;

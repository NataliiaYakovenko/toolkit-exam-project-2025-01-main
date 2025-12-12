import React from 'react';
import styles from './DomainForSaleMobile.module.sass';
import FeatureCard from '../../HeaderNavigation/Common/FeatureCard/FeatureCard';
import FeatureList from '../../HeaderNavigation/Common/FeatureList/FeatureList';
import CONSTANTS from '../../../../../../constants';

const DomainForSaleMobile = () => {
  return (
    <div className={styles.domainMobileContainer}>
      <div className={styles.domainsMobileTop}>
        <FeatureCard
          link="https://accessibe.com/blog/knowledgebase/screen-reader-guide"
          title="Premium Domain Marketplace"
          titleClassName={styles.mobileTitle}
          discription="Explore 300,000+ expert-curated, brandable domains to elevate your business."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/ultra-premium-marketplace/all"
          title="Ultra Premium Marketplace"
          titleClassName={styles.mobileTitle}
          discription="Discover the world’s most coveted and powerful domains for top-tier brands."
          showIcon={false}
        />

        <FeatureCard
          link="https://www.atom.com/sapphire/all"
          title="Sapphire Marketplace"
          titleClassName={styles.mobileTitle}
          discription="Find one-word domains with modern extensions like .ai, .io, and .xyz."
          showIcon={false}
        />
      </div>

      <div className={styles.domainsMobileCenter}>
        <FeatureList
          tittle="Top Domain Collections"
          link1="https://www.atom.com/premium-domains-for-sale/tld/.ai"
          titleLink1=".ai Domains"
          mark="Popular"
          link2="https://www.atom.com/premium-domains-for-sale/length/Short"
          titleLink2="Short Domains"
          link3="https://www.atom.com/premium-domains-for-sale/type_of_name/One%20Word"
          titleLink3=" One-Word Domains"
          link4="https://www.atom.com/premium-domains-for-sale/length/3%20Letters"
          titleLink4="3 Letter Domains"
          link5="https://www.atom.com/premium-domains-for-sale/length/4%20Letters"
          titleLink5="4 Letter Domains"
          link6="https://www.atom.com/premium-domains-for-sale/length/5%20Letters"
          titleLink6="5 Letter Domains"
          link7="https://www.atom.com/cctld/buy-domains"
          titleLink7="Country-Specific Domains"
        />
        <FeatureList
          tittle="Domain Services"
          link1="https://www.atom.com/pay"
          titleLink1="Domain Transactions"
          mark="AtomPay"
          link2="https://www.atom.com/domain-broker"
          titleLink2="Domain Broker"
          link3="https://www.atom.com/auctions/all"
          titleLink3="Domain Auction"
        />
      </div>

      <a
        className={styles.getMobileStarted}
        style={{
          backgroundImage: `url(${CONSTANTS.HOW_IT_WORKS_HEADER_ICON_WORK_PROCESS_BACKGROUND})`,
        }}
        href="https://www.atom.com/premium-domains-for-sale"
      >
        <div className={styles.getMobileStartedSearch}>
          <img
            className={styles.getMobileStartedDandruff}
            src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_DUNDRUFF}
            alt="dandruff"
          />
          <span className={styles.getMobileStartTitle}>Get Started</span>
          <img
            className={styles.getMobileStartedArrow}
            src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW}
            alt="arrow"
          />
        </div>
        <p className={styles.getMobileStartComment}>
          Find your perfect domain today and buy instantly in the Atom.com
          marketplace.
        </p>
      </a>
    </div>
  );
};

export default DomainForSaleMobile;

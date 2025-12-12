import React from 'react';
import styles from './DomainForSaleMobile.module.sass';
import FeatureCard from '../../HeaderNavigation/Common/FeatureCard/FeatureCard';
import FeatureList from '../../HeaderNavigation/Common/FeatureList/FeatureList';
import CONSTANTS from '../../../../../../constants';

const DomainForSaleMobile = () => {
  const domainItems = [
    { link: 'https://www.atom.com/premium-domains-for-sale/tld/.ai',title: '.ai Domains', mark: 'Popular',},
    { link: 'https://www.atom.com/premium-domains-for-sale/length/Short',title: 'Short Domains',mark: '',},
    { link: 'https://www.atom.com/premium-domains-for-sale/type_of_name/One%20Word',title: 'One-Word Domains', mark: '',},
    { link: 'https://www.atom.com/premium-domains-for-sale/length/3%20Letters', title: '3 Letter Domains', mark: '', },
    { link: 'https://www.atom.com/premium-domains-for-sale/length/4%20Letters',title: '4 Letter Domains', mark: '', },
    { link: 'https://www.atom.com/premium-domains-for-sale/length/5%20Letters',title: '5 Letter Domains', mark: '',},
    { link: 'https://www.atom.com/cctld/buy-domains',title: 'Country-Specific Domains', mark: '', },
  ];

  const servicesItem =[
    {link: 'https://www.atom.com/pay', title: 'Domain Transactions', mark:'AtomPay'},
    {link: 'https://www.atom.com/domain-broker', title: 'Domain Broker', mark:''},
    {link: 'https://www.atom.com/auctions/all', title: 'Domain Auction', mark:''}
  ]

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
        <FeatureList title="Top Domain Collections" items={domainItems} />
        <FeatureList title="Domain Services" items={servicesItem}/>
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

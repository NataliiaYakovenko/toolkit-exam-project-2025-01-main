import React from 'react';
import styles from './DomainForSale.module.sass';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import CONSTANTS from '../../../../../../constants';
import FeatureList from '../Common/FeatureList/FeatureList';

const DomainForSale =()=> {

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
      <>
        <div className={styles.domainContainer}>
          <div className={styles.domainsLeft}>
            <FeatureCard
              link="https://accessibe.com/blog/knowledgebase/screen-reader-guide"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_PREMIUM}
              iconAlt="Premium Domain Marketplace"
              title="Premium Domain Marketplace"
              description="Explore 300,000+ expert-curated, brandable domains to elevate your business."
            />

            <FeatureCard
              link="https://www.atom.com/ultra-premium-marketplace/all"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ULTRA}
              iconAlt="Ultra Premium Marketplace"
              title="Ultra Premium Marketplace"
              description="Discover the world’s most coveted and powerful domains for top-tier brands."
            />

            <FeatureCard
              link="https://www.atom.com/sapphire/all"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SAPPHIRE}
              iconAlt="Sapphire Marketplace"
              title="Sapphire Marketplace"
              description="Find one-word domains with modern extensions like .ai, .io, and .xyz."
            />
          </div>

          <div className={styles.domainsCenter}>
            <FeatureList title="Top Domain Collections" items={domainItems} />
            <FeatureList title="Domain Services" items={servicesItem}/>
          </div>

          <a
            className={styles.getStarted}
            style={{
              backgroundImage: `url(${CONSTANTS.HOW_IT_WORKS_HEADER_ICON_WORK_PROCESS_BACKGROUND})`,
            }}
            href="https://www.atom.com/premium-domains-for-sale"
          >
            <div className={styles.imageWrapper}>
              <img
                className={styles.getStartedImage}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_WORK_PROCESS}
                alt="Work process"
              />
            </div>
            <div className={styles.getStartedSearch}>
              <img
                className={styles.getStartedDandruff}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_DUNDRUFF}
                alt="dandruff"
              />
              <span className={styles.getStartTitle}>Get Started</span>
              <img
                className={styles.getStartedArrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW}
                alt="arrow"
              />
            </div>
            <p className={styles.getStartComment}>
              Find your perfect domain today and buy instantly in the Atom.com
              marketplace.
            </p>
          </a>
        </div>
      </>
    );
  }


export default DomainForSale;

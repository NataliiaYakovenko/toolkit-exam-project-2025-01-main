import React from 'react';
import styles from './DomainForSale.module.sass';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import CONSTANTS from '../../../../../../constants';

class DomainForSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className={styles.domainContainer}>
          <div className={styles.domainsLeft}>
            <FeatureCard
              link="https://accessibe.com/blog/knowledgebase/screen-reader-guide"
              leftIcon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_PREMIUM}
              leftIconAlt="Premium Domain Marketplace"
              title="Premium Domain Marketplace"
              discription="Explore 300,000+ expert-curated, brandable domains to elevate your business."
            />

            <FeatureCard
              link="https://www.atom.com/ultra-premium-marketplace/all"
              leftIcon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ULTRA}
              leftIconAlt="Ultra Premium Marketplace"
              title="Ultra Premium Marketplace"
              discription="Discover the world’s most coveted and powerful domains for top-tier brands."
            />

            <FeatureCard
              link="https://www.atom.com/sapphire/all"
              leftIcon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_SAPPHIRE}
              leftIconAlt="Sapphire Marketplace"
              title="Sapphire Marketplace"
              discription="Find one-word domains with modern extensions like .ai, .io, and .xyz."
            />
          </div>
          

          <div className={styles.domainsCenter}>
            <h4 className={styles.domainsCenterTitle}>
              Top Domain Collections
            </h4>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/premium-domains-for-sale/tld/.ai"
            >
              .ai Domains
            </a>
            <span className={styles.domainsCenterMark}>Popular</span>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/premium-domains-for-sale/length/Short"
            >
              Short Domains
            </a>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/premium-domains-for-sale/type_of_name/One%20Word"
            >
              One-Word Domains
            </a>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/premium-domains-for-sale/length/3%20Letters"
            >
              3 Letter Domains
            </a>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/premium-domains-for-sale/length/4%20Letters"
            >
              4 Letter Domains
            </a>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/premium-domains-for-sale/length/5%20Letters"
            >
              5 Letter Domains
            </a>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/cctld/buy-domains"
            >
              Country-Specific Domains
            </a>

            <h4 className={styles.domainsCenterTitle}>Domain Services</h4>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/pay"
            >
              Domain Transactions
            </a>
            <span className={styles.domainsCenterMark}>AtomPay</span>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/domain-broker"
            >
              Domain Broker
            </a>

            <a
              className={styles.domainsCenterLink}
              href="https://www.atom.com/auctions/all"
            >
              Domain Auction
            </a>
          </div>

          <a
            className={styles.getStarted}
            href="https://www.atom.com/premium-domains-for-sale"
          >
            <img
              className={styles.getStartedImage}
              src="https://www.atom.com/public/images/common/get_started.png"
              alt="Work process"
            />
            <img
              className={styles.getStartedDandruff}
              src="https://img.atom.com/public/images/common/search.svg"
              alt="dandruff"
            />
            <span className={styles.getStartTitle}>Get Started</span>
            <img
              className={styles.getStartedArrow}
              src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
              alt="arrow"
            />
            <p className={styles.getStartComment}>
              Find your perfect domain today and buy instantly in the Atom.com
              marketplace.
            </p>
          </a>
        </div>
      </>
    );
  }
}

export default DomainForSale;

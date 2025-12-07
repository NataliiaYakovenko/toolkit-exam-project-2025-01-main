import React from 'react';
import styles from './DomainForSale.module.sass';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import CONSTANTS from '../../../../../../constants';
import FeatureList from '../Common/FeatureList/FeatureList';

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
            <FeatureList />

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
            className={styles.getStarted}   style={{
            backgroundImage: `url(${CONSTANTS.HOW_IT_WORKS_HEADER_ICON_WORK_PROCESS_BACKGROUND})`,
          }}
            href="https://www.atom.com/premium-domains-for-sale"
          >
            <img
              className={styles.getStartedImage}
              src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_WORK_PROCESS}
              alt="Work process"
            />
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

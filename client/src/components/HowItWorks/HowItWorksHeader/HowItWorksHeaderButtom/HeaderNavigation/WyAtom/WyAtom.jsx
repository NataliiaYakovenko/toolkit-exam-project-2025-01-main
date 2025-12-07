import React from 'react';
import styles from './WyAtom.module.sass';
import FeatureList from '../Common/FeatureList/FeatureList';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import CONSTANTS from '../../../../../../constants';

class WyAtom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className={styles.atomContainer}>
          <div className={styles.atomWrapperLeft}>
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

          <div className={styles.atomWrapperRight}>
            <h4 className={styles.titleWrapperRight}>Partner With Us</h4>
            <FeatureCard
              link="https://www.atom.com/connect/distribution-network"
              Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_NETWORK_API}
              IconAlt="Network API"
              title="Distribution Network API"
              discription="Share our premium domains with your clients."
            />

            <FeatureCard
              link="https://www.atom.com/atom-mcp-server"
              Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_MCP_SERVER}
              IconAlt="MCP Server"
              title="MCP Server"
              discription="Access premium domains, availability checks, and trademark
                  data."
            />

            <FeatureCard
              link="https://www.atom.com/connect/marketplace-builder"
              Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_LABEL}
              IconAlt="Label"
              title="White Label Marketplace"
              discription="Offer a turnkey branded domain marketplace on your site."
            />

            <FeatureCard
              link="https://www.atom.com/connect"
              Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ATOM_CONNECT}
              IconAlt="Atom Connect"
              title="Atom Connect"
              discription="Learn more about our full partner ecosystem."
            />
          </div>
        </div>
      </>
    );
  }
}

export default WyAtom;

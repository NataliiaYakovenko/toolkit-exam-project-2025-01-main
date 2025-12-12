import React from 'react';
import styles from './WyAtom.module.sass';
import FeatureList from '../Common/FeatureList/FeatureList';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import CONSTANTS from '../../../../../../constants';

const WyAtom =()=> {

 const atomItems =[
    {link:'https://www.atom.com/AboutUs', title: 'About Us', mark: ''},
    {link:'https://www.trustpilot.com/review/atom.com', title: 'Testimonials', mark: ''},
    {link:'https://www.atom.com/blog/', title: 'Blog', mark: ''},
  ]

    return (
      <>
        <div className={styles.atomContainer}>
          <div className={styles.atomWrapperLeft}>
           <FeatureList title="Atom.com" items={atomItems}
           />
          </div>

          <div className={styles.atomWrapperRight}>
            <h4 className={styles.titleWrapperRight}>Partner With Us</h4>
            <FeatureCard
              link="https://www.atom.com/connect/distribution-network"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_NETWORK_API}
              iconAlt="Network API"
              title="Distribution Network API"
              discription="Share our premium domains with your clients."
            />

            <FeatureCard
              link="https://www.atom.com/atom-mcp-server"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_MCP_SERVER}
              iconAlt="MCP Server"
              title="MCP Server"
              discription="Access premium domains, availability checks, and trademark
                  data."
            />

            <FeatureCard
              link="https://www.atom.com/connect/marketplace-builder"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_LABEL}
              iconAlt="Label"
              title="White Label Marketplace"
              discription="Offer a turnkey branded domain marketplace on your site."
            />

            <FeatureCard
              link="https://www.atom.com/connect"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ATOM_CONNECT}
              iconAlt="Atom Connect"
              title="Atom Connect"
              discription="Learn more about our full partner ecosystem."
            />
          </div>
        </div>
      </>
    );
  }


export default WyAtom;

import React from 'react';
import styles from './FreeDomainTools.module.sass';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import CONSTANTS from '../../../../../../constants';

class FreeDomainTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className={styles.containerTools}>
          <div className={styles.wrapperTools}>
            <FeatureCard
              link="https://www.atom.com/domain-name-generator"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_GENERATOR}
              iconAlt="Generator"
              title="AI Domain Name Generator"
              description="Get hundreds of smart domain ideas in seconds."
            />

            <FeatureCard
              link="https://www.atom.com/domain-appraisal"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_TOOL}
              iconAlt="Tool"
              title="AI Domain Appraisal Tool"
              description="Instantly check your domain’s market"
            />

            <FeatureCard
              link="https://www.atom.com/whois"
              icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_LOOKUP}
              iconAlt="LookUp"
              title="WHOIS Domain Lookup"
              description="Find domain ownership and registration details."
            />
          </div>
        </div>
      </>
    );
  }
}

export default FreeDomainTools;

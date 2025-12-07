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
              Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_GENERATOR}
              IconAlt="Generator"
              title="AI Domain Name Generator"
              discription="Get hundreds of smart domain ideas in seconds."
            />

            <FeatureCard
              link="https://www.atom.com/domain-appraisal"
              Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_TOOL}
              IconAlt="Tool"
              title="AI Domain Appraisal Tool"
              discription="Instantly check your domain’s market"
            />

            <FeatureCard
              link="https://www.atom.com/whois"
              Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_LOOKUP}
              IconAlt="LookUp"
              title="WHOIS Domain Lookup"
              discription="Find domain ownership and registration details."
            />
          </div>
        </div>
      </>
    );
  }
}

export default FreeDomainTools;

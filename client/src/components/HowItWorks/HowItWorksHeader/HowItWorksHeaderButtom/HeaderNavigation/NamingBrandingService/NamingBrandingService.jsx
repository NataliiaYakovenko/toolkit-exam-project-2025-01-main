import React from 'react';
import styles from './NamingBrandingService.module.sass';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import CONSTANTS from '../../../../../../constants';

class NamingBrandingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.nameBrendServiceContainer}>
        <div className={styles.nameBrendServiceWrapperLeft}>
          <FeatureCard
            link="https://www.atom.com/branding-marketing-naming-contests"
            Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_CONTEST}
            IconAlt="Naming Contest"
            title="Launch a Naming Contest"
            discription="Get 1000s of unique names from real creatives."
          />
          <FeatureCard
            link="https://www.atom.com/brand-naming-agency"
            Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_AGENCY}
            IconAlt="Agency"
            title="Hire Our Naming Agency"
            discription="Get agency-level naming without agency fees."
          />
          <FeatureCard
            link="https://www.atom.com/logo-maker"
            Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_LOGO_GENERATOR}
            IconAlt="logo generator"
            title="AI Logo Generator"
            discription="Create instant, professional logos in minutes."
          />
        </div>

        <div className={styles.nameBrendServiceWrapperRight}>
          <FeatureCard
            link="https://www.atom.com/research"
            Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_RESEARCH}
            IconAlt="Audience Research"
            title="Audience Research"
            discription="Test almost anything with your target customers."
          />
          <FeatureCard
            link="https://trademark.io/"
            Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_TRADEMARK}
            IconAlt="Trademark"
            title="Trademark Services"
            discription="Search, file, and protect your trademarks."
          />
          <FeatureCard
            link="https://trademark.io/brand-monitoring"
            Icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_MONITORING}
            IconAlt="Brand monitoring"
            title="Brand monitoring"
            discription="Track and protect your brand online."
          />
        </div>
      </div>
    );
  }
}

export default NamingBrandingService;

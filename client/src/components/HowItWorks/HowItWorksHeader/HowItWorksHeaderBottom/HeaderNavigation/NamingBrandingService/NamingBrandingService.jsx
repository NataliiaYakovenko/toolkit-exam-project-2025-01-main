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
            icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_CONTEST}
            iconAlt="Naming Contest"
            title="Launch a Naming Contest"
            description="Get 1000s of unique names from real creatives."
          />
          <FeatureCard
            link="https://www.atom.com/brand-naming-agency"
            icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_AGENCY}
            iconAlt="Agency"
            title="Hire Our Naming Agency"
            description="Get agency-level naming without agency fees."
          />
          <FeatureCard
            link="https://www.atom.com/logo-maker"
            icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_LOGO_GENERATOR}
            iconAlt="logo generator"
            title="AI Logo Generator"
            description="Create instant, professional logos in minutes."
          />
        </div>

        <div className={styles.nameBrendServiceWrapperRight}>
          <FeatureCard
            link="https://www.atom.com/research"
            icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_RESEARCH}
            iconAlt="Audience Research"
            title="Audience Research"
            description="Test almost anything with your target customers."
          />
          <FeatureCard
            link="https://trademark.io/"
            icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_TRADEMARK}
            iconAlt="Trademark"
            title="Trademark Services"
            description="Search, file, and protect your trademarks."
          />
          <FeatureCard
            link="https://trademark.io/brand-monitoring"
            icon={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_MONITORING}
            iconAlt="Brand monitoring"
            title="Brand monitoring"
            description="Track and protect your brand online."
          />
        </div>
      </div>
    );
  }
}

export default NamingBrandingService;

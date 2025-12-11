import React, { useState } from 'react';
import styles from './HowItWorksHeaderButtom.module.sass';
import HowItWorksHeaderLogo from '../HeaderLogo/HeaderLogo';
import DomainForSale from '../HeaderNavigation/DomainForSale/DomainForSale';
import FreeDomainTools from '../HeaderNavigation/FreeDomainTools/FreeDomainTools';
import NamingBrandingService from '../HeaderNavigation/NamingBrandingService/NamingBrandingService';
import WyAtom from '../HeaderNavigation/WyAtom/WyAtom';
import HeaderIcons from '../HeaderIcons/IconsContact/IconsContact';
import HeaderMobile from '../HeaderMobile/MobileFormMain/MobileFormMain';

const HowItWorksHeaderButtom = () => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className={styles.headerButtom}>
      <div className={styles.headerContainer}>
        <div className={styles.headerWrapper}>
          <div>
            <HowItWorksHeaderLogo />
          </div>

          <div className={styles.navigationContainer}>
            <div className={styles.navigationWrapper}>
              <ul>
                <li
                  onMouseEnter={() => setActiveTab('domainForSale')}
                  onMouseLeave={() => setActiveTab('')}
                >
                  <div className={styles.titleDomians}>Domains for Sale</div>
                  {activeTab === 'domainForSale' && <DomainForSale />}
                </li>

                <li
                  onMouseEnter={() => setActiveTab('freeDomainTools')}
                  onMouseLeave={() => setActiveTab('')}
                >
                  <div className={styles.titleDomians}>Free Domain Tools</div>
                  {activeTab === 'freeDomainTools' && <FreeDomainTools />}
                </li>

                <li
                  onMouseEnter={() => setActiveTab('namingBrandingService')}
                  onMouseLeave={() => setActiveTab('')}
                >
                  <div className={styles.titleDomians}>
                    Naming & Branding Services
                  </div>
                  {activeTab === 'namingBrandingService' && (
                    <NamingBrandingService />
                  )}
                </li>

                <li
                  onMouseEnter={() => setActiveTab('wyAtom')}
                  onMouseLeave={() => setActiveTab('')}
                >
                  <div className={styles.titleDomians}>Wy Atom</div>
                  {activeTab === 'wyAtom' && <WyAtom />}
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.headerIconsContainer}>
            <HeaderIcons />
            <HeaderMobile className={styles.headerMobileContainer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksHeaderButtom;

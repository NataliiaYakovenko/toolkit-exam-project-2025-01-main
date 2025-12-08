import React, { useState } from 'react';
import styles from './HowItWorksHeaderButtom.module.sass';
import HowItWorksHeaderLogo from '../HeaderLogo/HeaderLogo';
import DomainForSale from '../HeaderNavigation/DomainForSale/DomainForSale';
import FreeDomainTools from '../HeaderNavigation/FreeDomainTools/FreeDomainTools';
import NamingBrandingService from '../HeaderNavigation/NamingBrandingService/NamingBrandingService';
import WyAtom from '../HeaderNavigation/WyAtom/WyAtom';
import HeaderIcons from '../HeaderIcons/IconsContact/IconsContact'

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
                <li>
                  <div
                    className={styles.titleDomians}
                    onMouseEnter={() => setActiveTab('domainForSale')}
                    onMouseLeave={() => setActiveTab('')}
                  >
                    Domains for Sale
                  </div>
                  {activeTab === 'domainForSale' && <DomainForSale />}
                </li>

                <li>
                  <div
                    className={styles.titleDomians}
                    onMouseEnter={() => setActiveTab('freeDomainTools')}
                    onMouseLeave={() => setActiveTab('')}
                  >
                    Free Domain Tools
                  </div>
                  {activeTab === 'freeDomainTools' && <FreeDomainTools />}
                </li>

                <li>
                  <div
                    className={styles.titleDomians}
                    onMouseEnter={() => setActiveTab('namingBrandingService')}
                    onMouseLeave={() => setActiveTab('')}
                  >
                    Naming & Branding Services
                  </div>
                  {activeTab === 'namingBrandingService' && (
                    <NamingBrandingService />
                  )}
                </li>

                <li>
                  <div
                    className={styles.titleDomians}
                    onMouseEnter={() => setActiveTab('wyAtom')}
                    onMouseLeave={() => setActiveTab('')}
                  >
                    Wy Atom
                  </div>
                  {activeTab === 'wyAtom' && <WyAtom />}
                </li>

              </ul>
              
            </div>
          </div>

          <div>
            <HeaderIcons/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksHeaderButtom;

import React, { useState } from 'react';
import styles from './MobileNavigation.module.sass';
import CONSTANTS from '../../../../../../constants';
import DomainForSale from '../../HeaderNavigation/DomainForSale/DomainForSale';
import FreeDomainTools from '../../HeaderNavigation/FreeDomainTools/FreeDomainTools';
import NamingBrandingService from '../../HeaderNavigation/NamingBrandingService/NamingBrandingService';
import WyAtom from '../../HeaderNavigation/WyAtom/WyAtom';

const MobileNavigation = () => {
  const [isDomainsOpen, setIsDomainsOpen] = useState(false);
  const [isToolsOpen, setToolsOpen] = useState(false);
  const [isNamingOpen, setisNamingOpen] = useState(false);
  const [isWyAtomOpen, setIsWyAtomOpen] = useState(false);

  const toggleDomains = () => {
    setIsDomainsOpen(!isDomainsOpen);
  };

  const toggleTools = () => {
    setToolsOpen(!isToolsOpen);
  };

  const toggleNaming = () => {
    setisNamingOpen(!isNamingOpen);
  };

  const toggleWayAtom = () => {
    setIsWyAtomOpen(!isWyAtomOpen);
  };

  const arrowDown = (isOpen) => {
    return (
      <img
        className={`${styles.arrowDown} ${isOpen ? styles.rotated : ''}`}
        src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
        alt="Arrow down"
      />
    );
  };

  return (
    <div>
      <div className={styles.mobileNavigation}>
        <ul>
          {isDomainsOpen && <DomainForSale />}
          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleDomains}>
              <span>Domains for Sale</span>
              {arrowDown(isDomainsOpen)}
            </div>
          </li>

          {isToolsOpen && <FreeDomainTools />}
          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleTools}>
              <span> Free Domain Tools</span>
              {arrowDown(isToolsOpen)}
            </div>
          </li>

          {isNamingOpen && <NamingBrandingService />}
          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleNaming}>
              <span> Naming & Branding Services</span>
              {arrowDown(isNamingOpen)}
            </div>
          </li>

          {isWyAtomOpen && <WyAtom />}
          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleWayAtom}>
              <span> Wy Atom</span>
              {arrowDown(isWyAtomOpen)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavigation;

import React, { useState } from 'react';
import styles from './MobileNavigation.module.sass';
import CONSTANTS from '../../../../../../constants';
import DomainForSaleMobile from '../DomainForSeleMobail/DomainForSaleMobile';
import FreeDomainToolsMobile from '../FreeDomainToolsMobile/FreeDomainToolsMobile';
import NamingBrandingServiceMobile from '../NamingBrandingServiceMobile/NamingBrandingServiceMobile';
import WyAtomMobile from '../WyAtomMobile/WyAtomMobile';

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
      <nav className={styles.mobileNavigation}>
        <ul>
          
          <li className={styles.navigationValues}>
            <button className={styles.navigationName} onClick={toggleDomains}>
              <strong>Domains for Sale</strong>
              {arrowDown(isDomainsOpen)}
            </button>
            {isDomainsOpen && <DomainForSaleMobile />}
          </li>

          <li className={styles.navigationValues}>
            <button className={styles.navigationName} onClick={toggleTools}>
              <strong>Free Domain Tools</strong>
              {arrowDown(isToolsOpen)}
            </button>
            {isToolsOpen && <FreeDomainToolsMobile />}
          </li>

          <li className={styles.navigationValues}>
            <button className={styles.navigationName} onClick={toggleNaming}>
              <strong>Naming & Branding Services</strong>
              {arrowDown(isNamingOpen)}
            </button>
            {isNamingOpen && <NamingBrandingServiceMobile />}
          </li>

          <li className={styles.navigationValues}>
            <button className={styles.navigationName} onClick={toggleWayAtom}>
              <strong>Wy Atom</strong>
              {arrowDown(isWyAtomOpen)}
            </button>
            {isWyAtomOpen && <WyAtomMobile />}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;

import React, { useState } from 'react';
import styles from './MobileNavigation.module.sass';
import CONSTANTS from '../../../../../../constants';
import DomainForSaleMobile from '../../HeaderMobile/DomainForSeleMobail/DomainForSaleMobile';
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
      <div className={styles.mobileNavigation}>
        <ul>
          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleDomains}>
              <span>Domains for Sale</span>
              {arrowDown(isDomainsOpen)}
            </div>
            {isDomainsOpen && <DomainForSaleMobile />}
          </li>

          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleTools}>
              <span> Free Domain Tools</span>
              {arrowDown(isToolsOpen)}
            </div>
            {isToolsOpen && <FreeDomainToolsMobile />}
          </li>

          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleNaming}>
              <span> Naming & Branding Services</span>
              {arrowDown(isNamingOpen)}
            </div>
            {isNamingOpen && <NamingBrandingServiceMobile />}
          </li>

          <li className={styles.navigationValues}>
            <div className={styles.navigationName} onClick={toggleWayAtom}>
              <span> Wy Atom</span>
              {arrowDown(isWyAtomOpen)}
            </div>
            {isWyAtomOpen && <WyAtomMobile />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavigation;

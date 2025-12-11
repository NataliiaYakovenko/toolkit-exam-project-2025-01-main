import React, { useState } from 'react';
import styles from './MobileFormMain.module.sass';
import MobileIcon from '../MobileIcon/MobileIcon';
import MobileSearch from '../MobileSearch/MobileSearch';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

const MobileFormMain = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className={styles.mobileWrapper}>
      <div onClick={toggleMenu}>
        <MobileIcon isMobileOpen={isMobileOpen} />
      </div>

      {isMobileOpen && (
        <div className={styles.mobileMenuContainer}>
          <div>
            <MobileSearch />
          </div>

          <div>
            <MobileNavigation />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFormMain;

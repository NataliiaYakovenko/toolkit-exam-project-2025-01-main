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
    <nav className={styles.mobileWrapper}>
      <button onClick={toggleMenu}>
        <MobileIcon isMobileOpen={isMobileOpen} />
      </button>

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
    </nav>
  );
};

export default MobileFormMain;

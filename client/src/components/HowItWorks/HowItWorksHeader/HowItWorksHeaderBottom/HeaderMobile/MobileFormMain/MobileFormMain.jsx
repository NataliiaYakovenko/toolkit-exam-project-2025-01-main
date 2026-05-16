import React, { useState, useEffect } from 'react';
import styles from './MobileFormMain.module.sass';
import MobileIcon from '../MobileIcon/MobileIcon';
import MobileSearch from '../MobileSearch/MobileSearch';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

const MobileFormMain = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };
  }, [isMobileOpen]);

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

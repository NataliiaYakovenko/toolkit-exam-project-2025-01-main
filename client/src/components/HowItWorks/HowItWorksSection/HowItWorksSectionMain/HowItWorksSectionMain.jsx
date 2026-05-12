import React from 'react';
import styles from './HowItWorksSectionMain.module.sass';
import HowAtomWorks from '../HowAtomWorks/HowAtomWorks';
import WaysUseAtom from '../WaysUseAtom/WaysUseAtom';
import NamingContests from '../NamingContests/NamingContests';
import Questions from '../Questions/Questions';
import Search from '../Search/Search';

const HowItWorksSectionMain = () => {
  return (
    <main className={styles.sectionMainContainer}>
      <div className={styles.howAtomWorks}>
        <HowAtomWorks />
        <WaysUseAtom />
        <NamingContests />
        <Questions />
        <Search/>
      </div>
    </main>
  );
};

export default HowItWorksSectionMain;

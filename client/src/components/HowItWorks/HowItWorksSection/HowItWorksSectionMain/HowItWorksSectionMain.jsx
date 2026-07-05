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
      <section
        className={styles.howAtomWorks}
        aria-label="How It Works sections"
      >
        <HowAtomWorks />
        <WaysUseAtom />
        <NamingContests />
        <Questions />
        <Search />
      </section>
    </main>
  );
};

export default HowItWorksSectionMain;

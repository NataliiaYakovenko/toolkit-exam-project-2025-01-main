import React from 'react';
import styles from './HowItWorksSectionMain.module.sass'
import HowAtomWorks from '../HowAtomWorks/HowAtomWorks';
import WaysUseAtom from '../WaysUseAtom/WaysUseAtom';
import NamingContests from '../NamingContests/NamingContests';

const HowItWorksSectionMain = () => {
    return (
        <div className={styles.sectionMainContainer}>
            <div className={styles.howAtomWorks}>
               <HowAtomWorks/>
               <WaysUseAtom/>
               <NamingContests/>
            </div>
   
        </div>
    );
}

export default HowItWorksSectionMain;

import React from 'react';
import styles from './HowItWorksSectionMain.module.sass'
import HowAtomWorks from '../HowAtomWorks/HowAtomWorks';
import WaysUseAtom from '../WaysUseAtom/WaysUseAtom';

const HowItWorksSectionMain = () => {
    return (
        <div className={styles.sectionMainContainer}>
            <div className={styles.howAtomWorks}>
               <HowAtomWorks/>
               <WaysUseAtom/>
            </div>
   
        </div>
    );
}

export default HowItWorksSectionMain;

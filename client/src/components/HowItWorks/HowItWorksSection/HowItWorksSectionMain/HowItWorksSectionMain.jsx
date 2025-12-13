import React from 'react';
import styles from './HowItWorksSectionMain.module.sass'
import HowAtomWorks from '../HowAtomWorks/HowAtomWorks';

const HowItWorksSectionMain = () => {
    return (
        <div className={styles.sectionMainContainer}>
            <div className={styles.howAtomWorks}>
               <HowAtomWorks/>
            </div>
   
        </div>
    );
}

export default HowItWorksSectionMain;

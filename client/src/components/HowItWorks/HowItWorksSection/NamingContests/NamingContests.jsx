import React from 'react';
import styles from './NamingContests.module.sass';
import CONSTANTS from '../../../../constants';
import StepBloc from '../Common/StepBloc/StepBloc';

const NamingContests = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topPart}>
          <img
            className={styles.image}
            src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_CUP}
            alt="Cup"
          />
          <h3 className={styles.title}>How Do Naming Contests Work?</h3>
        </div>
        <div className={styles.lowerPart}>
          <StepBloc
            title="Step 1"
            description="Fill out your Naming Brief and begin receiving name ideas in minutes"
          />
          <StepBloc
          title='Step2'
          description='Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.'
          />
           <StepBloc
          title='Step 3'
          description='Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.'
          />
           <StepBloc
          title='Step 4'
          description='Pick a Winner. The winner gets paid for their submission.'
          />
        </div>
      </div>
    </div>
  );
};

export default NamingContests;

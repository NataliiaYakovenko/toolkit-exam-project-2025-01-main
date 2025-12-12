import React from 'react';
import styles from './FeatureList.module.sass';

const FeatureList = (props) => {
  const list = [];

  for (let item of props.items) {
    list.push(
      <a className={styles.featureListCenterLink} href={item.link}>
        <p>{item.title}</p>
        {item.mark && (
          <span className={styles.featureListCenterMark}>{item.mark}</span>
        )}
      </a>
    );
  }

  return (
    <div className={styles.featureListCenter}>
      <h4 className={styles.featureListCenterTitle}>{props.title}</h4>
      {list}
    </div>
  );
};

export default FeatureList;

import React from 'react';
import styles from './FeatureList.module.sass';

const FeatureList = (props) => {
  return (
    <div className={styles.featureListCenter}>
      <h4 className={styles.featureListCenterTitle}>{props.title}</h4>

      {props.items.map((item, index) => (
        <a
          key={`${item.link}-${index}`}
          className={styles.featureListCenterLink}
          href={item.link}
        >
          <p>{item.title}</p>

          {item.mark && (
            <span className={styles.featureListCenterMark}>
              {item.mark}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

export default FeatureList;
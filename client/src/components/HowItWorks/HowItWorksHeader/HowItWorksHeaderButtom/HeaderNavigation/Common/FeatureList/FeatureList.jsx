import React from 'react';
import styles from './FeatureList.module.sass';

const FeatureList = (props) => {
  return (
    <div className={styles.featureListCenter}>
      <h4 className={styles.featureListCenterTitle}>{props.tittle}</h4>
      <div className={styles.wrapperLinkWitkMark}>
        <a className={styles.featureListCenterLink} href={props.link1}>
          <p>{props.titleLink1}</p>
        </a>
        <span className={styles.featureListCenterMark}>{props.mark}</span>
      </div>

      <a className={styles.featureListCenterLink} href={props.link2}>
        <p>{props.titleLink2}</p>
      </a>

      <a className={styles.featureListCenterLink} href={props.link3}>
        <p>{props.titleLink3}</p>
      </a>
      <a className={styles.featureListCenterLink} href={props.link4}>
        <p>{props.titleLink4}</p>
      </a>

      <a className={styles.featureListCenterLink} href={props.link6}>
        <p>{props.titleLink5}</p>
      </a>
      <a className={styles.featureListCenterLink} href={props.link5}>
        <p>{props.titleLink5}</p>
      </a>
      <a className={styles.featureListCenterLink} href={props.link6}>
        <p>{props.titleLink6}</p>
      </a>
      <a className={styles.featureListCenterLink} href={props.link7}>
        <p>{props.titleLink7}</p>
      </a>
    </div>
  );
};

export default FeatureList;

import React from 'react';
import styles from './UserContactInfo.module.sass';

const UserContactInfo = (props) => {
  return (
    <div className={styles.userContactInfoWrapper}>
      <a href={props.link} className={styles.link}>
        <img className={styles.image} src={props.image} alt={props.alt} />
        <span className={styles.title}>{props.title}</span>
      </a>
    </div>
  );
};

export default UserContactInfo;

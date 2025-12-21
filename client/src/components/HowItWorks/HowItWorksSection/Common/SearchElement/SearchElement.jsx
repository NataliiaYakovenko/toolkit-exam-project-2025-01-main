import React from 'react';
import styles from './SearchElement.module.sass';

const SearchElement = (props) => {
    return (
        <div className={styles.container}>
          <a className={styles.link} href={props.link} >
              <h4 className={styles.title}>{props.title}</h4>
            </a> 
        </div>
    );
}

export default SearchElement;

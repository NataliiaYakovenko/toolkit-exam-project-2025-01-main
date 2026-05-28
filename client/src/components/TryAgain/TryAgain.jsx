import React from 'react';
import styles from './TryAgain.module.sass';

const TryAgain = props => {
  const { getData } = props;
  return (
    <div className={styles.container}>
      <button onClick={() => getData()}>Server Error. Try again</button>
      <button className='fas fa-redo' onClick={() => getData()} />
    </div>
  );
};

export default TryAgain;

import React from 'react';
import styles from './ChatError.module.sass';

const ChatError = props => {
  const { getData } = props;
  return (
    <button className={styles.errorContainer} onClick={() => getData()}>
      <div className={styles.container}>
        <span>Server Error</span>
        <i className='fas fa-redo' />
      </div>
    </button>
  );
};

export default ChatError;

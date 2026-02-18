import React, { useState, useEffect, useRef } from 'react';
import styles from './ButtonGroup.module.sass';
import CONSTANTS from '../../constants';

const ButtonGroup = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const firstButton = useRef(null);

  useEffect(() => {
    firstButton.current?.focus();
  }, []);

  return (
    <div className={styles.buttonGroupContainer}>
      <h3 className={styles.buttonQuestion}>
        Do you want a matching domain (.com URL) with your name?
      </h3>
      <div className={styles.answersWrapper}>
        <button
          ref={firstButton}
          className={`${styles.answerBox} ${selectedIndex === 0 ? styles.selected : ''}`}
          type="button"
          onClick={() => setSelectedIndex(0)}
        >
          <legend className={styles.answerMark}>Recommended</legend>
          <div className={styles.textWrapper}>
            <img src={CONSTANTS.BUTTON_GROUP_MARK} alt="Mark" />
            <strong>Yes</strong>
            <p>But minor variations are allowed</p>
          </div>
        </button>
        <button
          className={`${styles.answerBox} ${selectedIndex === 1 ? styles.selected : ''}`}
          type="button"
          onClick={() => setSelectedIndex(1)}
        >
          <div className={styles.textWrapper}>
            <img src={CONSTANTS.BUTTON_GROUP_MARK} alt="Mark" />
            <strong>Yes</strong>
            <p>The Domain should exactly match the name</p>
          </div>
        </button>
        <button
          className={`${styles.answerBox} ${selectedIndex === 2 ? styles.selected : ''}`}
          type="button"
          onClick={() => setSelectedIndex(2)}
        >
          <div className={styles.textWrapper}>
            <img src={CONSTANTS.BUTTON_GROUP_MARK} alt="Mark" />
            <strong>No</strong>
            <p>I am only looking for a name, not a Domain</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ButtonGroup;

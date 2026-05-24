import React from 'react';
import styles from './ButtonGroup.module.sass';
import CONSTANTS from '../../constants';

const AnswerButton = ({ selected, onSelect, mark, strong, text }) => (
  <button
    className={`${styles.answerBox} ${selected ? styles.selected : ''}`}
    type="button"
    onClick={onSelect}
  >
    {mark && <span className={styles.answerMark}>{mark}</span>}
    <div className={styles.textWrapper}>
      <img src={CONSTANTS.BUTTON_GROUP_MARK} alt="Mark" />
      <strong>{strong}</strong>
      <p>{text}</p>
    </div>
  </button>
);

export default AnswerButton;

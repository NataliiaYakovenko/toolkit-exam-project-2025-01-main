import React from 'react';
import classNames from 'classnames';
import styles from './ButtonGroup.module.sass';
import CONSTANTS from '../../constants';

const AnswerButton = ({ selected, onSelect, mark, strong, text }) => (
  <button
    className={classNames(styles.answerBox, { [styles.selected]: selected })}
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

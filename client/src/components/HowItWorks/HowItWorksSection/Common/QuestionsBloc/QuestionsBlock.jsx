import React, { useState } from 'react';
import styles from './QuestionsBlock.module.sass';
import CONSTANTS from '../../../../../constants';

const QuestionsBlock = ({ items = [], title = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSign = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const list = items.map((item, index) => {
    const isOpen = openIndex === index;
    
    return (
      <div key={index}>
        {!isOpen ? (
          <div
            className={styles.questionsWrapper}
            onClick={() => toggleSign(index)}
          >
            <span className={styles.question}>{item.question}</span>
            <img
              className={styles.openSign}
              src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_PLUS}
              alt="Plus"
            />
          </div>
        ) : (
          <div
            className={styles.containerOpen}
            onClick={() => toggleSign(index)}
          >
            <span className={styles.questionOpen}>
             {item.questionOpen || item.question}
            </span>
            <img
              className={styles.closedSign}
              src={CONSTANTS.HOW_IT_WORKS_SECTION_ICON_X}
              alt="X"
            />
            <div className={styles.answerWrapper}>
              <p className={styles.text}>{item.text}</p>
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      {list}
    </div>
  );
};

export default QuestionsBlock;
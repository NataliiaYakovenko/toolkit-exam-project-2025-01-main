import React, { useState, useRef, useEffect } from 'react';
import styles from './QuestionsBlock.module.sass';
import CONSTANTS from '../../../../../constants';

const QuestionsBlock = ({ items = [], title = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRefs = useRef([]);

  const toggleSign = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      setContentHeight(contentRefs.current[openIndex].scrollHeight);
    }
  }, [openIndex]);

  const list = items.map((item, index) => {
    const isOpen = openIndex === index;

    return (
      <div 
        key={index} 
        className={`${styles.questionItem} ${isOpen ? styles.open : ''}`}
      >
        <div
          className={styles.questionHeader}
          onClick={() => toggleSign(index)}
        >
          <span className={styles.question}>
            {item.question}
          </span>
          <img
            className={styles.signIcon}
            src={isOpen 
              ? CONSTANTS.HOW_IT_WORKS_SECTION_ICON_X 
              : CONSTANTS.HOW_IT_WORKS_SECTION_ICON_PLUS
            }
            alt={isOpen ? "Close" : "Open"}
          />
        </div>
        
        <div 
          className={styles.answerContainer}
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : '0px',
            opacity: isOpen ? 1 : 0,
          }}
          ref={el => contentRefs.current[index] = el}
        >
          <div className={styles.answerContent}>
            <p className={styles.text}>{item.text}</p>
          </div>
        </div>
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

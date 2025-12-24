import React, { useState } from 'react';
import styles from './Questions.module.sass';
import TypesQuestions from './TypesQuestions';

const Questions = () => {
  const [active, setActive] = useState(0);

  const handlerClick = (index) => {
    setActive(index);

    const sectionId = `section-${index}`;
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>Frequently Asked Questions</h3>
        <div className={styles.wrapperTypesQuestions}>
          {[
            'Launching A Contest',
            'Buying From Marketplace',
            ' Managed Contests',
            ' For Creatives',
          ].map((item, index) => (
            <span
              key={index}
              onClick={() => handlerClick(index)}
              className={`${styles.typeQuestion} ${
                active === index ? styles.active : ''
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <TypesQuestions />
      </div>
    </div>
  );
};

export default Questions;

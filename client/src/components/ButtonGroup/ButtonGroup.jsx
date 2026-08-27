import React, { useState } from 'react';
import styles from './ButtonGroup.module.sass';
import AnswerButton from './AnswerButton';
import answers from './Answer';

const ButtonGroup = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className={styles.buttonGroupContainer}>
      <h3 className={styles.buttonQuestion}>
        Do you want a matching domain (.com URL) with your name?
      </h3>

      <div className={styles.answersWrapper}>
        {answers.map((answer) => {
          return (
            <AnswerButton
              key={answer.id}
              selected={selectedId === answer.id}
              onSelect={() => {
                setSelectedId(answer.id);
              }}
              mark={answer.mark}
              strong={answer.strong}
              text={answer.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ButtonGroup;

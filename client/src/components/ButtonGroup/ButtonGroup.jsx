import React, { useState, useCallback } from 'react';
import styles from './ButtonGroup.module.sass';
import AnswerButton from './AnswerButton';

const ButtonGroup = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect0 = useCallback(() => setSelectedIndex(0), []);
  const handleSelect1 = useCallback(() => setSelectedIndex(1), []);
  const handleSelect2 = useCallback(() => setSelectedIndex(2), []);

  return (
    <div className={styles.buttonGroupContainer}>
      <h3 className={styles.buttonQuestion}>
        Do you want a matching domain (.com URL) with your name?
      </h3>
      <div className={styles.answersWrapper}>
        <AnswerButton
          selected={selectedIndex === 0}
          onSelect={handleSelect0}
          mark="Recommended"
          strong="Yes"
          text="But minor variations are allowed"
        />
        <AnswerButton
          selected={selectedIndex === 1}
          onSelect={handleSelect1}
          strong="Yes"
          text="The Domain should exactly match the name"
        />
        <AnswerButton
          selected={selectedIndex === 2}
          onSelect={handleSelect2}
          strong="No"
          text="I am only looking for a name, not a Domain"
        />
      </div>
    </div>
  );
};

export default ButtonGroup;

import React from 'react';
import UserContactInfo from '../Common/UserContactInfo/UserContactInfo';
import CONSTANTS from '../../../../../../constants';
import styles from './ContactForm.module.sass';

const ContactForm = () => {
  return (
    <div className={styles.contactFormContainer}>
      <UserContactInfo
        link="https://www.atom.com/login"
        image={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_USER_FORM}
        alt="User"
        title="Login"
      />
      <UserContactInfo
        link="https://www.atom.com/signup"
        image={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_USER_FORM}
        alt="User"
        title="Signup"
      />
    </div>
  );
};

export default ContactForm;

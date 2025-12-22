import React from 'react';
import UserContactInfo from '../Common/UserContactInfo/UserContactInfo';
import CONSTANTS from '../../../../../../constants';
import styles from './CommunicationWithUser.module.sass';



const CommunicationWithUser = () => {
  return (
    <div className={styles.communictionContainer}>
      <UserContactInfo
        link="https://www.atom.com/tel:1-877-355-3585"
        image={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_PHONE}
        alt="phone"
        title="(877) 355-3585"
      />
      <UserContactInfo
        link="/"
        image={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_CHAT}
        alt="Chat"
        title="Chat"
      />
      <UserContactInfo
        link="/"
        image={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_EMAIL}
        alt="Email"
        title="Email"
      />
      <UserContactInfo
        link="https://helpdesk.atom.com/en/"
        image={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_HELP_DESK}
        alt="Help desk"
        title="Help Desk"
      />
    </div>
  );
};

export default CommunicationWithUser;

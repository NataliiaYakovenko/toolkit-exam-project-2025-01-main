import React from 'react';
import withRouter from '../../hocs/withRouter';
import styles from './Notification.module.sass';

const Notification = props => (
  <div>
    <br />
    <span>{props.message}</span>
    <br />
    {props.contestId && (
      <button
        onClick={() => props.navigate(`/contest/${props.contestId}`)}
        className={styles.goToContest}
      >
        Go to contest
      </button>
    )}
  </div>
);

export default withRouter(Notification);

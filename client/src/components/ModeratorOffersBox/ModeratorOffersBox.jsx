import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import CONSTANTS from '../../constants';
import { moderateOffer } from '../../store/slices/moderatorOffersSlice';
import styles from './ModeratorOffersBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../OfferBox/confirmStyle.css';

const ModeratorOffersBox = ({ offer }) => {
  const dispatch = useDispatch();
  const { text, fileName, id, status, Contest } = offer;
  const { title, industry } = Contest || {};
  const contestType = Contest?.contestType;

  const confirmAction = (newStatus) => {
    confirmAlert({
      title: 'Confirm action',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            dispatch(moderateOffer({ offerId: id, status: newStatus })),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div className={styles.offerContainer}>
      <div className={styles.mainInfoContainer}>

        <div className={styles.contestInfo}>
          <div className={styles.contestField}>
            <span className={styles.label}>Title of contest:</span>
            <span className={styles.value}>{title}</span>
          </div>
          <div className={styles.contestField}>
            <span className={styles.label}>Industry:</span>
            <span className={styles.value}>{industry}</span>
          </div>
        </div>

        <div className={styles.responseContainer}>
          {contestType === CONSTANTS.LOGO_CONTEST ? (
            <img
              className={styles.responseLogo}
              src={`${CONSTANTS.publicURL}${fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.responseText}>{text}</span>
          )}
        </div>
      </div>

      {status === CONSTANTS.OFFER_STATUS_PENDING && (
        <div className={styles.btnsContainer}>
          <button
            className={classNames(styles.btn, styles.approve)}
            onClick={() => confirmAction('approved')}
          >
            Approve
          </button>
          <button
            className={classNames(styles.btn, styles.reject)}
            onClick={() => confirmAction('rejected')}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ModeratorOffersBox;

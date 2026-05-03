import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-18-image-lightbox';
import withRouter from '../../hocs/withRouter';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-18-image-lightbox/style.css';
import Error from '../../components/Error/Error';

const ContestPage = ({
  params,
  contestByIdStore,
  userStore,
  chatStore,
  getData,
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
}) => {
  useEffect(() => {
    const { id } = params;
    getData({ contestId: id });
  }, [params, getData]);

  useEffect(() => {
    return () => {
      changeEditContest(false);
    };
  }, [changeEditContest]);

  const setOffersList = useCallback(() => {
    const array = [];
    for (let i = 0; i < contestByIdStore.offers.length; i++) {
      array.push(
        <OfferBox
          data={contestByIdStore.offers[i]}
          key={contestByIdStore.offers[i].id}
          needButtons={needButtons}
          setOfferStatus={handleSetOfferStatus}
          contestType={contestByIdStore.contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  }, [contestByIdStore.offers, contestByIdStore.contestData]);

  const needButtons = useCallback(
    (offerStatus) => {
      const contestCreatorId = contestByIdStore.contestData.User.id;
      const userId = userStore.data.id;
      const contestStatus = contestByIdStore.contestData.status;
      const { role } = userStore.data;
      return (
        role === CONSTANTS.CUSTOMER &&
        contestCreatorId === userId &&
        contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
        (offerStatus === CONSTANTS.OFFER_STATUS_APPROVED ||
          offerStatus === CONSTANTS.OFFER_STATUS_WON ||
          offerStatus === 'approved')
      );
    },
    [contestByIdStore.contestData, userStore.data]
  );

  const handleSetOfferStatus = useCallback(
    (creatorId, offerId, command) => {
      clearSetOfferStatusError();
      const { id, orderId, priority } = contestByIdStore.contestData;
      const obj = {
        command,
        offerId,
        creatorId,
        orderId,
        priority,
        contestId: id,
      };
      setOfferStatus(obj);
    },
    [contestByIdStore.contestData, clearSetOfferStatusError, setOfferStatus]
  );

  const findConversationInfo = useCallback(
    (interlocutorId) => {
      const { messagesPreview } = chatStore;
      const { id } = userStore.data;
      const participants = [id, interlocutorId];
      participants.sort(
        (participant1, participant2) => participant1 - participant2
      );
      for (let i = 0; i < messagesPreview.length; i++) {
        if (isEqual(participants, messagesPreview[i].participants)) {
          return {
            participants: messagesPreview[i].participants,
            _id: messagesPreview[i]._id,
            blackList: messagesPreview[i].blackList,
            favoriteList: messagesPreview[i].favoriteList,
          };
        }
      }
      return null;
    },
    [chatStore, userStore.data]
  );

  const goChat = useCallback(() => {
    const { User } = contestByIdStore.contestData;
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  }, [contestByIdStore.contestData, goToExpandedDialog, findConversationInfo]);

  const { role } = userStore.data;
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={() => getData({ contestId: params.id })} />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <button
                onClick={() => changeContestViewMode(true)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </button>
              <button
                onClick={() => changeContestViewMode(false)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </button>
            </div>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <div className={styles.offersContainer}>
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                <div className={styles.offers}>{setOffersList()}</div>
              </div>
            )}
          </div>
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContestPage));

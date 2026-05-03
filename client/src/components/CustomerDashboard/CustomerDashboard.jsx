import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

const CustomerDashboard = ({
  customerFilter,
  contests,
  isFetching,
  error,
  haveMore,
  navigate,
  getContests,
  clearContestsList,
  newFilter,
}) => {
  const getContestsRequest = useCallback(() => {
    getContests({
      limit: 8,
      offset: 0,
      contestStatus: customerFilter,
    });
  }, [getContests, customerFilter]);

  const loadMore = useCallback(
    (startFrom) => {
      getContests({
        limit: 8,
        offset: startFrom,
        contestStatus: customerFilter,
      });
    },
    [getContests, customerFilter]
  );

  const goToExtended = useCallback(
    (contest_id) => {
      navigate(`/contest/${contest_id}`);
    },
    [navigate]
  );

  const setContestList = useCallback(() => {
    const array = [];
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={goToExtended}
        />
      );
    }
    return array;
  }, [contests, goToExtended]);

  const tryToGetContest = useCallback(() => {
    clearContestsList();
    getContestsRequest();
  }, [clearContestsList, getContestsRequest]);

  useEffect(() => {
    getContestsRequest();
  }, [getContestsRequest]);

  useEffect(() => {
    return () => {
      clearContestsList();
    };
  }, [clearContestsList]);

  useEffect(() => {
    getContestsRequest();
  }, [customerFilter, getContestsRequest]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)}
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
            [styles.filter]: CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
          })}
        >
          Active contests
        </div>
        <div
          onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)}
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
          })}
        >
          Completed contests
        </div>
        <div
          onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_PENDING)}
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
          })}
        >
          Inactive contests
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest} />
        ) : (
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            navigate={navigate}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import withRouter from '../../hocs/withRouter';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const CreatorDashboard = ({
  location,
  navigate,
  creatorFilter,
  contests,
  isFetching,
  haveMore,
  error,
  dataForContest,
  getContests,
  clearContestsList,
  newFilter,
  getDataForContest,
}) => {
  const getPredicateOfRequest = useCallback(() => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  }, [creatorFilter]);

  const getContestsRequest = useCallback(
    (filter) => {
      getContests({
        limit: 8,
        offset: 0,
        ...filter,
      });
    },
    [getContests]
  );

  const parseParamsToUrl = useCallback(
    (filter) => {
      const obj = {};
      Object.keys(filter).forEach((el) => {
        if (filter[el]) obj[el] = filter[el];
      });
      navigate(`/Dashboard?${queryString.stringify(obj)}`);
    },
    [navigate]
  );

  const parseUrlForParams = useCallback(
    (search) => {
      const obj = queryString.parse(search);
      const filter = {
        typeIndex: obj.typeIndex || 1,
        contestId: obj.contestId ? obj.contestId : '',
        industry: obj.industry ? obj.industry : '',
        awardSort: obj.awardSort || 'asc',
        ownEntries:
          typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
      };
      if (!isEqual(filter, creatorFilter)) {
        newFilter(filter);
        clearContestsList();
        getContestsRequest(filter);
        return false;
      }
      return true;
    },
    [creatorFilter, newFilter, clearContestsList, getContestsRequest]
  );

  const changePredicate = useCallback(
    ({ name, value }) => {
      const newValue = value === 'Choose industry' ? null : value;
      newFilter({ [name]: newValue });
      parseParamsToUrl({
        ...creatorFilter,
        ...{ [name]: newValue },
      });
    },
    [creatorFilter, newFilter, parseParamsToUrl]
  );

  const loadMore = useCallback(
    (startFrom) => {
      getContests({
        limit: 8,
        offset: startFrom,
        ...getPredicateOfRequest(),
      });
    },
    [getContests, getPredicateOfRequest]
  );

  const tryLoadAgain = useCallback(() => {
    clearContestsList();
    getContests({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  }, [clearContestsList, getContests, getPredicateOfRequest]);

  const goToExtended = useCallback(
    (contestId) => {
      navigate(`/contest/${contestId}`);
    },
    [navigate]
  );

  const renderSelectType = useCallback(() => {
    const array = [];
    types.forEach(
      (el, i) =>
        !i ||
        array.push(
          <option key={i - 1} value={el}>
            {el}
          </option>
        )
    );
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    );
  }, [creatorFilter.typeIndex, changePredicate]);

  const renderIndustryType = useCallback(() => {
    const array = [];
    if (
      !dataForContest ||
      !dataForContest.data ||
      !dataForContest.data.industry
    ) {
      return (
        <select className={styles.input}>
          <option>Choose industry</option>
        </select>
      );
    }

    const { industry } = dataForContest.data;
    array.push(
      <option key={0} value={null}>
        Choose industry
      </option>
    );
    industry.forEach((industryItem, i) =>
      array.push(
        <option key={i + 1} value={industryItem}>
          {industryItem}
        </option>
      )
    );
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    );
  }, [dataForContest, creatorFilter.industry, changePredicate]);

  const setContestList = useCallback(() => {
    const array = [];
    if (!contests) {
      return null;
    }
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

  useEffect(() => {
    getDataForContest({
      characteristic1: 'industry',
    });
    if (parseUrlForParams(location.search) && !contests.length) {
      getContestsRequest(creatorFilter);
    }
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      parseUrlForParams(location.search);
    };
    handleUrlChange();
  }, [location.search, parseUrlForParams]);

  const { isFetching: isDataFetching } = dataForContest || {};

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
                name: 'ownEntries',
                value: !creatorFilter.ownEntries,
              })
            }
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            {renderSelectType()}
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target }) =>
                changePredicate({
                  name: 'contestId',
                  value: target.value,
                })
              }
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {!isDataFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              {renderIndustryType()}
            </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
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
  );
};

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CREATOR })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: (data) => dispatch(getDataForContest(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);

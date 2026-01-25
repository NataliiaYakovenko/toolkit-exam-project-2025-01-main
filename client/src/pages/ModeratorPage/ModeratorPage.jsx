import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import ModeratorOffersBox from '../../components/ModeratorOffersBox/ModeratorOffersBox';
import { getModeratorOffers } from '../../store/slices/moderatorOffersSlice';
import styles from './ModeratorPage.module.sass';

const ModeratorPage = () => {
  const dispatch = useDispatch();
  const { offers, isFetching, page, totalPages, error } = useSelector(
    (state) => state.moderatorOffers
  );

  useEffect(() => {
    dispatch(getModeratorOffers({ page: 1 }));
  }, [dispatch]);

  if (error) {
    return <p>!!!Try again!!!</p>;
  }

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Offers list</h1>
      {offers.map((offer) => (
        <ModeratorOffersBox key={offer.id} offer={offer} />
      ))}

      <div className={styles.pagination}>
        <button
          className={styles.previous}
          disabled={page === 1}
          onClick={() => dispatch(getModeratorOffers({ page: page - 1 }))}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className={styles.next}
          disabled={page === totalPages}
          onClick={() => dispatch(getModeratorOffers({ page: page + 1 }))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ModeratorPage;

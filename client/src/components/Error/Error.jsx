import React from 'react';
import styles from './Error.module.sass';

const Error = (props) => {
  console.log('Error props:', props);
  const getMessage = () => {
    const { status, data } = props;

    const isHtml = (str) =>
      typeof str === 'string' && /^\s*<[!DOCTYPE html]|<\w+/.test(str.trim());

    switch (status) {
      case 404:
        if (isHtml(data)) {
          return 'The server is unavailable. Please try again later.';
        }
        return data || 'Page not found';

      case 400:
        return data || 'Check the input data';

      case 409:
        return data || 'Conflict error';

      case 403:
        return 'Bank decline transaction';

      case 406:
        return data || 'Not acceptable';

      default:
        return 'Server Error';
    }
  };

  const { clearError } = props;
  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <i className="far fa-times-circle" onClick={() => clearError()} />
    </div>
  );
};

export default Error;

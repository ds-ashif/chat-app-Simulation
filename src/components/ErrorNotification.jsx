import React from 'react';
import './ErrorNotification.css';

const ErrorNotification = ({ message, retry }) => {
  if (!message) return null;

  return (
    <div className="error-notification">
      <div className="error-content">
        <span className="error-message">{message}</span>
        {retry && (
          <button className="retry-button" onClick={retry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorNotification;
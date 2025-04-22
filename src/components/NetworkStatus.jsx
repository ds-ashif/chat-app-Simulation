import React, { useEffect, useState } from 'react';

const NetworkStatus = ({ isOnline }) => {
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    if (!isOnline) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);
  
  if (!isOnline) {
    return (
      <div className={`network-status ${showNotification ? 'show' : ''}`}>
        {/* <span className="offline">Offline: </span> */}
        <span>Attempting to reconnect...</span>
      </div>
    );
  }
  
  return null;
};

export default NetworkStatus;
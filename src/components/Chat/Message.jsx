import React from 'react';

const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? 'user' : ''}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default Message;
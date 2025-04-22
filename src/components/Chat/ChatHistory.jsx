import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const ChatHistory = ({ messages }) => {
  const userId = useSelector(state => state.auth.user?.id);

  return (
    <div className="chat-history">
      {messages.map((message) => (
        <Message 
          key={message.id || message.tempId} 
          message={message} 
          isCurrentUser={message.userId === userId}
        />
      ))}
    </div>
  );
};

export default ChatHistory;
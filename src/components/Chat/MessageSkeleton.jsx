import React from 'react';

const MessageSkeleton = () => {
  return (
    <div className="message-skeleton">
      <div className="avatar-skeleton" />
      <div className="content-skeleton">
        <div className="name-skeleton" />
        <div className="text-skeleton" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
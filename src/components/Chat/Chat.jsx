import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMessages, sendNewMessage, clearError } from '../../features/chat/chatSlice';
import ChatHistory from './ChatHistory';
import MessageSkeleton from './MessageSkeleton';
import ErrorNotification from '../ErrorNotification';
import NetworkStatus from '../NetworkStatus';

const Chat = () => {
  const dispatch = useDispatch();
  const { messages, status, error, isSending } = useSelector(state => state.chat);
  // const user = useSelector(state => state.auth.user);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    dispatch(loadMessages());
    
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [dispatch]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    try {
      await dispatch(sendNewMessage({ text: messageText })).unwrap();
      setMessageText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(loadMessages());
  };

  return (
    <div className="chat-container">
      <NetworkStatus isOnline={isOnline} />
      
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>
      
      <div className="chat-messages">
        {status === 'loading' ? (
          <>
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </>
        ) : status === 'failed' ? (
          <ErrorNotification message={error} retry={handleRetry} />
        ) : (
          <ChatHistory messages={messages} />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          disabled={isSending}
        />
        <button type="submit" disabled={isSending || !messageText.trim()}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chat;
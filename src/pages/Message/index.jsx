import React from 'react';
import MessageList from './components/MessageList';

const Message = ({ container }) => (
  <div className="message">
    <header className="message__header">
      <h2 className="message__title">Tin nhắn</h2>
    </header>
    <MessageList container={container} />
  </div>
);

export default Message;

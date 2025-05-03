import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from 'antd';

const ChatBox = ({ conversationId, initialMessages = [], container }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    if (e.key !== 'Enter' || !input.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { text: input.trim(), sender: 'user', time: timeNow };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    container?.sendMessage?.(conversationId, newMessage);

    // Simulated reply
    setTimeout(() => {
      const reply = {
        text: 'Nice to hear from you!',
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="chat-box">
      <div className="chat-box__body" ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-box__message ${
              msg.sender === 'user' ? 'chat-box__message--user' : 'chat-box__message--other'
            }`}
          >
            {msg.sender === 'other' && (
              <Avatar
                src={`https://i.pravatar.cc/40?u=${conversationId}`}
                size={32}
                className="chat-box__avatar"
              />
            )}
            <div className="chat-box__message-content">
              <span className="chat-box__message-text">{msg.text}</span>
              <span className="chat-box__message-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-box__footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleSendMessage}
          placeholder="Type a message..."
          className="chat-box__input"
        />
      </div>
    </div>
  );
};

export default ChatBox;

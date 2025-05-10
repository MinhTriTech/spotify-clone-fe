import { useState, useEffect, useRef } from 'react';
import { Avatar } from 'antd';
import { sendMessage } from '../../../../services/message';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { useNavigate } from 'react-router-dom';

const ChatBox = ({ conversationId, recipientId, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);

    socketRef.current.onopen = () => {
      console.log('🔌 WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const incomingMsg = {
        text: data.message,
        sender: data.sender_id === parseInt(recipientId) ? 'other' : 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, incomingMsg]);
    };

    socketRef.current.onclose = () => {
      console.log('❌ WebSocket disconnected');
    };

    return () => {
      socketRef.current?.close();
    };
  }, [conversationId, recipientId]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e.key !== 'Enter' || !input.trim()) return;

    const text = input.trim();

    setInput('');

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          message: text,
          sender_id: recipientId,
          room_id: conversationId,
        })
      );
    }

    try {
      const response = await sendMessage({
        content: text,
        recipient_id: recipientId,
        chatroom_id: conversationId,
      });

      if (conversationId === null) {
        const newChatRoomId = response.chatroom_id;
        navigate(`/message/${recipientId}/${newChatRoomId}`);
      }
    } catch (err) {
      console.error('❌ Failed to send message via service:', err);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-box__body" ref={chatBodyRef}>
        {messages.length === 0 && (
          <div className="chat-box__empty">Hãy bắt đầu cuộc trò chuyện!</div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-box__message ${
              msg.sender === 'user'
                ? 'chat-box__message--user'
                : 'chat-box__message--other'
            }`}
          >
            {msg.sender === 'other' && (
              <Avatar
                src={ARTISTS_DEFAULT_IMAGE}
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
          onKeyDown={handleSendMessage}
          placeholder="Type a message..."
          className="chat-box__input"
        />
      </div>
    </div>
  );
};

export default ChatBox;

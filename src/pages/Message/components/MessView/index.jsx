import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBox from '../ChatBox';
import { Avatar, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const MessHeader = ({ avatar, user, onBack }) => (
  <div className="mess-view__header">
    <Button icon={<LeftOutlined />} onClick={onBack} className="mess-view__back-button" />
    {avatar && <Avatar src={avatar} size={40} />}
    <h3>{user || 'Conversation not found'}</h3>
  </div>
);

const MessView = () => {
  const { messageId } = useParams(); // 👈 Đây là chatroom_id
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Lấy tin nhắn trong phòng chat
        const res = await fetch(`/chat/chatrooms/${messageId}/messages/`, {
          credentials: 'include',
        });
        const data = await res.json();

        // Lấy user hiện tại để phân biệt chiều tin nhắn
        const meRes = await fetch('/auth/me/', { credentials: 'include' });
        const me = await meRes.json();
        const currentUserId = me.id;

        // Chuyển dữ liệu tin nhắn sang định dạng cho ChatBox
        const parsedMessages = data.map((msg) => ({
          text: msg.content,
          sender: msg.sender_id === currentUserId ? 'user' : 'other',
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));

        // Giả lập user info (avatar, tên) — bạn có thể thay bằng dữ liệu thật từ API khác
        setConversation({
          id: messageId,
          user: `User ${messageId}`,
          avatar: `https://i.pravatar.cc/40?u=${messageId}`,
          messages: parsedMessages,
        });
      } catch (err) {
        console.error('❌ Failed to load messages:', err);
      }
    };

    fetchMessages();
  }, [messageId]);

  return (
    <div className="mess-view">
      <MessHeader
        avatar={conversation?.avatar}
        user={conversation?.user}
        onBack={() => navigate('/message')}
      />
      {conversation ? (
        <ChatBox
          conversationId={conversation.id}     // 👈 Là chatroom_id
          initialMessages={conversation.messages}
          recipientId={conversation.id}        // 👈 Để ChatBox gửi đúng phòng
        />
      ) : (
        <div className="mess-view__empty">Loading...</div>
      )}
    </div>
  );
};

export default MessView;

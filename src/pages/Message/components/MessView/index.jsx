import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBox from '../ChatBox';
import { Avatar, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

// Header tách riêng gọn gàng
const MessHeader = ({ avatar, user, onBack }) => (
  <div className="mess-view__header">
    <Button
      icon={<LeftOutlined />}
      onClick={onBack}
      className="mess-view__back-button"
    />
    {avatar && <Avatar src={avatar} size={40} />}
    <h3>{user || 'Conversation not found'}</h3>
  </div>
);

const MessView = ({ container }) => {
  const { messageId } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const data = container.getConversationById?.(messageId);

    if (data) {
      setConversation(data);
    } else {
      // Dữ liệu giả nếu không tìm thấy
      setConversation({
        id: messageId,
        user: `User ${messageId}`,
        avatar: `https://i.pravatar.cc/40?u=${messageId}`,
        messages: [
          { text: 'Hey, how’s it going?', sender: 'other', time: '10:30 AM' },
          { text: 'Pretty good, you?', sender: 'user', time: '10:32 AM' },
        ],
      });
    }
  }, [messageId, container]);

  return (
    <div className="mess-view">
      <MessHeader
        avatar={conversation?.avatar}
        user={conversation?.user}
        onBack={() => navigate('/message')}
      />
      {conversation?.messages?.length > 0 ? (
        <ChatBox
          conversationId={messageId}
          initialMessages={conversation.messages}
          container={container}
        />
      ) : (
        <div className="mess-view__empty">No messages available.</div>
      )}
    </div>
  );
};

export default MessView;

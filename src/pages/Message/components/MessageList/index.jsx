import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Avatar, Space } from 'antd';

const MessageList = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch('/chat/chatrooms/', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const parsed = data.map(item => ({
          id: item.other_user_id,
          user: item.other_user_name,
          lastMessage: item.last_message?.content || 'No messages yet',
          time: item.last_message?.timestamp
            ? new Date(item.last_message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '',
        }));
        setConversations(parsed);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch conversations:', err);
        setConversations([]);
      });
  }, []);

  const handleClick = (id) => navigate(`/message/${id}`);

  return (
    <div className="message-list">
      <List
        itemLayout="horizontal"
        dataSource={conversations}
        renderItem={({ id, user, lastMessage, time }) => (
          <List.Item onClick={() => handleClick(id)} className="message-list__item">
            <List.Item.Meta
              avatar={<Avatar src={`https://i.pravatar.cc/40?u=${id}`} />}
              title={<span className="message-list__user">{user}</span>}
              description={
                <Space direction="vertical" size={2}>
                  <span className="message-list__message">{lastMessage}</span>
                  <span className="message-list__time">{time}</span>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MessageList;

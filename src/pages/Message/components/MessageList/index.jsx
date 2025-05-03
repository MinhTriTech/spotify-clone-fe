import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Avatar, Space } from 'antd';

const MessageList = ({ container }) => {
  const navigate = useNavigate();

  const conversations = container.getConversations?.() || [
    { id: '123', user: 'John Doe', lastMessage: 'Hey, how’s it going?', time: '10:30 AM' },
    { id: '456', user: 'Jane Smith', lastMessage: 'Check out this song!', time: 'Yesterday' },
    { id: '789', user: 'Alex Brown', lastMessage: 'Let’s meet up later.', time: 'Monday' },
  ];

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

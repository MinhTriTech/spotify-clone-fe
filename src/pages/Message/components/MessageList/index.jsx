import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Avatar, Space } from 'antd';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { fetchChatRooms } from '../../../../services/message';

const MessageList = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [sockets, setSockets] = useState({});

  useEffect(() => {
    fetchChatRooms()
      .then(data => {
        const parsed = data.map(item => ({
          id: item.id,
          idUser: item.other_user_id,
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

        // parsed.forEach(conversation => {
        //   const ws = new WebSocket(`ws://localhost:8000/ws/chat/${conversation.id}/`); 

        //   ws.onmessage = (event) => {
        //     const data = JSON.parse(event.data);
        //     setConversations((prevConversations) => {
        //       const updatedConversations = prevConversations.map(conversation => {
        //         if (conversation.id === data.id) {
        //           return { ...conversation, lastMessage: data.message, time: new Date().toLocaleTimeString() };
        //         }
        //         return conversation;
        //       });
        //       return updatedConversations;
        //     });
        //   };

        //   setSockets(prevSockets => ({ ...prevSockets, [conversation.id]: ws }));
        // });
      })
      .catch((err) => {
        console.error('❌ Failed to fetch conversations:', err);
        setConversations([]);
      });

    return () => {
      Object.values(sockets).forEach(ws => ws.close());
    };
  }, []);

  const handleClick = (id, idUser, user) => navigate(`/message/${idUser}/${id}`, { state: {user, id} });

  return (
    <div className="message-list">
      <List
        itemLayout="horizontal"
        dataSource={conversations}
        renderItem={({ id, idUser, user, lastMessage, time }) => (
          <List.Item onClick={() => handleClick(id, idUser, user)} className="message-list__item">
            <List.Item.Meta
              avatar={<Avatar src={ARTISTS_DEFAULT_IMAGE} />}
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

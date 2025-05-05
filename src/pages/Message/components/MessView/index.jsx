import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ChatBox from '../ChatBox';
import { Avatar, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { fetchMessages } from '../../../../services/message';

const MessHeader = ({ avatar, user, onBack }) => (
  <div className="mess-view__header">
    <Button icon={<LeftOutlined />} onClick={onBack} className="mess-view__back-button" />
    {avatar && <Avatar src={avatar} size={40} />}
    <h3>{user || 'Conversation not found'}</h3>
  </div>
);

const MessView = () => {
  const { idUser } = useParams();
  const { idChatRoom } = useParams();
  const location = useLocation();
  const { user } = location.state || { };
  
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMessages(idChatRoom);

        setConversation({
          id: idChatRoom,
          user: user,
          avatar: ARTISTS_DEFAULT_IMAGE,
          recipientId: idUser,
          messages: data.map(msg => ({
            text: msg.content,
            sender: msg.sender_id === parseInt(idUser) ? 'other' : 'user',
            time: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
        });
      } catch (err) {
        console.error('❌ Failed to load messages:', err);
      }
    };

    fetchData();
  }, [idUser, idChatRoom]);

  console.log(conversation);
  

  return (
    <div className="mess-view">
      <MessHeader
        avatar={conversation?.avatar}
        user={conversation?.user}
        onBack={() => navigate('/message')}
      />
      {conversation ? (
        <ChatBox
          conversationId={conversation.id}    
          initialMessages={conversation.messages}
          recipientId={conversation.recipientId}     
        />
      ) : (
        <div className="mess-view__empty">Loading...</div>
      )}
    </div>
  );
};

export default MessView;

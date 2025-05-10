import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBox from '../ChatBox';
import { Avatar, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { fetchMessages } from '../../../../services/message';
import { getUser } from '../../../../services/users';

const MessHeader = ({ avatar, user, onBack }) => (
  <div className="mess-view__header">
    <Button icon={<LeftOutlined />} onClick={onBack} className="mess-view__back-button" />
    {avatar && <Avatar src={avatar} size={40} />}
    <h3>{user || 'Conversation not found'}</h3>
  </div>
);

const MessView = () => {
  const { idUser, idChatRoom } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (idChatRoom) {
          const dataMess = await fetchMessages(idChatRoom);
          const dataUser = await getUser(idUser);

          if (!isMounted) return;

          setConversation({
            id: idChatRoom,
            user: dataUser.data.user.username,
            avatar: ARTISTS_DEFAULT_IMAGE,
            recipientId: idUser,
            messages: dataMess.map(msg => ({
              text: msg.content,
              sender: msg.sender_id === parseInt(idUser) ? 'other' : 'user',
              time: new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            })),
          });
        } else {
          const dataUser = await getUser(idUser);

          if (!isMounted) return;

          setConversation({
            id: null, 
            user: dataUser.data.user.username,
            avatar: ARTISTS_DEFAULT_IMAGE,
            recipientId: idUser,
            messages: [], 
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error('❌ Failed to load messages or user:', err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [idUser, idChatRoom]);

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

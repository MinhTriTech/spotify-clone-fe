import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Avatar, Space } from 'antd';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { subscribeToSocket } from '../../../../services/socket';
import { messageActions } from '../../../../store/slices/message';

const MessageList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [conversations, setConversations] = useState([]);

  const message = useAppSelector((state) => state.message.messList);
   
  useEffect(() => {
    const unsubscribe = subscribeToSocket((data) => {
      const room = message.find(item => item.id === data.room_id);
      if (room) {
          dispatch(messageActions.updateMessageList(data));
      } else {
          dispatch(messageActions.fetchChatRooms());
      }
    });

    return () => unsubscribe();
  }, [message]);
  
  useEffect(() => {
    if (!message || message.length === 0) {
      setConversations([]);
      return;
    }

    const parsed = message.map(item => ({
      id: item.id,
      idUser: item.other_user_id,
      user: item.other_user_name,
      lastMessage: item.last_message?.content,
      time: item.last_message?.timestamp
        ? new Date(item.last_message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '',
    }));

    setConversations(parsed);
  }, [message]);

  const handleClick = (id, idUser) => navigate(`/message/${idUser}/${id}`);

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

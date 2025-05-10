import { useCallback, useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';
import { messageActions } from '../../../../store/slices/message';
import { useNavigate } from 'react-router-dom';

const MessageUser = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => !!state.auth.user,
    (prev, next) => prev === next
  );
  
  const messageList = useAppSelector((state) => state.message.messList);
  const statusMess = useAppSelector((state) => state.message.status);

  const [shouldHandleMessage, setShouldHandleMessage] = useState(false);

  useEffect(() => {
  if (shouldHandleMessage && statusMess === "succeeded") {
    if (messageList.length === 0) {
      navigate(`/message/${id}`);
    } else {
      const existingRoom = messageList.find(
        (room) => room.other_user_id === id
      );

      if (existingRoom) {
        navigate(`/message/${id}/${existingRoom.id}`);
      } else {
        navigate(`/message/${id}`);
      }
    }
    setShouldHandleMessage(false); 
  }
}, [shouldHandleMessage, statusMess, messageList]);


  const handleMessage = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginTooltip());
    }

    if (statusMess === "succeeded") {
      if (messageList.length === 0) {
        navigate(`/message/${id}`);
      } else {
        const existingRoom = messageList.find(
          (room) => room.other_user_id === id
        );

        if (existingRoom) {
          navigate(`/message/${id}/${existingRoom.id}`);
        } else {
          navigate(`/message/${id}`);
        }
      }
    } else {
      setShouldHandleMessage(true);
      dispatch(messageActions.fetchChatRooms());
    }
  }, [dispatch, statusMess, messageList, user]);


  return (
    <button className="transparent-button" onClick={handleMessage}>
      Nhắn tin
    </button>
  );
};

export const MessageUserButton = ({ id }) => {
  const userCurrent = useAppSelector((state) => state.auth.user);
  
  return userCurrent.user_info.id !== id ? (
    <MessageUser id={id} />
  ) : null;
};

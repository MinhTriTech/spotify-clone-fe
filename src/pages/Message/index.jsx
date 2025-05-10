import MessageList from './components/MessageList';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { messageActions } from '../../store/slices/message';

export const Message = ({ container }) => {
  const dispatch = useAppDispatch();
  const hasUser = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (hasUser) {
      dispatch(messageActions.fetchChatRooms());
    }
  }, [hasUser, dispatch]);

  return (
    <div className="message">
      <header className="message__header">
        <h2 className="message__title">Tin nhắn</h2>
      </header>
      <MessageList container={container} />
    </div>
  );
};

export default Message;

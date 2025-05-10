import { useCallback } from 'react';

import { artistActions } from '../../../../store/slices/artist';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';

import { userService } from '../../../../services/users';

const MessageUser = ({ id }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => !!state.auth.user,
    (prev, next) => prev === next
  );

  const handleMessage = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginTooltip());
    }
    userService.followArtists(id).then(() => {
      dispatch(artistActions.setFollowing({ following: true }));
      onToggle();
    });
  }, [dispatch, id, user]);

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

import { memo, useCallback, useMemo } from 'react';
import { Dropdown } from 'antd';
import { DeleteIcon, EditIcon } from '../Icons';

import { uiActions } from '../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { editPlaylistModalActions } from '../../store/slices/editPlaylistModal';
import { deletePlaylistModalActions } from '../../store/slices/deletePlaylistModal';

export const PlayListActionsWrapper = memo((props) => {
  const { children, playlist } = props;

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.user_info.id);
  
  const canEdit = useMemo(() => userId === playlist.created_by_id, [userId, playlist.created_by_id]);
  
  const handleUserValidation = useCallback(
    (button) => {
      if (!userId) {
        dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
        return false;
      }
      return true;
    },
    [dispatch, userId]
  );

  const items = useMemo(() => {
    const items = [];

    if (canEdit) {
      items.push(
        {
          label: 'Chỉnh sửa thông tin',
          key: 1,
          icon: <EditIcon />,
          onClick: () => {
            if (!handleUserValidation()) return;
            dispatch(editPlaylistModalActions.setPlaylist({ playlist }));
          },
        },
        {
          label: 'Xóa danh sách phát',
          key: '2',
          icon: <DeleteIcon />,
          onClick: () => {
            if (!handleUserValidation()) return;
            dispatch(deletePlaylistModalActions.setPlaylist({ playlist }));
          },
        },
        {
          type: 'divider',
        }
      );

    }
    return items;
  }, [canEdit, dispatch, handleUserValidation,, playlist, props]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});

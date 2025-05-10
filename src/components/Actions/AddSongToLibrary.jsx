import { Tooltip } from '../Tooltip';
import { userService } from '../../services/users';
import { AddedToLibrary, AddToLibrary } from '../Icons';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { uiActions } from '../../store/slices/ui';

const AddSongToLibrary = ({ id, onToggle, size }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleAddToLibrary = async () => {

    if (!user) {
      dispatch(uiActions.openLoginButton());
      return;
    }
  
    try {
      await userService.saveTracks(id); 
      onToggle(); 
    } catch (error) {
      console.error('Lỗi khi thêm bài hát:', error);
    }
  };
  

  return (
    <Tooltip title="Thêm vào Bài hát đã thích">
      <button className="actions" onClick={handleAddToLibrary}>
        <AddToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const DeleteSongFromLibrary = ({ id, onToggle, size }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleDeleteFromLibrary = async () => {
    if (!user) {
      dispatch(uiActions.openLoginButton());
      return;
    }

    try {
      await userService.deleteTracks(id); 
      onToggle(); 
    } catch (error) {
      console.error('Lỗi khi xóa bài hát:', error);
    }
  };

  return (
    <Tooltip title="Xóa khỏi Bài hát đã thích">
      <button onClick={handleDeleteFromLibrary}>
        <AddedToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

export const AddSongToLibraryButton = ({ id, isSaved, onToggle, size = 24 }) => {
  return isSaved ? (
    <DeleteSongFromLibrary size={size} id={id} onToggle={onToggle} />
  ) : (
    <AddSongToLibrary size={size} id={id} onToggle={onToggle} />
  );
};

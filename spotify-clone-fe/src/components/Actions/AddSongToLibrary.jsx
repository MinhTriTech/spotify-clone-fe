// AddSongToLibraryButton (mocked, cleaned)
import React from 'react';
import { Tooltip } from '../Tooltip';
import { AddedToLibrary, AddToLibrary } from '../Icons';

const AddSongToLibrary = ({ id, size, onToggle }) => {
  const handleAddToLibrary = () => {
    console.log(`Mock add song ${id} to library`);
    onToggle();
  };

  return (
    <Tooltip title={'Add to Liked Songs'}>
      <button className="actions" onClick={handleAddToLibrary}>
        <AddToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const DeleteSongFromLibrary = ({ id, size, onToggle }) => {
  const handleDeleteFromLibrary = () => {
    console.log(`Mock remove song ${id} from library`);
    onToggle();
  };

  return (
    <Tooltip title={'Remove from Liked Songs'}>
      <button onClick={handleDeleteFromLibrary}>
        <AddedToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const AddSongToLibraryButton = ({ id, isSaved, onToggle, size = 24 }) => {
  return isSaved ? (
    <DeleteSongFromLibrary size={size} id={id} onToggle={onToggle} />
  ) : (
    <AddSongToLibrary size={size} id={id} onToggle={onToggle} />
  );
};

export default AddSongToLibraryButton;

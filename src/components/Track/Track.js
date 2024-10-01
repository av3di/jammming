import React, {useCallback} from 'react';
import './Track.css';

function Track(props) {
  const {track, onAdd, onRemove, limitReached} = props;
  const handleAddClick = useCallback(
    () => {
      onAdd(track);
    }, [track, onAdd]
  );

  const handleRemoveClick = useCallback(
    () => {
      onRemove(track);
    }, [track, onRemove]
  );

  return (
    <div className="track-container">
      <div>
        <p className="song-name">{track.name}</p>
        <div className="song-info">
          <p className="artist">by: <span className="values">{track.artists[0].name}</span></p>
          <p className="album">for: <span className="values">{track.album.name}</span></p>
        </div>
      </div>
      {onAdd && !limitReached && <div className="edit-button" onClick={handleAddClick}>+</div>}
      {onRemove && <div className="edit-button" onClick={handleRemoveClick}>-</div>}
    </div>
  );
}

export default Track;

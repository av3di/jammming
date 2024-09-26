import React, {useCallback} from 'react';
import './Track.css';

function Track(props) {

  const handleAddClick = useCallback(
    () => {
      props.onAdd(props.track);
    }, [props.track, props.onAdd]
  );

  const handleRemoveClick = useCallback(
    () => {
      props.onRemove(props.track);
    }, [props.track, props.onRemove]
  );

  return (
    <div className="track-container">
      <div>
        <p className="song-name">{props.track.songName}</p>
        <div className="song-info">
          <p className="artist">by: <span className="values">{props.track.artist}</span></p>
          <p className="album">for: <span className="values">{props.track.album}</span></p>
        </div>
      </div>
      {props.onAdd && <div className="edit-button" onClick={handleAddClick}>+</div>}
      {props.onRemove && <div className="edit-button" onClick={handleRemoveClick}>-</div>}
    </div>
  );
}

export default Track;

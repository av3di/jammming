import React, {useCallback} from 'react';
import './Track.css';

function Track(props) {

  const handleClick = useCallback(
    ({target}) => {
      props.onAdd(props.songName, props.artist, props.album);
    }, [props.songName, props.artist, props.album, props.onAdd]
  );

  return (
    <div className="track-container">
      <div>
        <p className="song-name">{props.songName}</p>
        <div className="song-info">
          <p className="artist">by: <span className="values">{props.artist}</span></p>
          <p className="album">for: <span className="values">{props.album}</span></p>
        </div>
      </div>
      {props.onAdd && <div className="add-button" onClick={handleClick}>+</div>}
    </div>
  );
}

export default Track;

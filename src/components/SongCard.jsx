import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const title = song?.attributes?.name;
  const subtitle = song?.attributes?.artistName;
  const image = song?.attributes?.artwork?.url?.replace('{w}', '400').replace('{h}', '400');
  const previewUrl = song?.attributes?.previews?.[0]?.url;
  const songId = song?.id;
  const artistId = song?.relationships?.artists?.data?.[0]?.id;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    
    dispatch(setActiveSong(
      {
        song: {
          ...song,
          title,
          subtitle,
          images: { coverart: image },
          hub: { actions: [{}, { uri: previewUrl }] } // mock like original Shazam response
        },
        data,
        i,
      }
    ));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[200px] h-[300px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={{ ...song, title, subtitle, images: { coverart: image } }}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={image} className="w-full h-full rounded-lg object-cover" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${songId}`}>{title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={artistId ? `/artists/${artistId}` : '/top-artists'}>{subtitle}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;

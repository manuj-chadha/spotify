/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongsByCountryQuery, useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  const title = song?.attributes?.name;
  const subtitle = song?.attributes?.artistName;
  const image = song?.attributes?.artwork?.url
    ?.replace('{w}', '125')
    ?.replace('{h}', '125');
  const songId = song?.id;
  const artistId = song?.relationships?.artists?.data?.[0]?.id;

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === title ? 'bg-[#4c426e]' : 'bg-transparent'
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

      <div className="flex-1 flex flex-row justify-between items-center">
        <img className="w-12 h-12 rounded-lg" src={image} alt={title} />

        <div className="flex-1 flex flex-col justify-center mx-3 truncate max-w-1/2">
          <Link to={`/songs/${songId}`}>
            <p className="text-md font-bold text-white truncate">{title}</p>
          </Link>
          <Link to={artistId ? `/artists/${artistId}` : '/top-artists'}>
            <p className="text-sm text-gray-300 mt-1 truncate">{subtitle}</p>
          </Link>
        </div>
      </div>

      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={{
          ...song,
          title,
          subtitle,
          images: { coverart: image },
        }}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
  if (isPlaying) {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}, [isPlaying]);


  if (isFetching) return <p className="text-white">Loading Top Charts...</p>;
  if (error || !data) return <p className="text-white">Something went wrong. Please try again later.</p>;

  const topPlays = data.slice(1, 11);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      {/* Top Charts */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays.map((song, i) => (
            <TopChartCard
              key={song.key || `${song.title}-${i}`}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      {/* Top Artists
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays.map((artist, index) => (
            <SwiperSlide
              key={artist?.key || `artist-${index}`}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.artists?.[0]?.adamid}`}>
                <img
                  src={artist?.images?.background}
                  alt={artist?.subtitle || 'Artist'}
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </div>
  );
};

export default TopPlay;

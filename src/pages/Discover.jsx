import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const genres = [
  'POP',
  'HIP_HOP_RAP',
  'DANCE',
  'ELECTRONIC',
  'SOUL_RNB',
  'ALTERNATIVE',
  'ROCK',
  'LATIN',
  'FILM_TV',
  'COUNTRY',
  'AFRO_BEATS',
  'WORLDWIDE',
  'REGGAE_DANCE_HALL',
  'HOUSE',
  'K_POP',
  'FRENCH_POP',
  'SINGER_SONGWRITER',
  'REG_MEXICO',
];

const Discover = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useFetchSongsByGenreQuery(genreListId || 'POP');

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const songs = location.pathname.startsWith('/search') ? data.map((song) => song.track) : data;
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
=======
  const { genreListId, activeSong, isPlaying } = useSelector((state) => state.player);

  const [delayedGenre, setDelayedGenre] = useState(genreListId || 'POP');
  const [selectedGenre, setSelectedGenre] = useState(genreListId || 'POP');

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedGenre(selectedGenre);
    }, 700); // Delay by 700ms

    return () => clearTimeout(timer);
  }, [selectedGenre]);

  const { data, isFetching, error } = useGetSongsByGenreQuery(delayedGenre);
  const genreTitle = genres.find(({ value }) => value === delayedGenre)?.title || 'Pop';

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error || !data) return <Error />;
>>>>>>> 57e81b9 (initial upload)

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

        <select
          onChange={(e) => {
            const value = e.target.value;
            dispatch(selectGenreListId(value));
            setSelectedGenre(value);
          }}
          value={selectedGenre}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 mx-6"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

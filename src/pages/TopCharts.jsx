import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery, useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const { data, isFetching, error } = useGetSongsByCountryQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error || !data) return <Error />;

  // Normalizing data to expected structure
  const normalizedData = data.map((item) => ({
    key: item.id,
    title: item.attributes?.name,
    subtitle: item.attributes?.artistName,
    images: {
      coverart: item.attributes?.artwork?.url?.replace('{w}x{h}bb.jpg', '400x400bb.jpg'),
    },
    url: item.attributes?.url,
    preview: item.attributes?.previews?.[0]?.url,
    artists: item.relationships?.artists?.data?.map((a) => ({ adamid: a.id })),
  }));

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {normalizedData.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={normalizedData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;

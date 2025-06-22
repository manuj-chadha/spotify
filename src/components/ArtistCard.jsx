import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  const artistId =
    track?.artists?.[0]?.adamid || // Shazam-style
    track?.relationships?.artists?.data?.[0]?.id || // Apple Music-style
    null;

  const artistName =
    track?.subtitle || // Shazam-style
    track?.attributes?.artistName || // Apple Music-style
    'Unknown Artist';

  const image =
    track?.images?.coverart || // Shazam-style
    track?.attributes?.artwork?.url?.replace('{w}', '440').replace('{h}', '440') || // Apple Music artwork
    '';

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => artistId && navigate(`/artists/${artistId}`)}
    >
      <img alt="artist_img" src={image} className="w-full h-56 rounded-lg object-cover" />
      <p className="mt-4 font-semibold text-lg text-white truncate">{artistName}</p>
    </div>
  );
};

export default ArtistCard;

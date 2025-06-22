import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-between items-center bg-black w-full px-6 py-3 rounded-xl">
      <div className="flex flex-row justify-start items-center bg-[#111111] rounded-full w-1/2 max-h-10">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl font-semibold hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] font-semibold cursor-pointer">
            Install App
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
            B
          </p>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;

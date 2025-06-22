import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import { assets } from "../assets/assets";


const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#040307] rounded-r-xl">
        <img src={logo} alt="logo" className="w-full h-10 object-contain" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>

        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        <div className="bg-[#121212] h-[85%] rounded">
         <div className="p-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <img className="w-8" src={assets.stack_icon} alt="stack_icon" />
             <p className="font-semibold">Your Libary</p>
           </div>
           <div className="flex items-center gap-3">
             <img className="w-5" src={assets.plus_icon} alt="plus_icon" />
             <img className="w-5" src={assets.arrow_icon} alt="arrow_icon" />
           </div>
         </div>
         <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
             <h1>Create Your first playlist</h1>
             <p className="font-light">it's easy we will help you</p>
             <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
         </div>
         <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
             <h1>Let's find some podcasts to follow</h1>
             <p className="font-light">We'll keep you updated on new episodes</p>
             <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse podcasts</button>
         </div>
       </div>
      </div>
    </>
  );
};

export default Sidebar;



// import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
//       <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
//         <div onClick={()=>navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
//           <img className="w-6" src={assets.home_icon} alt="" />
//           <p className="font-b old">Home</p>
//         </div>
//         <div className="flex items-center gap-3 pl-8 cursor-pointer">
//           <img className="w-6" src={assets.search_icon} alt="" />
//           <p className="font-b old">Search</p>
//         </div>
//       </div>
//       <div className="bg-[#121212] h-[85%] rounded">
//         <div className="p-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img className="w-8" src={assets.stack_icon} alt="stack_icon" />
//             <p className="font-semibold">Your Libary</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <img className="w-5" src={assets.plus_icon} alt="plus_icon" />
//             <img className="w-5" src={assets.arrow_icon} alt="arrow_icon" />
//           </div>
//         </div>
//         <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
//             <h1>Create Your first playlist</h1>
//             <p className="font-light">it's easy we will help you</p>
//             <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
//         </div>
//         <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
//             <h1>Let's find some podcasts to follow</h1>
//             <p className="font-light">We'll keep you updated on new episodes</p>
//             <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse podcasts</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
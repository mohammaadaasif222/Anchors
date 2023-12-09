import React, { useState } from "react";
import Dialogue from './Dialogue'
import {resetVideoState} from '../redux/videoSlice'
import {useDispatch} from 'react-redux'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleCheck=()=>{
    dispatch(resetVideoState())
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[##101010] md:px-32 lg:px-32 sm:px-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-[196px] h-[35px] relative flex justify-between items-center">
              <img
                className="w-[22px] h-[22px]"
                src="https://res.cloudinary.com/mae-com-in/image/upload/v1701844768/imagelogo_oz9csm.png"
              />
              <div className="left-[36px] text-white text-[28px] font-semibold font-['Sora']">
                anchors
              </div>
              <div className="w-[34px] h-4 px-1.5 py-0.5 left-[162px] top-0 bg-stone-300 rounded justify-start items-start gap-2.5 inline-flex">
                <div className="text-neutral-800 text-[10px] font-normal font-['Inter']">
                  Beta
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={
                    isOpen
                      ? "M4 6h16v-2h-16v2zm0 7h16v-2h-16v2zm0 7h16v-2h-16v2z"
                      : "M4 6h16v-2h-16v2zm0 7h16v-2h-16v2zm0 7h16v-2h-16v2z"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="px-5 py-2.5 rounded-[40px] border border-white border-opacity-0 justify-start items-center gap-2 flex">
              <div className="w-5 h-5 relative" />
              <div className="text-white text-opacity-0 text-xl font-normal font-['Inter'] leading-normal">
                <Dialogue />
              </div>
              <button className="text-white text-xs" onClick={handleCheck}>
                Check Another video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-700`}>
        <div className="px-5 py-2.5 rounded-[40px] border border-white border-opacity-0 justify-start items-center gap-2 flex">
          <div className="w-5 h-5 relative" />
          <div className="text-white text-opacity-0 text-xl font-normal font-['Inter'] leading-normal">
            <Dialogue />
          </div>
          <button className="text-white text-xs" onClick={handleCheck}>
            Check Another video
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

'use client';

import { useState } from 'react';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative transition-all ${isFocused ? 'w-96 bg-transparent' : 'w-32'}`}
    >
     <input
  type="text"
  placeholder={isFocused ? "Type and press enter ↵" : "Search.."}
  className={`w-full py-2 pl-10 pr-4 text-black bg-transparent border rounded-xl outline-none transition-all ${
    isFocused ? 'border-black' : 'border-gray-300'
  }`}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>

      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 transition-all ${isFocused ? 'text-black font-extrabold' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;

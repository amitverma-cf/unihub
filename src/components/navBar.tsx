import React, { useState } from 'react';
import SearchInput from './ui/SearchInput';
import Logo from './ui/logo';
import LoginModal from './ui/LoginModal';


const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <header className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo*/}
        <Logo />

        {/* SearchBar Component */}
        <SearchInput />

        {/* Login Button */}
        <button
          onClick={toggleLoginModal}
          className="bg-primary hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          Login
        </button>
      </div>

      {/* Render the LoginModal component */}
      <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal}/>
      
    </header>
  );
};

export default Header;
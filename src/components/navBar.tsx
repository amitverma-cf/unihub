"use client";
import React,{ useState } from "react";
import SearchInput from "./ui/SearchInput";
import LoginModal from "./ui/LoginModal";
import CreateButton from "./ui/createButton";
import Logo from "./ui/logo";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <header className="bg-white shadow-lg py-4 sticky top-0 z-50 ">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Logo/>

        {/* div containing search bar, login, and create button */}
        <div className="flex flex-row justify-between gap-2 items-center">
          {/* Search Bar */}
          <SearchInput />

          {/* Login Button */}
          <button
            onClick={toggleLoginModal}
            className="bg-primary hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Login
          </button>

          {/* Create Post Button */}
          <CreateButton className="rounded-lg"/>
        </div>
      </div>

      {/* Render the LoginModal component */}
      <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
    </header>
  );
}

export default Header;

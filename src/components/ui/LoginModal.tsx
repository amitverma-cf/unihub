import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors duration-300"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
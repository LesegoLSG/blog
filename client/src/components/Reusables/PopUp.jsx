import React from "react";

const Popup = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 text-gray-800 dark:text-white rounded-lg shadow-lg p-6 max-w-sm m-1">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end items-center">
          <button
            onClick={onClose}
            className="button bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

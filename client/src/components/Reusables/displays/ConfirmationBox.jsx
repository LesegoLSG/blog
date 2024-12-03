import React from "react";

const ConfirmationBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/3">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirmation
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-between space-x-4">
          <button onClick={onCancel} className="button-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputField = ({
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  validate, // Validation function passed as prop
  errorMessage,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus
  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(e); // Call parent onChange handler

    if (validate) {
      setIsInvalid(!validate(val)); // Validate input
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false); // Input is no longer focused
  };

  useEffect(() => {
    // Hide error message when input is not focused
    if (!isFocused) {
      setIsInvalid(false);
    }
  }, [isFocused]);

  return (
    <div className="relative w-full">
      {/* Input field */}
      <input
        type={type}
        className={`w-full border-2 text-lg px-4 py-2 rounded outline-none transition-colors peer bg-inherit h-10 
        ${
          isInvalid
            ? "border-red-500"
            : "border-gray-300 hover:border-gray-600 focus:border-gray-600"
        }`}
        placeholder=" "
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={name}
        required
      />
      {/* Floating label */}
      <label
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-md ${
          theme === "light" ? "bg-white" : "bg-neutral-800"
        } px-1 
      peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
      peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-gray-500 peer-focus:-translate-y-0
      peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-primary peer-valid:-translate-y-0
      transition-all duration-300 pointer-events-none`}
      >
        {placeholder}
      </label>
      {/* Error message */}
      {isInvalid && isFocused && (
        <span className="text-red-500 text-sm absolute -bottom-4 left-0">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;

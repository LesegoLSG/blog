import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ Import from react-icons

const InputFieldEyeToggle = ({
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  validate,
  errorMessage,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle visibility
  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(e);

    if (validate) {
      setIsInvalid(!validate(val));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (!isFocused) {
      setIsInvalid(false);
    }
  }, [isFocused]);

  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* Input field */}
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`w-full border-2 text-base px-4 py-2 rounded outline-none transition-colors peer bg-inherit h-10 
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

        {/* 👁️ Toggle eye icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}

        {/* Floating label */}
        <label
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-md ${
            theme === "light" ? "bg-white" : "bg-neutral-900"
          } px-1 
          peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-[-12px] peer-focus:text-sm peer-focus:text-gray-600 peer-focus:-translate-y-0
          peer-valid:top-[-12px] peer-valid:text-sm peer-valid:text-gray-700 peer-valid:-translate-y-0
          transition-all duration-300 pointer-events-none`}
        >
          {placeholder}
        </label>
      </div>

      {/* Error message */}
      {isInvalid && isFocused && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputFieldEyeToggle;

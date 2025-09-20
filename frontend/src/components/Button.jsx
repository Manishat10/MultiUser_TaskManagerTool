import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  text,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children || text}
    </button>
  );
};
export default Button;
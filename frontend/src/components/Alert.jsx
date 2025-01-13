import React, { useEffect } from "react";

const Alert = ({ message, isVisible, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose, duration]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md z-50 transition-all duration-500 ${
        isVisible
          ? "opacity-100 scale-100 bg-green-600 text-white"
          : "opacity-0 scale-95"
      }`}
      style={{
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Alert;

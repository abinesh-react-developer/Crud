import React from "react";

const ErrorFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong.</h2>
        <p className="text-gray-700">Please refresh the page or try again later.</p>
      </div>
    </div>
  );
};

export default ErrorFallback;

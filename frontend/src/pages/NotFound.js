import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-gray-200">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-3 text-xl">Page Not Found</p>
      <p className="mt-3 text-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;

import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center my-auto items-center m-5 p-10 h-screen w-full">
      <h1 className="text-5xl font-bold">Unauthorized access</h1>
      <p className="text-2xl">Access to this page is prohibited</p>
      <button
        onClick={() => {
          window.location.href = '/admin';
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
        type="button"
        style={{ cursor: 'pointer' }}
      >
        Login
      </button>
    </div>
  );
};

export default Unauthorized;

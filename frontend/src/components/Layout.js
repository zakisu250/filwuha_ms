import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#menu')) {
        setIsOpen(false);
      }
    });
    setData(JSON.parse(localStorage.getItem('data')));
  }, [data, toggleDropdown]);

  return (
    <div id="menu">
      <button onClick={toggleDropdown}>
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
          alt="appointment-reminders--v1"
        />
        {data && (
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2 text-xs text-white text-center">
            {data.name}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-5 right-2 w-40 bg-white p-2 rounded-md">
          {data ? (
            <Link
              to="/receipt"
              className="text-left w-full text-sm bg-teal-200 rounded-xl px-2 visited:hover:bg-none visited:bg-none hover:bg-teal-300"
            >
              New receipt
            </Link>
          ) : (
            'No new order'
          )}
        </div>
      )}
    </div>
  );
};
export default Notification;

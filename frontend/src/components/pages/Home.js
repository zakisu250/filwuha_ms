import "../../assets/styles/App.css";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-[url('../../assets/images/main_bg.png')] bg-cover h-screen">
      <div className="flex flex-col justify-center bg-cover items-start p-20 gap-5 w-1/2 h-screen">
        <h1 className="text-5xl text-textIcon">
          Filwuha Natural
          <br /> Bathing Services
        </h1>
        <p className="text-2xl text-dividerColor mt-5">
          Ordering the best of our services in the city, <br />
          hassle free.
        </p>
        <Link
          to="/book"
          className="mt-5 px-10 py-2 bg-accentColor hover:bg-accentColor/80 hover:text-textIcon hover:scale-105 transition-all rounded-xl text-xl font-bold"
        >
          Book now
        </Link>
      </div>
    </div>
  );
}

export default Home;

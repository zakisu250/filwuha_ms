import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20">
        <h1 className="text-5xl font-bold text-center mt-10">Our Services</h1>
        <ul className="mt-10 flex flex-col px-20">
          <li className="flex bg-center w-full h-96 mt-10">
            <span className="w-1/2 flex-1 bg-[url('../../assets/images/shower.jpg')] bg-cover bg-center rounded-xl shadow-xl"></span>
            <div className="flex flex-col flex-1 justify-center items-center text-center p-5">
              <h1 className="text-5xl mb-5">Shower / Bathing</h1>
              <p className="text-3xl p-5">
                Inside Finfine (old location) and the new Filwuha, you can relax
                your mind by showering or bathing. This service is give to
                individuals or customers who come with their families.{' '}
              </p>
              <p className="text-2xl p-5"></p>
            </div>
          </li>

          <li className="flex bg-center w-full h-96 mt-20">
            <div className="flex flex-col flex-1 justify-center items-center text-center p-5">
              <h1 className="text-5xl">Hydro-massage</h1>
              <p className="text-3xl p-5">
                This service uses hydro-massage hot tab to relax the muscles and
                create good blood flow. Athletic injuries, Arteritis and
                Tendinitis can also be cured with this service as it is the
                recommended type of medication. Hydro-massage also lowers
                Anxiety and stress.
              </p>
              <p className="text-2xl p-5"></p>
            </div>
            <span className="w-1/2 flex-1 bg-[url('../../assets/images/bath.jpg')] bg-cover bg-center rounded-xl shadow-xl"></span>
          </li>

          <li className="flex bg-center w-full h-96 mt-20">
            <span className="w-1/2 flex-1 bg-[url('../../assets/images/sauna.png')] bg-cover bg-center rounded-xl shadow-xl"></span>
            <div className="flex flex-col flex-1 justify-center items-center text-center p-5">
              <h1 className="text-5xl">Sauna</h1>
              <p className="text-3xl p-5">
                Sauna-bath helps in relaxing our body more. Even more it helps
                to improve our cardiovascular activities. Athletics, gym fellows
                and exercise instructors recommend Sauna because it helps relax
                and release toxics out of the body after a good exercise.
              </p>
              <p className="text-2xl p-5"></p>
            </div>
          </li>

          <li className="flex bg-center w-full h-96 mt-20">
            <div className="flex flex-col flex-1 justify-center items-center text-center p-5">
              <h1 className="text-5xl">Steam-bath</h1>
              <p className="text-3xl p-5">
                Steam-bath is a type of bathing where a steam generator is used
                to produce water vapour. This service is used to cure
                respiratory diseases such as asthma, bronchitis, sinusitis and
                allergies. Steam-bath also helps to improve blood circulation
                and metabolism.
              </p>
              <p className="text-2xl p-5"></p>
            </div>
            <span className="w-1/2 flex-1 bg-[url('../../assets/images/steam-bath.jpg')] bg-cover bg-center rounded-xl shadow-xl"></span>
          </li>
          <li className="flex flex-1 flex-col justify-center items-center mt-20 bg-accentColor rounded-2xl mb-10 p-5 shadow-lg">
            <h1 className="text-5xl px-5 py-1">Checkout our packages</h1>
            <div className="flex justify-between w-1/2">
              <Link className="flex flex-col justify-center items-center p-5 bg-gray-200 rounded-xl border mx-5 mt-5 w-full hover:scale-105 hover:text-2xl hover:font-bold transition-all">
                <h1 className="text-3xl text-center">Sauna-bath package</h1>
              </Link>
              <Link className="flex flex-col justify-center items-center p-5 bg-gray-200 rounded-xl border mx-5 mt-5 w-full hover:scale-105 hover:text-2xl hover:font-bold transition-all">
                <h1 className="text-3xl text-center">Steam-bath package</h1>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Services;

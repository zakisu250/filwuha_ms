import React from 'react';

function Contact() {
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="flex mt-20 w-full h-full">
          <div className="flex justify-center items-center text-center p-5 w-full mx-10 mt-10">
            <div className="flex flex-1 w-full justify-center items-center mx-auto h-full">
              <span className="bg-[url('../../assets/images/entrance.png')] bg-no-repeat bg-center w-full h-full bg-contain"></span>
            </div>
            <div className="flex flex-col flex-1 w-full">
              <iframe
                title="Google maps to filwuha"
                className="w-full h-400 border-none shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6820580738336!2d38.752721800000005!3d9.019175699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859532793527%3A0x4312dd42c25a3146!2sFilwoha%20Hotel!5e0!3m2!1sen!2set!4v1629297816917!5m2!1sen!2set"
              ></iframe>
              <h1 className="text-center text-2xl mt-5">
                ለማንኛውም ጥያቄዎች እባክዎን በዚህ ኢሜል ይላኩ
              </h1>
              <h1 className="text-center text-2xl">
                For any inquiries please contact us with this email address
              </h1>
              <h1 className="text-center text-2xl mt-5 text-orange-700 font-bold">
                spaserviceenterprise@gmail.com
              </h1>
              <div className="items-center mt-10 p-5 w-full transition-all">
                <ul className="flex gap-2 justify-center items-center w-full">
                  <li className="hover:scale-110 rounded-full bg-gray-400 px-2">
                    <a href="https://www.facebook.com/filwuhaagelglot/">
                      <i class="fa-brands fa-facebook-f text-2xl p-2"></i>
                    </a>
                  </li>
                  <li className="hover:scale-110 rounded-full bg-gray-400 px-2">
                    <a href="https://www.youtube.com/channel/UCXOvZZzH6OF_OdxjqxAqhrA">
                      <i class="fa-brands fa-youtube text-2xl p-2"></i>
                    </a>
                  </li>
                  <li className="hover:scale-110 rounded-full bg-gray-400 px-2">
                    <a href="https://t.me/filwuhaagelglot">
                      <i class="fa-brands fa-telegram text-2xl p-2"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;

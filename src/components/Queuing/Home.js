import React from 'react';
import { Link } from 'react-router-dom';
import videoFile from '../../assests/videos/a.mp4';
import './Button.css';

function Home() {
  return (

    <div className="min-h-screen flex items-center justify-center relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoFile}
        autoPlay
        loop
        muted
        style={{ opacity: 0.6 }} // Adjust the opacity value as needed
      />
      <div className="text-center relative">
        <h1 className="text-5xl text-white-800 font-bold mb-8 animate-pulse">
          Queueing 
        </h1>


        <p className="text-black glowing-text text-xl mb-8 w-2/3 mx-auto">

          Welcome to the Queueing Model Simulator project! Our interactive tool empowers you with the ability to delve into the fascinating realm of queueing theory. With just a few clicks, you can explore the dynamics of various queueing systems, such as MM1, MG1, GG1, MM2, MG2, and GG2 models.        </p>

        <div className="space-x-4 space-y-16">
          <div className="flex flex-wrap space-x-8 justify-center">
            <Link to="Queuingmm1">
              <button className="glowing-btn">
                <span className="glowing-word">
                  MM<span className="faulty-letter">1</span> Model
                </span>
              </button>
            </Link>
            <Link to="Queuingmmc">
              <button className="glowing-btn">
                <span className="glowing-word">
                  MM<span className="faulty-letter">C</span> Model
                </span>
              </button>
            </Link>
            <Link to="Queuingmg1">
              <button className="glowing-btn">
                <span className="glowing-word">
                  MG<span className="faulty-letter">1</span> Model
                </span>
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap space-x-8  justify-center">
            <Link to="Queuingmgc">
              <button className="glowing-btn">
                <span className="glowing-word">
                  MG<span className="faulty-letter">C</span> Model
                </span>
              </button>
            </Link>
            <Link to="Queuinggg1">
              <button className="glowing-btn">
                <span className="glowing-word">
                  GG<span className="faulty-letter">1</span> Model
                </span>
              </button>
            </Link>
            <Link to="Queuingggc">
              <button className="glowing-btn">
                <span className="glowing-word">
                  GG<span className="faulty-letter">C</span> Model
                </span>
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>

  );
}

export default Home;

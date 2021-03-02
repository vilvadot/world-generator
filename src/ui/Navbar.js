import React from "react";
import { Logo } from "./Logo";
import { useCommands } from "./useUniverseData";

export const Navbar = ({ bus, year }) => {
  const { play, pause, isPlaying } = useCommands(bus);

  return (
    <nav className="flex justify-between items-center p-4 text-white">
      <Logo />
      <div className="flex justify-between items-center">
        <h1 className="mr-4" style={{ width: "200px" }}>
          Years from Big Bang: {year}
        </h1>
        {!isPlaying && (
          <button
            style={{ width: "120px" }}
            className="block uppercase shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
            onClick={play}
          >
            Play
          </button>
        )}
        {isPlaying && (
          <button
            style={{ width: "120px" }}
            className="block uppercase shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
            onClick={pause}
          >
            Pause
          </button>
        )}
      </div>
    </nav>
  );
};

import React from "react";
import { Planets } from "./Planets";
import { useUniverseData, useCommands } from "./useUniverseData";
import {Logo} from "./Logo"

const CommandButton = (props) => {
  return (
    <button
      style={{ width: "120px" }}
      className="block uppercase shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
      {...props}
    >
      {props.children}
    </button>
  );
};

export const UniverseVisualizer = ({ bus }) => {
  const { year, planets } = useUniverseData(bus);
  const { play, pause, isPlaying } = useCommands(bus);

  return (
    <>
      <nav className="flex justify-between items-center p-4 text-white">
        <Logo />
        <div className="flex justify-between items-center">
          <h1 className="mr-4" style={{ width: "200px" }}>
            Years from Big Bang: {year}
          </h1>
          {!isPlaying && <CommandButton onClick={play}>Play</CommandButton>}
          {isPlaying && <CommandButton onClick={pause}>Pause</CommandButton>}
        </div>
      </nav>
      <Planets planets={planets} />
    </>
  );
};

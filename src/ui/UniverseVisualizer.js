import React from "react";
import {Planets} from './Planets';
import {useUniverseData, useCommands} from './useUniverseData'

export const UniverseVisualizer = ({ bus }) => {
  const { year, planets } = useUniverseData(bus);
  const { play, pause, isPlaying } = useCommands(bus);

  return (
    <>
      <h1>Year: {year}</h1>
      <Planets planets={planets} />
      {!isPlaying && <button onClick={play}>▶️</button>}
      {isPlaying && <button onClick={pause}>⏸</button>}
    </>
  );
};

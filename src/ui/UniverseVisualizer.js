import React from "react";
import {Planets} from './Planets';
import {useUniverseData} from './useUniverseData'

export const UniverseVisualizer = ({ bus }) => {
  const { year, planets } = useUniverseData(bus);

  return (
    <>
      <h1>Year: {year}</h1>
      <Planets planets={planets} />
    </>
  );
};

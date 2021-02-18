import React, { useState } from "react";
import { Planet } from "./Planet";
import { useUniverseData, useCommands } from "./useUniverseData";
import { Logo } from "./Logo";

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
  const [activePlanet, setActivePlanet] = useState(undefined);

  const handlePlanetSelected = (planet) => {
    setActivePlanet(planet);
  };

  const current = () => {
    if (!activePlanet) return undefined;
    return planets.find((planet) => {
      return planet.name === activePlanet.name
    });
  };

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
      <div className="container mx-auto grid grid-cols-2 gap-4 h-5/6">
        <div className="bg-white shadow-xl rounded-lg overflow-y-auto">
          <ul className="divide-y divide-gray-300">
            {planets.map((planet) => {
              return (
                <Planet
                  key={planet.id}
                  onSelected={handlePlanetSelected}
                  {...planet}
                />
              );
            })}
          </ul>
        </div>
        <div className="bg-white bg-white shadow-xl rounded-lg p-6 overflow-y-auto">
          {activePlanet && <PlanetDetails {...current()} />}
        </div>
      </div>
    </>
  );
};

const PlanetDetails = (data) => {
  const { history, prosperityScore, name } = data;

  return (
    <>
      <h1 className="text-lg font-bold">{name} ({prosperityScore})</h1>
      <div className="p-4">
        <h2 className="pb-4 font-bold">Past events:</h2>
        {history.map((event) => {
          return (
            <li key={event.date}>
              {event.date} A.B.B – {event.icon} {event.description}
            </li>
          );
        })}
      </div>
    </>
  );
};

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

const FILTER_DESTROYED = "hideDestroyed";

export const UniverseVisualizer = ({ bus }) => {
  const { year, planets } = useUniverseData(bus);
  const { play, pause, isPlaying } = useCommands(bus);
  const [openPlanet, setOpenPlanet] = useState(undefined);
  const [filters, setFilters] = useState({
    FILTER_DESTROYED: false,
  });

  const toggleFilter = (name) => {
    setFilters({
      ...filters,
      [name]: !filters[name],
    });
  };

  const handlePlanetSelected = (planetId) => {
    setOpenPlanet(planetId);
  };

  const filterPlanets = (planets) => {
    let filtered = planets;
    if (filters[FILTER_DESTROYED])
      filtered = planets.filter((p) => !p.isDestroyed);
    return filtered;
  };

  const getCurrentPlanetData = () => {
    if (!openPlanet) return undefined;
    return planets.find((planet) => {
      return planet.id === openPlanet;
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
      <div className="container mx-auto">
        <nav className="py-6">
          <button
            className="block uppercase shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
            onClick={() => toggleFilter(FILTER_DESTROYED)}
          >
            {filters[FILTER_DESTROYED] ? "Show destroyed" : "Hide destroyed"}
          </button>
        </nav>
        <div className="grid grid-cols-2 gap-4 h-5/6">
          <div className="bg-white shadow-xl rounded-lg overflow-y-auto">
            <ul className="divide-y divide-gray-300">
              {filterPlanets(planets).map((planet) => {
                return (
                  <Planet
                    key={planet.id}
                    onSelected={handlePlanetSelected}
                    isOpen={planet.id === openPlanet}
                    {...planet}
                  />
                );
              })}
            </ul>
          </div>
          <div className="bg-white bg-white shadow-xl rounded-lg p-6 overflow-y-auto">
            {openPlanet && <PlanetDetails {...getCurrentPlanetData()} />}
          </div>
        </div>
      </div>
    </>
  );
};

const PlanetDetails = (data) => {
  const { history, prosperity, name } = data;

  return (
    <>
      <h1 className="text-lg font-bold">
        {name} ({prosperity.getTotal()})
      </h1>
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

import React, { useState, useEffect } from "react";
import { PlanetRow } from "./PlanetRow";
import { PlanetDetails } from "./PlanetDetails";

import { useUniverseData, useCommands } from "./useUniverseData";
import { Logo } from "./Logo";

const FILTER_DESTROYED = "hideDestroyed";
const FILTER_EARTHLIKE = "earthlike";

export const Dashboard = ({ bus }) => {
  const { year, planets } = useUniverseData(bus);
  const { play, pause, isPlaying } = useCommands(bus);
  const [openPlanet, setOpenPlanet] = useState();
  const [filters, setFilters] = useState({
    FILTER_DESTROYED: false,
  });

  useEffect(() => {
    if (!openPlanet && planets.length) {
      setOpenPlanet(planets[0].id);
    }
  });

  const handlePlanetSelected = (planetId) => {
    setOpenPlanet(planetId);
  };

  const toggleFilter = (name) => {
    setFilters({
      ...filters,
      [name]: !filters[name],
    });
  };

  const filterPlanets = (planets) => {
    let filtered = planets;
    if (filters[FILTER_DESTROYED])
      filtered = planets.filter((p) => !p.isDestroyed);
    return filtered;
  };

  const earthLike = (planets) => {
    return planets.filter((p) => p.type.isTerrestrial()).length;
  };

  const getCurrentPlanetData = () => {
    if (!openPlanet) return undefined;
    return planets.find((planet) => {
      return planet.id === openPlanet;
    });
  };

  const totalPlanets = planets.length
  const earths = earthLike(planets)
  const earthLikePercent = (earths / totalPlanets * 100).toFixed(1)

  return (
    <>
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
      <div className="container mx-auto text-white grid">
        <p>Total Planets: {totalPlanets}</p>
        <p>Earthlike: {earths} ({earthLikePercent})%</p>
      </div>
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
                  <PlanetRow
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

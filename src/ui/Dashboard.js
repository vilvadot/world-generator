import React, { useState, useEffect, Fragment } from "react";
import { Navbar } from "./Navbar";
import { GithubRibbon } from "./GithubRibbon";
import { SystemRow } from "./SystemRow";
import { PlanetRow } from "./PlanetRow";
import { PlanetDetails } from "./PlanetDetails";
import { Visualization } from "./Visualization";
import "./Dashboard.css";

import { useUniverseData } from "./useUniverseData";

export const Dashboard = ({ bus }) => {
  const { year, systems, getPlanetsList } = useUniverseData(bus);
  const [currentSystem, setCurrentSystem] = useState();
  const [currentPlanet, setCurrentPlanet] = useState();
  const [openAll, setOpenAll] = useState(false);

  const selectInitialSystem = useEffect(() => {
    if (currentSystem) return;
    setCurrentSystem(systems[0]);
  });

  const handlePlanetSelected = (planet) => {
    setCurrentPlanet(planet);
  };

  const handleSystemSelect = (system) => {
    setCurrentSystem(system);
    const firstPlanet = getPlanetsList(system)[0];
    setCurrentPlanet(firstPlanet);
  };

  const planets = getPlanetsList(currentSystem);
  
  return (
    <>
      <GithubRibbon />
      <Navbar bus={bus} year={year} />
      <div className="container mx-auto mt-20">
        <div className="grid grid-cols-4 gap-2" style={{ height: "65vh" }}>
          <div className="bg-white shadow-xl rounded-lg col-span-1">
            <h2 className="p-4 text-indigo-500">
              Systems
              <span
                className="float-right text-gray-500 hover:text-indigo-500 cursor-pointer"
                onClick={() => setOpenAll(!openAll)}
              >
                {!openAll ? "◇" : "❖"}
              </span>
            </h2>
            <hr />
            <ul
              className="divide-y divide-gray-300 overflow-y-auto"
              style={{ height: "500px" }}
            >
              {systems.map((system) => {
                const isOpen = currentSystem?.id === system.id || openAll;
                return (
                  <Fragment key={system.id}>
                    <SystemRow
                      onSelect={(current) => handleSystemSelect(current)}
                      system={system}
                      isOpen={isOpen}
                    />
                    {isOpen &&
                      getPlanetsList(system).map((planet) => (
                        <PlanetRow
                          key={planet.id}
                          onSelect={(current) => handlePlanetSelected(current)}
                          isOpen={currentPlanet?.id === planet.id}
                          planet={planet}
                        />
                      ))}
                  </Fragment>
                );
              })}
            </ul>
          </div>
          <div className="bg-transparent rounded-lg col-span-2 justify-center flex">
            <div>
              <h2 className="text-white">{currentSystem?.id}</h2>
              <Visualization planets={planets} currentPlanet={currentPlanet} onPlanetSelected={handlePlanetSelected} />
            </div>
          </div>
          <div className="bg-white bg-white shadow-xl rounded-lg p-6 overflow-y-auto col-span-1">
            {currentPlanet && <PlanetDetails {...currentPlanet} />}
          </div>
        </div>
      </div>
      <div className="container mx-auto text-white grid pt-4"></div>
    </>
  );
};

import { useState, useEffect } from "react";
import { events } from "../events";

export const useUniverseData = (bus) => {
  const [year, setYear] = useState(0);
  const [planets, setPlanets] = useState([]);

  const getYear = useEffect(() => {
    bus.subscribe(events.YEAR_CHANGE, ({ year }) => {
      setYear(year);
    });
  }, []);

  const getPlanets = useEffect(() => {
    bus.subscribe(events.PLANETS_UPDATE, ({ planets }) => {
      setPlanets(planets);
    });
  }, []);

  return {
    year,
    planets,
  };
};
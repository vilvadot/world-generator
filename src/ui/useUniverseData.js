import { useState, useEffect } from "react";
import { events } from "../engine/events";

export const useUniverseData = (bus) => {
  const [year, setYear] = useState(0);
  const [systems, setSystems] = useState([]);

  const getYear = useEffect(() => {
    bus.subscribe(events.YEAR_CHANGE, ({ year }) => {
      setYear(year);
    });
  }, []);

  const getSystems = useEffect(() => {
    bus.subscribe(events.SYSTEM_DISCOVERED, ({ systems }) => {
      setSystems(systems);
    });
  }, []);

  const getPlanetsList = (system) => {
    if(!system) return []
    return system.knownPlanets;
  }

  return {
    year,
    systems,
    getPlanetsList,
  };
};

export const useCommands = (bus) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const listenToPause = useEffect(() => {
    bus.subscribe(events.COMMAND_PAUSE, () => {
      setIsPlaying(false);
    });
  }, []);

  const listenToPlay = useEffect(() => {
    bus.subscribe(events.COMMAND_PLAY, () => {
      setIsPlaying(true);
    });
  }, []);

  const play = () => { bus.emit(events.COMMAND_PLAY)}
  const pause = () => { bus.emit(events.COMMAND_PAUSE)}

  return {
    play,
    pause,
    isPlaying,
  };
};

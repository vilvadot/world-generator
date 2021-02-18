import { useState, useEffect } from "react";
import { events } from "../engine/events";

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

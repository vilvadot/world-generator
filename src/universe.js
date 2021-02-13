import { config } from "./config";
import { events } from "./events";
import { withChance } from "./utils";

import { Planet } from "./planet";

export class Universe {
  constructor(bus) {
    this.year = 0;
    this.bus = bus;
    this.isPaused = false;
    new PlanetManager(bus);
    this.listenToGod();
  }

  bigBang() {
    setInterval(() => {
      if (!this.isPaused) this.advanceAYear();
    }, config.TICK_TIME);
  }

  advanceAYear() {
    this.year++;
    this.bus.emit(events.YEAR_CHANGE, { year: this.year });
  }

  listenToGod() {
    this.bus.subscribe(events.COMMAND_PAUSE, () => {
      this.pause();
    });

    this.bus.subscribe(events.COMMAND_PLAY, () => {
      this.play();
    });
  }

  play() {
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
  }
}

class PlanetManager {
  constructor(bus) {
    this.bus = bus;
    this.planets = [];
    this.bus.subscribe(events.YEAR_CHANGE, ({ year }) => {
      withChance(config.PLANET_CREATION_CHANCE, () => this.createPlanet(year));
    });
  }

  createPlanet(currentDate) {
    const planet = new Planet(this.bus, currentDate);
    this.planets.push(planet);
    this.bus.emit(events.PLANETS_UPDATE, {
      planets: this.planets,
      latest: planet,
    });
  }
}



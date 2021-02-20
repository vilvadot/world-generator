import { config } from "./config";
import { events } from "./events";
import { withChance } from "./utils";
import { Planet } from "./planet/index";

export class PlanetManager {
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

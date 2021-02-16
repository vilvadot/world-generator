import { config } from "../config";
import { events } from "../events";
import { withChance } from "../utils";
import { v4 as uuid } from "uuid";

import {History, PlanetDiscovery, CatastropheFactory} from './history'

export class Planet {
  constructor(bus, creationDate) {
    this.bus = bus;
    this.id = uuid();
    this.creationDate = creationDate;
    this.name = this.generateName();
    this.lifeTime = 1;
    this.isDestroyed = false;
    this.history = new History();
    this.history.add(new PlanetDiscovery(creationDate))
    this.syncClock();
    this.prosperityScore = 0;
  }

  generateName() {
    const code = `${this.id}`.slice(0, 4);
    return code;
  }

  incrementLife() {
    this.lifeTime++;
    this.prosperityScore++;
  }

  destroy(year) {
    this.isDestroyed = true;
    const catastrophe = CatastropheFactory.getCatastrophe(year)
    this.history.add(catastrophe);
    this.observePassOfTime.unsubscribe();
  }

  rollCatastrophe(year) {
    withChance(config.PLANET_CATASTROPHE_CHANCE, () => {
      this.destroy(year);
    });
  }

  syncClock() {
    this.observePassOfTime = this.bus.subscribe(
      events.YEAR_CHANGE,
      ({ year }) => {
        this.incrementLife();
        this.rollCatastrophe(year);
      }
    );
  }
}

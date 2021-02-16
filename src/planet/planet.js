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
    this.prosperityScore = this.lifeTime;
  }

  addOccurrence(occurrence){
    this.history.add(occurrence);
    this.recalculateProsperity();
  }

  recalculateProsperity(){
    this.prosperityScore = this.lifeTime + this.history.getTotalImpact()
    if(this.prosperityScore < 0 ) this.destroy()
  }

  generateName() {
    const code = `${this.id}`.slice(0, 4);
    return code;
  }

  incrementLife() {
    this.lifeTime++;
    this.prosperityScore++;
  }

  destroy() {
    this.isDestroyed = true;
    this.observePassOfTime.unsubscribe();
  }

  rollCatastrophe(year) {
    withChance(config.PLANET_CATASTROPHE_CHANCE, () => {
      const catastrophe = CatastropheFactory.getCatastrophe(year)
      this.addOccurrence(catastrophe);
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

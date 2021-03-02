import { v4 as uuid } from "uuid";

import { config } from "../config";
import { events } from "../events";
import { withChance, capitalize, randomNumberBetween } from "../utils";
import { History } from "./history";
import { PlanetDiscovery, CatastropheFactory } from "./occurrences";
import { NameGenerator } from "../generators/name";
import { Prosperity } from "./prosperity";
import { PlanetType } from "./type";

export class Planet {
  constructor(bus, creationDate) {
    this.bus = bus;
    this.id = uuid();
    this.creationDate = creationDate;
    this.age = 1;
    this.isDestroyed = false;

    this.name = this.generateName();
    this.size = this.generateSize()
    this.orbitalPeriod = this.generateOrbitalPeriod()
    
    this.history = new History(creationDate);
    this.prosperity = new Prosperity(this.age);
    this.type = new PlanetType();

    this.syncClock();
  }

  syncClock() {
    this.history.add(new PlanetDiscovery(this.creationDate));

    this.observePassOfTime = this.bus.subscribe(
      events.YEAR_CHANGE,
      ({ year }) => {
        this.incrementLife();
        this.rollCatastrophe(year);
      }
    );
  }

  rollCatastrophe(year) {
    withChance(config.PLANET_CATASTROPHE_CHANCE, () => {
      const catastrophe = CatastropheFactory.getCatastrophe(year);
      this.addOccurrence(catastrophe, year);
    });
  }

  addOccurrence(occurrence, year) {
    this.history.add(occurrence);
    this.prosperity.change(year, occurrence.impact);
    if (this.prosperity.isNegative()) this.destroy();
  }

  incrementLife() {
    this.age++;
    this.prosperity.addOne();
  }

  destroy() {
    this.isDestroyed = true;
    this.observePassOfTime.unsubscribe();
  }

  generateName() {
    return capitalize(NameGenerator.generate());
  }

  generateSize(){
    return Math.random() * 3;
  }

  generateOrbitalPeriod(){
    return randomNumberBetween(3, 60)
  }
}

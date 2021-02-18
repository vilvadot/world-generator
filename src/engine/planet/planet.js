import { config } from "../config";
import { events } from "../events";
import { withChance } from "../utils";
import { v4 as uuid } from "uuid";

import { History, PlanetDiscovery, CatastropheFactory } from "./history";

class Prosperity {
  constructor(startingValue) {
    this.value = startingValue;
    this.logs = [
      {
        date: 1,
        value: this.value,
      },
    ];
  }

  getValueInYear(year) {
    const startingProsperity = 1;
    const event = this.logs.find((log) => {
      return log.date === year;
    });
    return event ? event.value : startingProsperity;
  }

  addOne() {
    this.value++;
  }

  incresase(date, value) {
    this.value += value;
    this.logs.push({
      value: this.value,
      date,
    });
  }

  isNegative() {
    return this.value < 0;
  }

  getTotal() {
    return this.value;
  }
}

export class Planet {
  constructor(bus, creationDate) {
    this.bus = bus;
    this.id = uuid();
    this.creationDate = creationDate;
    this.name = this.generateName();
    this.age = 1;
    this.isDestroyed = false;
    this.history = new History();
    this.history.add(new PlanetDiscovery(creationDate));
    this.syncClock();
    this.prosperity = new Prosperity(this.age);
  }

  addOccurrence(occurrence, year) {
    this.history.add(occurrence);
    this.prosperity.incresase(year, occurrence.impact);
    if (this.prosperity.isNegative()) this.destroy();
  }

  generateName() {
    const code = `${this.id}`.slice(0, 4);
    return code;
  }

  incrementLife() {
    this.age++;
    this.prosperity.addOne();
  }

  destroy() {
    this.isDestroyed = true;
    this.observePassOfTime.unsubscribe();
  }

  rollCatastrophe(year) {
    withChance(config.PLANET_CATASTROPHE_CHANCE, () => {
      const catastrophe = CatastropheFactory.getCatastrophe(year);
      this.addOccurrence(catastrophe, year);
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

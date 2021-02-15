import { config } from "./config";
import { events } from "./events";
import { withChance } from "./utils";
import { v4 as uuid } from "uuid";

class History {
  constructor() {
    this.occurrences = [];
  }

  add(event) {
    this.occurrences.push(event);
  }

  map(callback) {
    return this.occurrences.map(callback);
  }
}

class Occurrence {
  constructor({ name, date, description, icon }) {
    this.name = name || "some_occurrence";
    this.date = date || "0";
    this.icon = icon || "⚠️";
    this.description = description || "";
  }
}

class PlanetDestruction extends Occurrence {
  constructor(date) {
    const name = "planet_destruction";
    const description = "destroyed by asteroid hit";
    const icon = "☄️";
    super({ name, date, description, icon });
  }
}

class PlanetDiscovery extends Occurrence {
  constructor(date) {
    const name = "planet_discovery";
    const description = "discovered by space explorer";
    const icon = "🎉";
    super({ name, date, description, icon });
  }
}

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
  }

  generateName() {
    const code = `${this.id}`.slice(0, 4);
    return code;
  }

  incrementLife() {
    this.lifeTime++;
  }

  destroy(year) {
    this.isDestroyed = true;
    this.history.add(new PlanetDestruction(year));
    this.observePassOfTime.unsubscribe();
  }

  rollDestruction(year) {
    withChance(config.PLANET_DESTRUCTION_CHANCE, () => {
      this.destroy(year);
    });
  }

  syncClock() {
    this.observePassOfTime = this.bus.subscribe(
      events.YEAR_CHANGE,
      ({ year }) => {
        this.incrementLife();
        this.rollDestruction(year);
      }
    );
  }
}

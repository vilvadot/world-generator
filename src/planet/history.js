import {getRandomOne} from '../utils'

export class History {
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
    this.impact = 0;
  }
}

export class PlanetDiscovery extends Occurrence {
  constructor(date) {
    const name = "planet_discovery";
    const description = "discovered by space explorer";
    const icon = "🎉";
    super({ name, date, description, icon });
  }
}

export class CatastropheFactory {
  static getCatastrophe(date){
    const possibilities = [new AsteroidHit(date), new SolarStorm(date)]
    return getRandomOne(possibilities)
  }
}

class AsteroidHit extends Occurrence{
  constructor(date) {
    const name = "asteroid_hit";
    const description = "destroyed by asteroid hit";
    const icon = "☄️";
    super({ name, date, description, icon });
  }
}

class SolarStorm extends Occurrence{
  constructor(date) {
    const name = "solar_storm";
    const description = "destroyed by a solar storm";
    const icon = "🌇";
    super({ name, date, description, icon });
  }
}
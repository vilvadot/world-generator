import { getRandomOne } from "../utils";

const impacts = {
  SMALL: 10,
  MEDIUM: 50,
  BIG: 100,
  GREAT: 200,
};

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

  last(){
    return this.occurrences[this.occurrences.length - 1]
  }

  getTotalImpact() {
    let value = 0;

    this.occurrences.forEach((occurrence) => {
      value += occurrence.impact;
      console.log({ occurrence });
    });
    return value;
  }
}

class Occurrence {
  constructor({ name, date, description, impact, icon }) {
    this.name = name || "some_occurrence";
    this.date = date || "0";
    this.icon = icon || "⚠️";
    this.description = description || "";
    this.impact = impact || 0;
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
  static getCatastrophe(date) {
    const possibilities = [
      new AsteroidHit(date),
      new SolarStorm(date),
      new SuperNova(date),
      new MoonCollision(date),
    ];
    return getRandomOne(possibilities);
  }
}

class AsteroidHit extends Occurrence {
  constructor(date) {
    const size = getRandomOne(["small", "medium", "big", "huge"]);
    const name = "asteroid_hit";
    const description = AsteroidHit.writeDescription(size);
    const icon = "☄️";
    const impact = AsteroidHit.calculateImpact(size);
    super({ name, date, description, icon, impact });
  }

  static writeDescription(size) {
    return `got hit by a ${size} asteroid`;
  }

  static calculateImpact(size) {
    const asteroidImpact = {
      small: impacts.SMALL,
      medium: impacts.MEDIUM,
      big: impacts.BIG,
      hude: impacts.GREAT,
    };
    return asteroidImpact[size];
  }
}

class SolarStorm extends Occurrence {
  constructor(date) {
    const name = "solar_storm";
    const description = "a fierce solar storm impacted its surface";
    const icon = "🌇";
    const impact = -impacts.MEDIUM;
    super({ name, date, description, icon, impact });
  }
}

class SuperNova extends Occurrence {
  constructor(date) {
    const name = "super_nova";
    const description = "explosion of a nearby supernova";
    const icon = "💥";
    const impact = -impacts.GREAT;
    super({ name, date, description, icon, impact });
  }
}

class MoonCollision extends Occurrence {
  constructor(date) {
    const name = "moon_collision";
    const description = "collided with one of its moons";
    const icon = "🌒";
    const impact = -impacts.GREAT;
    super({ name, date, description, icon, impact });
  }
}

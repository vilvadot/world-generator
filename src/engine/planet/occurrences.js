import { getRandomOne } from "../utils";

const IMPACT_SMALL = 10;
const IMPACT_MEDIUM = 50;
const IMPACT_BIG = 100;
const IMPACT_GREAT = 200;

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
      small: IMPACT_SMALL,
      medium: IMPACT_MEDIUM,
      big: IMPACT_BIG,
      hude: IMPACT_GREAT,
    };
    return asteroidImpact[size];
  }
}

class SolarStorm extends Occurrence {
  constructor(date) {
    const name = "solar_storm";
    const description = "a fierce solar storm impacted its surface";
    const icon = "🌇";
    const impact = -IMPACT_MEDIUM;
    super({ name, date, description, icon, impact });
  }
}

class SuperNova extends Occurrence {
  constructor(date) {
    const name = "super_nova";
    const description = "explosion of a nearby supernova";
    const icon = "💥";
    const impact = -IMPACT_GREAT;
    super({ name, date, description, icon, impact });
  }
}

class MoonCollision extends Occurrence {
  constructor(date) {
    const name = "moon_collision";
    const description = "collided with one of its moons";
    const icon = "🌒";
    const impact = -IMPACT_GREAT;
    super({ name, date, description, icon, impact });
  }
}
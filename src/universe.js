import {config, percentages} from './config'
import {events} from './events'

export class Universe {
  constructor(bus) {
    this.year = 0;
    this.bus = bus;
    new PlanetManager(bus)
  }

  bigBang() {
    setInterval(() => {
      this.advanceAYear();
    }, config.TICK_TIME);
  }

  advanceAYear() {
    this.year++;
    this.bus.emit(events.YEAR_CHANGE, { year: this.year });
  }
}

const rollSuccess = (chance = 0) => {
  const roll = Math.random()
  const succes = roll > (1 - chance)
  return succes
}

const withChance = (chance, callback) => {
  if(rollSuccess(chance)){
    callback()
  }
  return
}

class PlanetManager {
  constructor(bus) {
    this.bus = bus;
    this.planets = [];
    this.bus.subscribe(events.YEAR_CHANGE, ({year}) => {
      withChance(config.PLANET_CREATION_CHANCE, () => this.createPlanet(year));
    });
  }

  createPlanet(currentDate) {
    const planet = new Planet(currentDate);
    this.planets.push(planet);
    this.bus.emit(events.PLANETS_UPDATE, { planets: this.planets, latest: planet });
  }
}

class Planet{
  constructor(creationDate){
    this.creationDate = creationDate;
    this.name = this.generateName()
  }

  generateName(){
    const code = Math.random().toFixed(4) * 10000
    return `Planet: ${code}`;
  }
}
import { v4 as uuid } from "uuid";

import { config } from "../config";
import { events } from "../events";
import { withChance, capitalize, randomIntegerBetween, randomFloatBetween, getRandomWithProbability } from "../utils";
import { History } from "./history";
import { PlanetDiscovery, CatastropheFactory } from "./occurrences";
import { NameGenerator } from "../generators/name";
import { Prosperity } from "./prosperity";
import { PlanetType } from "./type";

export class Moon {
  constructor(bus, discoveryDate, parentSize){
    this.bus = bus;
    this.discoveryDate = discoveryDate;
    this.orbitalPeriod = this.generateOrbitalPeriod()
    this.size = this.generateSize()
    this.distance = this.generateDistance(parentSize)
  }

  generateSize(){
    return randomFloatBetween(config.MIN_PLANET_SIZE / 5, config.MAX_PLANET_SIZE / 5);
  }

  generateOrbitalPeriod(){
    return randomIntegerBetween(3, 20);
  }

  generateDistance(parentSize){
    return parentSize * randomFloatBetween(1.5, 2.5) * this.size;
  }
}

export class Planet {
  constructor(bus, discoveryDate) {
    this.bus = bus;
    this.id = uuid();
    this.discoveryDate = discoveryDate;
    this.age = 1;
    this.isDestroyed = false;

    this.name = this.generateName();
    this.size = this.generateSize()
    this.orbitalPeriod = this.generateOrbitalPeriod()
    
    this.history = new History(discoveryDate);
    this.prosperity = new Prosperity(this.age);
    this.type = new PlanetType();
    this.moons = []

    this.discoverMoons()
    this.syncClock();
  }

  syncClock() {
    this.history.add(new PlanetDiscovery(this.discoveryDate));

    this.observePassOfTime = this.bus.subscribe(
      events.YEAR_CHANGE,
      ({ year }) => {
        this.incrementLife();
        this.rollCatastrophe(year);
      }
    );
  }

  discoverMoons(){
    const options = {
      0: .9,
      1: .05, 
      2: .02,
      3: .02,
      4: .02,
      5: .02,
    }
    const number = parseInt(getRandomWithProbability(options))

    for(let i = 0; i < number; i++){
      const moon = new Moon(this.bus, this.discoveryDate, this.size)
      this.moons.push(moon)
    }
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
    return randomFloatBetween(config.MIN_PLANET_SIZE, config.MAX_PLANET_SIZE);
  }

  generateOrbitalPeriod(){
    return randomIntegerBetween(3, 60)
  }

  get knownMoons(){
    return this.moons
  }
}

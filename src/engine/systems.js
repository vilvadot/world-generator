import { config } from "./config";
import { events } from "./events";
import { withChance, randomNumberBetween } from "./utils";
import { Planet } from "./planet/index";

import { v4 as uuid } from "uuid";

class System {
  constructor(bus, date){
    this.bus = bus;
    this.discoveryDate = date;
    this.planets = []
    
    this.id = uuid();
    this.name = this.generateName()

    this.discoverPlanets()
  }

  discoverPlanets(){
    const size = randomNumberBetween(0, 6)
    for(let i = 0; i <= size; i++){
      const planet = new Planet(this.bus, this.discoveryDate)
      this.planets.push(planet)
    }
  }

  generateName(){
    return this.id.split('-')[0];
  }

  get size(){
    return this.planets.length || 0;
  }

  get knownPlanets(){
    return this.planets;
  }
}

export class SystemsManager {
  constructor(bus) {
    this.bus = bus;
    this.systems = [];
    this.bus.subscribe(events.YEAR_CHANGE, ({ year }) => {
      withChance(config.SYSTEM_DISCOVERY_CHANCE, () => {
          this.discoverSystem(year)
      });
    });
  }

  discoverSystem(currentDate) {
    const system = new System(this.bus, currentDate);
    this.systems.push(system);
    this.bus.emit(events.SYSTEM_DISCOVERED, {
      systems: this.systems,
    });
  }
}

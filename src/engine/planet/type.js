import { getRandomWithProbability } from "../utils";
import {probability} from '../config'

const TYPES = {
  Gas: 'Gas',
  Terrestrial: 'Terrestrial',
  Ocean: 'Ocean',
  Rocky: 'Rocky',
  Ice: 'Ice',
}

export class PlanetType {
  constructor() {
    this.name = this.generateType();
  }

  generateType() {
    const options = {
      [TYPES.Gas]: probability.HIGH,
      [TYPES.Rocky]: probability.HIGH,
      [TYPES.Ice]: probability.LOW,
      [TYPES.Ocean]: probability.HIGH,
      [TYPES.Terrestrial]: probability.LOW,
    };
    return getRandomWithProbability(options);
  }

  isGaseous(){
    return this.name === TYPES.Gas
  }

  isRocky(){
    return this.name === TYPES.Rocky
  }

  isTerrestrial(){
    return this.name === TYPES.Terrestrial
  }

  isOcean(){
    return this.name === TYPES.Ocean
  }

  isIce(){
    return this.name === TYPES.Ice
  }
}


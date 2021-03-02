import { config } from "./config";
import { randomFloatBetween } from "./utils";

export class Star {
  constructor(bus, discoveryDate) {
    this.bus = bus;
    this.discoveryDate = discoveryDate;
    this.size = this.generateSize();
  }

  generateSize() {
    return randomFloatBetween(config.MIN_STAR_SIZE, config.MAX_STAR_SIZE);
  }
}

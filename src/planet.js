import { config } from "./config";
import { events } from "./events";
import { withChance } from "./utils";
import { v4 as uuid } from 'uuid';

export class Planet {
  constructor(bus, creationDate) {
    this.bus = bus;
    this.id = uuid();
    this.creationDate = creationDate;
    this.name = this.generateName();
    this.lifeTime = 1;
    this.isDestroyed = false;
    this.startHistory();
  }

  generateName() {
    const code = `${this.id}`.slice(0, 4);
    return code;
  }

  incrementLife() {
    this.lifeTime++;
  }

  destroy() {
    this.isDestroyed = true;
    this.observePassOfTime.unsubscribe();
  }

  rollDestruction() {
    withChance(config.PLANET_DESTRUCTION_CHANCE, () => {
      this.destroy();
    });
  }

  startHistory() {
    this.observePassOfTime = this.bus.subscribe(events.YEAR_CHANGE, ({ year }) => {
      this.incrementLife();
      this.rollDestruction();
    });
  }
}

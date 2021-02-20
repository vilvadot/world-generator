import { config } from "./config";
import { events } from "./events";
import { PlanetManager } from "./planet-manager";

export class Universe {
  constructor(bus) {
    this.year = 0;
    this.bus = bus;
    this.isPaused = false;
    new PlanetManager(bus);
    this.listenToGod();
  }

  bigBang() {
    setInterval(() => {
      if (!this.isPaused) this.advanceAYear();
    }, config.TICK_TIME);
  }

  advanceAYear() {
    this.year++;
    this.bus.emit(events.YEAR_CHANGE, { year: this.year });
  }

  listenToGod() {
    this.bus.subscribe(events.COMMAND_PAUSE, () => {
      this.pause();
    });

    this.bus.subscribe(events.COMMAND_PLAY, () => {
      this.play();
    });
  }

  play() {
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
  }
}

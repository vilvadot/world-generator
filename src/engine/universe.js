import { config } from "./config";
import { events } from "./events";
import { SystemsManager } from "./systems";

export class Universe {
  constructor(bus) {
    this.currentYear = 0;
    this.bus = bus;
    this.isPaused = false;
    new SystemsManager(bus);
    this.listenToGod();
  }

  bigBang() {
    setInterval(() => {
      if (!this.isPaused) this.advanceAYear();
    }, config.TICK_TIME);
  }

  advanceAYear() {
    this.currentYear++;
    this.bus.emit(events.YEAR_CHANGE, { year: this.currentYear });
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

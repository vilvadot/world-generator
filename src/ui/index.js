import React from 'react';
import ReactDOM from 'react-dom';

import {events} from '../engine/events'
import {Dashboard} from './Dashboard'

export class UI {
  constructor(bus) {
    this.bus = bus;
  }

  draw() {
    ReactDOM.render(<Dashboard bus={this.bus} />, document.getElementById('universe'));
  }

  drawCurrentYear() {
    this.bus.subscribe(events.YEAR_CHANGE, ({ year }) => {
      console.log({ year });
    });
  }

  drawPlanets(){
    this.bus.subscribe(events.PLANETS_UPDATE, ({ planets, latest }) => {
      console.log({ planets });
    });
  }
}

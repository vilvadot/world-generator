export class Prosperity {
  constructor(startingValue) {
    this.value = startingValue;
    this.logs = [
      {
        date: 1,
        value: this.value,
      },
    ];
  }

  getValueInYear(year) {
    const startingProsperity = 1;
    const event = this.logs.find((log) => {
      return log.date === year;
    });
    return event ? event.value : startingProsperity;
  }

  addOne() {
    this.value++;
  }

  incresase(date, value) {
    this.value += value;
    this.logs.push({
      value: this.value,
      date,
    });
  }

  isNegative() {
    return this.value < 0;
  }

  getTotal() {
    return this.value;
  }
}

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

  addOne() {
    this.value++;
  }

  change(date, value) {
    this.value += value;
    this.logs.push({
      value: this.value,
      date,
    });
  }

  getTotal() {
    return this.value;
  }

  getValueInYear(year) {
    const startingProsperity = 1;
    const event = this.logs.find((log) => {
      return log.date === year;
    });
    return event ? event.value : startingProsperity;
  }

  isNegative() {
    return this.value < 0;
  }
}

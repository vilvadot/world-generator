export class History {
  constructor() {
    this.occurrences = [];
  }

  add(event) {
    this.occurrences.push(event);
  }

  map(callback) {
    return this.occurrences.map(callback);
  }

  reverseMap(callback) {
    return this.occurrences.map(callback);
  }

  last(){
    return this.occurrences[this.occurrences.length - 1]
  }

  get length(){
    return this.occurrences.length;
  }

  getTotalImpact() {
    let value = 0;

    this.occurrences.forEach((occurrence) => {
      value += occurrence.impact;
    });
    return value;
  }
}

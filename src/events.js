import postal from "postal";

export class Bus {
  emit(message, data, channel) {
    return postal.publish({
      channel,
      topic: message,
      data,
    });
  }

  subscribe(message, callback, channel) {
    return postal.subscribe({
      channel,
      topic: message,
      callback,
    });
  }
}

export const events = {
  YEAR_CHANGE: "year_change",
  PLANETS_UPDATE: "planets_Update"
};
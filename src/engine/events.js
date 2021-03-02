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
  SYSTEM_DISCOVERED: "planets_Update",
  COMMAND_PLAY: "universe_play",
  COMMAND_PAUSE: "universe_pause"
};
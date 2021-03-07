export const percentages = {
  1: .01,
  2: .02,
  5: .05,
  3: .03,
  10: .1,
  20: .2,
  50: .5,
  90: .9,
  100: 1,
};

export const probability = {
  IMPOSSIBLE: 0,
  ALMOST_IMPOSSIBLE: percentages[1],
  LOW: percentages[20],
  MID: percentages[50],
  HIGH: percentages[90],
};

export const config = {
  TICK_TIME: 1000,
  SYSTEM_DISCOVERY_CHANCE: percentages['100'],
  PLANET_CATASTROPHE_CHANCE: percentages['2'],
  MIN_PLANET_SIZE: 1,
  MAX_PLANET_SIZE: 7,
  MIN_STAR_SIZE: 5,
  MAX_STAR_SIZE: 10,
}

const rollSuccess = (chance = 0) => {
  const roll = Math.random()
  const succes = roll > (1 - chance)
  return succes
}

export const getRandomOne = (options) => {
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}

export const withChance = (chance, callback) => {
  if(rollSuccess(chance)){
    callback()
  }
  return
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const randomNumberBetween = (minimum, maximum) => {
  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

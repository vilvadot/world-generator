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
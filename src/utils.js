const rollSuccess = (chance = 0) => {
  const roll = Math.random()
  const succes = roll > (1 - chance)
  return succes
}

export const withChance = (chance, callback) => {
  if(rollSuccess(chance)){
    callback()
  }
  return
}
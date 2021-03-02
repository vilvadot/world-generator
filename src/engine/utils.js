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

export const randomIntegerBetween = (minimum, maximum) => {
  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

export const randomFloatBetween = (minimum, maximum) => {
  return Math.random() * (maximum - minimum + 1) + minimum;
}

export const getRandomOne = (options) => {
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}

export const getRandomWithProbability = (weightedOptions) => {
  const weights = Object.values(weightedOptions);
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let choice = Math.random() * totalWeight;

  let foundIndex;
  
  weights.some((weight, index) => {
    choice -= weight;
    if (choice < 0) {
      foundIndex = index;
      return true;
    }
  });
  return Object.keys(weightedOptions)[foundIndex]
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
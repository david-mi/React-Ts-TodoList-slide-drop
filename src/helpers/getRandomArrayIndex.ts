const getRandomArrayIndex = (arr: Array<any>): number => {
  return Math.floor(Math.random() * arr.length)
}

export default getRandomArrayIndex
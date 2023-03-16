export const secToMin = (timeInSec) => {
  return new Date(timeInSec * 1000).toISOString().substring(14, 19)
}

export const attrsBinder = (n, ...state) => {
  n = Number(n)
  switch (n) {
    case n:
      return state[n]
  }
}
export const shuffleArray = (array) => {
  const firstItem = array[0]
  const restOfQueue = array.filter((e, i) => i !== 0)
  for (let i = restOfQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = restOfQueue[i]
    restOfQueue[i] = restOfQueue[j]
    restOfQueue[j] = temp
  }
  return [firstItem, ...restOfQueue]
}

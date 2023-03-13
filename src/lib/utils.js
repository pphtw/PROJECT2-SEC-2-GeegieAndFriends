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

export const secToMin = (timeInSec= 0) => {

  return new Date(isNaN(timeInSec)?0:timeInSec * 1000).toISOString().substring(14, 19)
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
export const hashPassword = async (password) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

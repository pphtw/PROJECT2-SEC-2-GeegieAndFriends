export const secToMin = (timeInSec) => {
    return new Date(timeInSec * 1000).toISOString().substring(14, 19)
}
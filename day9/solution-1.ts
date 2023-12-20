import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day9/data.txt'))
const test = await parseData(Bun.file('day9/test1.txt'))

type History = number[][]

const getHistories = (data: string[]) => {
  return data.map((row) => {
    return [Array.from(row.match(/-?\d+/g)!).map(Number)]
  })
}

const lastSequence = (history: History) => {
  return history[history.length - 1]
}

const sumOfSequence = (sequence: number[]) => {
  return sequence.reduce((acc, curr) => acc + curr)
}

const getDiff = (first: number, second: number) => {
  return second - first
}

const solution = (data: string[]) => {
  const histories = getHistories(data)
  for (const history of histories) {
    do {
      const last = lastSequence(history)
      const next: number[] = []
      console.log(last)
      for (let i = 1; i < last.length; i++) {
        next.push(getDiff(last[i - 1], last[i]))
      }
      history.push(next)
    } while (sumOfSequence(lastSequence(history)) !== 0)

    for (let i = history.length - 2; i >= 0; i--) {
      const current = history[i]
      const belowValue = history[i + 1][history[i + 1].length - 1]
      const leftValue = current[current.length - 1]
      current.push(belowValue + leftValue)
    }
  }

  return histories.reduce((acc, curr) => {
    return acc + curr[0].pop()!
  }, 0)
}

// const result = solution(test)
// console.log(result)

const result = solution(data)
console.log('result', result)

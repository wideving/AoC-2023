import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day6/data2.txt'))
const test = await parseData(Bun.file('day6/test2.txt'))

type Race = {
  time: number
  distance: number
}

const parseRaces = (data: string[]) => {
  const [rawTimes, rawDistance] = data
  const times = rawTimes.split(':')[1].match(/\d+/gm)!.map(Number)
  const distance = rawDistance.split(':')[1].match(/\d+/gm)!.map(Number)

  return times?.reduce((acc, curr, index) => {
    acc.push({
      time: curr,
      distance: distance[index],
    })
    return acc
  }, new Array<Race>())
}

const solution = (data: string[]) => {
  const races = parseRaces(data)

  const waysToBeatRecord = races.reduce((allRaces, { time, distance }) => {
    let ways: number = 0
    for (let i = 0; i <= time; i++) {
      const score = i * (time - i)
      if (score > distance) {
        ways++
      }
    }
    allRaces.push(ways)
    return allRaces
  }, new Array<number>())

  return waysToBeatRecord.reduce((acc, curr) => acc * curr)
}

const result = solution(data)
console.log(result)

// const result = solution(data)
// console.log('result', result)

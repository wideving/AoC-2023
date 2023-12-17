import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day8/data.txt'))
const test = await parseData(Bun.file('day8/test1.txt'))

type Direction = 'left' | 'right'

type Node = {
  left: string
  right: string
}

type Network = Map<string, Node>

const getDirections = (data: string[]) => {
  return data[0].split('').map<Direction>((c) => (c === 'L' ? 'left' : 'right'))
}

const getNetwork = (data: string[]) => {
  return data.slice(2).reduce<Network>((acc, curr) => {
    const [currentLocation, left, right] = Array.from(curr.matchAll(/\w+/g))
    return acc.set(currentLocation[0], { left: left[0], right: right[0] })
  }, new Map())
}

const solution = (data: string[]) => {
  const directions = getDirections(data)
  const network = getNetwork(data)

  let steps = 0
  let index = 0

  const directionLength = directions.length

  let currentLocation = 'AAA'

  while (currentLocation !== 'ZZZ') {
    steps++

    const node = network.get(currentLocation)!
    const direction = directions[index]

    currentLocation = node[direction]
    index = (index + 1) % directionLength
  }

  return steps
}

// const result = solution(test)
// console.log(result)

const result = solution(data)
console.log('result', result)

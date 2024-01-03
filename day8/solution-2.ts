import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day8/data.txt'))
const test = await parseData(Bun.file('day8/test2.txt'))

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

const gcd = function (a: number, b: number): number {
  return a ? gcd(b % a, a) : b
}

const lcm = function (a: number, b: number) {
  return (a * b) / gcd(a, b)
}

const solution = (data: string[]) => {
  const directions = getDirections(data)
  const network = getNetwork(data)

  let steps = 0
  let index = 0

  const directionLength = directions.length

  const cycles: Map<number, number> = new Map()

  const currentLocations = Array.from(network.keys()).filter((key) => key.endsWith('A'))

  outer: while (!currentLocations.every((c) => c.endsWith('Z'))) {
    for (let i = 0; i < currentLocations.length; i++) {
      const currentLocation = currentLocations[i]
      if (currentLocation.endsWith('Z')) {
        if (!cycles.has(i)) {
          cycles.set(i, steps)
        }

        if (cycles.size === 6) {
          break outer
        }
      }
      const node = network.get(currentLocation)!
      const direction = directions[index]

      currentLocations[i] = node[direction]
    }

    steps++
    index = (index + 1) % directionLength
  }
  // return the lowest common multiple of all cycles
  const values = Array.from(cycles.values())
  return values.reduce(lcm)
}

const result = solution(data)

console.log(result)

import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day5/data.txt'))
const test = await parseData(Bun.file('day5/test1.txt'))

type Almanac = {
  source: number
  destination: number
  range: number
}

const toMaps = (data: string[]) => {
  const seeds = data
    .splice(0, 1)[0]
    .split(': ')[1]
    .split(' ')
    .map((n) => parseInt(n))

  const filtered = data.filter((r) => r !== '')
  const rootMap: Map<string, Almanac[]> = new Map()
  let name: string = ''

  for (const row of filtered) {
    if (row.includes(':')) {
      name = row.split(' ')[0]
      rootMap.set(name, [])
      continue
    }

    const almanacs = rootMap.get(name)!

    const [destinationStr, sourceStr, rangeStr] = row.split(' ')

    const destination = parseInt(destinationStr)
    const source = parseInt(sourceStr)
    const range = parseInt(rangeStr)

    almanacs.push({
      source,
      destination,
      range,
    })
  }

  return {
    seeds,
    almanacs: rootMap,
  }
}

const solution = (data: string[]) => {
  const { seeds, almanacs } = toMaps(data)
  const almanacValues = Array.from(almanacs.values())

  const locationSeeds: number[] = []

  for (const seed of seeds) {
    let destinationPosition: number = seed
    for (const almanac of almanacValues) {
      for (const { source, destination, range } of almanac) {
        const sourceEnd = source + range
        if (destinationPosition >= source && destinationPosition <= sourceEnd) {
          const sourceDiff = destinationPosition - source
          destinationPosition = destination + sourceDiff
          break
        }
      }
    }
    locationSeeds.push(destinationPosition)
  }

  return locationSeeds.sort((a, b) => b - a).pop()
}

// const result = solution(test)
// console.log(result)

const result = solution(data)
console.log('result', result)

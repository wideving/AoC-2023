import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day5/data.txt'))
const test = await parseData(Bun.file('day5/test1.txt'))

type Source = number
type Destination = number

const toMaps = (data: string[]) => {
  const seeds = data
    .splice(0, 1)[0]
    .split(': ')[1]
    .split(' ')
    .map((n) => parseInt(n))

  const filtered = data.filter((r) => r !== '')
  const rootMap: Map<string, Map<Source, Destination>> = new Map()

  let name: string = ''

  for (const row of filtered) {
    if (row.includes(':')) {
      name = row.split(' ')[0]
      rootMap.set(name, new Map())
      continue
    }

    const map = rootMap.get(name)!

    const [destinationStr, sourceStr, rangeStr] = row.split(' ')

    const destination = parseInt(destinationStr)
    const source = parseInt(sourceStr)
    const range = parseInt(rangeStr)

    for (let i = 0; i < range; i++) {
      map.set(source + i, destination + i)
    }
  }

  return {
    seeds,
    maps: rootMap,
  }
}

const solution = (data: string[]) => {
  const { seeds, maps } = toMaps(data)

  const seedToSoil = maps.get('seed-to-soil')!
  const soilToFertilizer = maps.get('soil-to-fertilizer')!
  const fertilizerToWater = maps.get('fertilizer-to-water')!
  const waterToLight = maps.get('water-to-light')!
  const lightToTemperature = maps.get('light-to-temperature')!
  const temperatureToHumidity = maps.get('temperature-to-humidity')!
  const humidityToLocation = maps.get('humidity-to-location')!

  return seeds
    .reduce((acc, curr) => {
      const soil = seedToSoil.get(curr) ?? curr
      const fertilizer = soilToFertilizer.get(soil) ?? soil
      const water = fertilizerToWater.get(fertilizer) ?? fertilizer
      const light = waterToLight.get(water) ?? water
      const temperature = lightToTemperature.get(light) ?? light
      const humidity = temperatureToHumidity.get(temperature) ?? temperature
      const location = humidityToLocation.get(humidity) ?? humidity

      acc.push(location)

      return acc
    }, new Array<number>())
    .sort((a, b) => b - a)
    .pop()
}

// const result = solution(test)
// console.log(result)

const result = solution(test)
console.log('result', result)

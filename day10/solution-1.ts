import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day10/data.txt'))
const test = await parseData(Bun.file('day10/test1.txt'))

type Coordinates = {
  x: number
  y: number
}
type PipeSystem = string[][]

const visitedCoordinates: Coordinates[] = []
let pipeSystem: PipeSystem

const coordinateToString = ({ x, y }: Coordinates) => `${x},${y}`

const getPipeSystem = (data: string[]): PipeSystem => {
  return data.map((row) => row.split(''))
}

const getStartCoordinates = (): Coordinates => {
  for (let i = 0; i < pipeSystem.length; i++) {
    for (let j = 0; j < pipeSystem[0].length; j++) {
      if (pipeSystem[i][j] === 'S') {
        const start = { x: j, y: i }
        pipeSystem[start.y][start.x] = 'J'
        // const surrounding = getSurroundingPipeCoordinates(start)

        return start
      }
    }
  }
  throw new Error('Not found')
}

const getSurroundingPipeCoordinates = ({ x, y }: Coordinates) => {
  const west = pipeSystem[y]?.[x - 1] ? { x: x - 1, y } : null
  const north = pipeSystem[y - 1]?.[x] ? { x, y: y - 1 } : null
  const east = pipeSystem[y]?.[x + 1] ? { x: x + 1, y } : null
  const south = pipeSystem[y + 1]?.[x] ? { x, y: y + 1 } : null

  return [west, north, east, south] as (Coordinates | null)[]
}

const getPipe = ({ x, y }: Coordinates) => pipeSystem[y][x]

const getPreviousPipeEntryDirection = (previous: Coordinates | undefined, current: Coordinates) => {
  if (!previous) {
    return null
  }

  const [west, north, east, south] = getSurroundingPipeCoordinates(current)

  if (west?.x === previous.x && west?.y === previous.y) {
    return 'west'
  }
  if (north?.x === previous.x && north?.y === previous.y) {
    return 'north'
  }
  if (east?.x === previous.x && east?.y === previous.y) {
    return 'east'
  }
  if (south?.x === previous.x && south?.y === previous.y) {
    return 'south'
  }

  throw new Error('No direction found')
}

const getNextPipe = (current: Coordinates) => {
  const currentPipe = pipeSystem[current.y][current.x]
  const previous = visitedCoordinates.at(-2)

  const [west, north, east, south] = getSurroundingPipeCoordinates(current)
  const previousPipeEntryDirection = getPreviousPipeEntryDirection(previous, current)

  switch (currentPipe) {
    case '|':
      return previousPipeEntryDirection === 'north' ? south! : north!
    case '-':
      return previousPipeEntryDirection === 'west' ? east! : west!
    case 'L':
      return previousPipeEntryDirection === 'north' ? east! : north!
    case 'J':
      return previousPipeEntryDirection === 'north' ? west! : north!
    case '7':
      return previousPipeEntryDirection === 'west' ? south! : west!
    case 'F':
      return previousPipeEntryDirection === 'east' ? south! : east!
  }

  throw new Error('Nope')
}

const solution = (data: string[]) => {
  pipeSystem = getPipeSystem(data)
  const startCoordinates = getStartCoordinates()
  let current = startCoordinates

  do {
    visitedCoordinates.push(current)
    current = getNextPipe(current)
  } while (startCoordinates.x !== current.x || startCoordinates.y !== current.y)

  const mapped = visitedCoordinates.map((c, index) => ({
    coord: coordinateToString(c),
    letter: getPipe(c),
    distance: index,
  }))

  return mapped[Math.floor(mapped.length / 2)]
}

const result = solution(data)
console.log(result.distance)

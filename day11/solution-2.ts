import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day11/data.txt'))
const test = await parseData(Bun.file('day11/test1.txt'))

type Cosmos = {
  image: string[][]
  emptyColumns: number[]
  emptyRows: number[]
}

type Coordinates = {
  x: number
  y: number
}

type Pair = {
  left: Coordinates
  right: Coordinates
}

const getCosmos = (data: string[]): Cosmos => {
  const cosmos: Partial<Cosmos> = {
    image: [],
    emptyColumns: [],
    emptyRows: [],
  }

  data.forEach((row, index) => {
    if (!row.includes('#')) {
      cosmos.emptyRows?.push(index)
    }
  })

  const matrix = data.map((r) => r.split(''))

  for (let i = 0; i < matrix[0].length; i++) {
    const column: string[] = []

    for (let j = 0; j < matrix.length; j++) {
      column.push(matrix[j][i])
    }

    if (!column.includes('#')) {
      cosmos.emptyColumns?.push(i)
    }
  }

  cosmos.image = matrix

  return cosmos as Cosmos
}

const getGalaxyPositions = (image: string[][]) => {
  const galaxyPositions: Coordinates[] = []

  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] === '#') {
        galaxyPositions.push({ x: j, y: i })
      }
    }
  }

  return galaxyPositions
}

const getPairs = (galaxyPositions: Coordinates[]) => {
  const pairs: Pair[] = []

  for (let i = 0; i < galaxyPositions.length - 1; i++) {
    for (let j = i + 1; j < galaxyPositions.length; j++) {
      pairs.push({ left: galaxyPositions[i], right: galaxyPositions[j] })
    }
  }
  return pairs
}

const manhattanDistance = (pair: Pair, emptyColumns: number[], emptyRows: number[]) => {
  const maxX = Math.max(pair.left.x, pair.right.x)
  const minX = Math.min(pair.left.x, pair.right.x)
  const maxY = Math.max(pair.left.y, pair.right.y)
  const minY = Math.min(pair.left.y, pair.right.y)

  let xDistance = maxX - minX
  let yDistance = maxY - minY

  for (let i = minX; i <= maxX; i++) {
    if (emptyColumns.includes(i)) {
      xDistance += 1000000 - 1
    }
  }

  for (let i = minY; i <= maxY; i++) {
    if (emptyRows.includes(i)) {
      yDistance += 1000000 - 1
    }
  }

  return xDistance + yDistance
}

const solution = (data: string[]) => {
  //3 get manhanttan distance of all pairs
  const { image, emptyColumns, emptyRows } = getCosmos(data)
  const galaxyPositions = getGalaxyPositions(image)
  const pairs = getPairs(galaxyPositions)

  const distance = pairs.reduce((acc, curr) => {
    return acc + manhattanDistance(curr, emptyColumns, emptyRows)
  }, 0)

  return distance
}

const result = solution(data)
console.log(result)

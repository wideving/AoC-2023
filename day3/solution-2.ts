import parseData from 'utils/data-parser'

const data = await parseData(Bun.file('day3/data.txt'))
const test = await parseData(Bun.file('day3/test1.txt'))

const partNumberRegex = /\d+/gm
const symbolRegex = /[^\d\.]/gm
const rawFindRegex = '(?<=\\.|\\W|\\b){replace}(?=\\.|\\W|\\b)'

type MaybePartNumber = {
  row: number
  start: number
  end: number
  digits: number
}

const solution = (data: string[]) => {
  const maxLength = data[0].length

  const maybePartNumbers = data.reduce((acc, line, index) => {
    const matches = line.match(partNumberRegex)

    if (!matches) return acc

    matches.forEach((match) => {
      const regex = new RegExp(rawFindRegex.replace('{replace}', match), 'gm')
      const execMatch = regex.exec(line)

      let startIndex = execMatch!.index

      const previous = acc.find(
        (maybe) => maybe.digits === +match && maybe.start === startIndex && maybe.row === index
      )
      if (previous) {
        const execMatch = regex.exec(line)
        startIndex = execMatch!.index
      }

      acc.push({
        row: index,
        start: startIndex,
        end: startIndex + match.length,
        digits: +match,
      })
    })

    return acc
  }, new Array<MaybePartNumber>())

  const potentialGear = maybePartNumbers.reduce((acc, { row, start, end, digits }) => {
    // check left
    const left = data[row][start - 1]?.match(symbolRegex)

    if (left) {
      savePotentialGear(left.toString(), start - 1, row, digits, acc)
      return acc
    }

    // check right
    const right = data[row][end]?.match(symbolRegex)

    if (right) {
      savePotentialGear(right.toString(), end, row, digits, acc)
      return acc
    }

    // check top
    if (row > 0) {
      const isAtStart = start === 0

      if (isAtStart) {
        const substring = data[row - 1].substring(start, end + 1)

        if (substring.match(symbolRegex)) {
          savePotentialGear(substring.toString(), start, row - 1, digits, acc)
          return acc
        }
      }

      const isAtEnd = end === maxLength

      if (isAtEnd) {
        const substring = data[row - 1].substring(start - 1, end)

        if (substring.match(symbolRegex)) {
          savePotentialGear(substring.toString(), start - 1, row - 1, digits, acc)
          return acc
        }
      }

      const substring = data[row - 1].substring(start - 1, end + 1)

      if (substring.match(symbolRegex)) {
        savePotentialGear(substring.toString(), start - 1, row - 1, digits, acc)
        return acc
      }
    }

    // check bottom
    if (row < data.length - 1) {
      const isAtStart = start === 0

      if (isAtStart) {
        const substring = data[row + 1].substring(start, end + 1)

        if (substring.match(symbolRegex)) {
          savePotentialGear(substring.toString(), start, row + 1, digits, acc)
          return acc
        }
      }

      const isAtEnd = end === maxLength

      if (isAtEnd) {
        const substring = data[row + 1].substring(start - 1, end)

        if (substring.match(symbolRegex)) {
          savePotentialGear(substring.toString(), start - 1, row + 1, digits, acc)
          return acc
        }
      }

      const substring = data[row + 1].substring(start - 1, end + 1)

      if (substring.match(symbolRegex)) {
        savePotentialGear(substring.toString(), start - 1, row + 1, digits, acc)
        return acc
      }
    }

    return acc
  }, new Map<string, Array<number>>())

  return Array.from(potentialGear.entries()).reduce((acc, [key, value]) => {
    if (value.length === 2) {
      return acc + value[0] * value[1]
    } else {
      return acc
    }
  }, 0)
}

const savePotentialGear = (
  symbol: string,
  start: number,
  row: number,
  digits: number,
  potentialGear: Map<string, Array<number>>
) => {
  const indexOfSymbol = symbol.indexOf('*')
  if (indexOfSymbol !== -1) {
    const x = start + indexOfSymbol
    const y = row

    const coordinates = `${x},${y}`
    const entry = potentialGear.get(coordinates) ?? []
    entry.push(digits)
    potentialGear.set(coordinates, entry)
  }
}
// const result = solution(test)
// console.log('result', result)

const result = solution(data)
console.log(result)

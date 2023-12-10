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
  const partSums = maybePartNumbers.reduce((acc, { row, start, end, digits }) => {
    // check left
    if (data[row][start - 1]?.match(symbolRegex)) {
      return acc + digits
    }

    // check right
    if (data[row][end]?.match(symbolRegex)) {
      return acc + digits
    }

    // check top
    if (row > 0) {
      const isAtStart = start === 0
      if (isAtStart) {
        const substring = data[row - 1].substring(start, end + 1)
        if (substring.match(symbolRegex)) {
          return acc + digits
        }
      }

      const isAtEnd = end === maxLength
      if (isAtEnd) {
        const substring = data[row - 1].substring(start - 1, end)
        if (substring.match(symbolRegex)) {
          return acc + digits
        }
      }
      const substring = data[row - 1].substring(start - 1, end + 1)
      if (substring.match(symbolRegex)) {
        return acc + digits
      }
    }

    // check bottom
    if (row < data.length - 1) {
      const isAtStart = start === 0
      if (isAtStart) {
        const substring = data[row + 1].substring(start, end + 1)
        if (substring.match(symbolRegex)) {
          return acc + digits
        }
      }

      const isAtEnd = end === maxLength
      if (isAtEnd) {
        const substring = data[row + 1].substring(start - 1, end)
        if (substring.match(symbolRegex)) {
          return acc + digits
        }
      }

      const substring = data[row + 1].substring(start - 1, end + 1)
      if (substring.match(symbolRegex)) {
        return acc + digits
      }
    }

    return acc
  }, 0)

  return partSums
}

// const result = solution(test)
// console.log('result', result)

const result = solution(data)
console.log(result)

import parseData from 'utils/data-parser'

const data = await parseData(Bun.file('day1/data.txt'))
const test = await parseData(Bun.file('day1/test2.txt'))

const solution = (data: string[]) => {
  const allRows: number[] = []
  for (const row of data) {
    const result: number[] = []

    const arr = row.split('')

    for (let i = 0; i < arr.length; i++) {
      const substring = row.substring(i)
      const match = substring.match(/^([0-9]|one|two|three|four|five|six|seven|eight|nine)/gi)
      if (match) {
        const first = match[0]
        const parsed = Number.parseInt(first)
        if (parsed) {
          result.push(parsed)
          continue
        }

        switch (first) {
          case 'one':
            result.push(1)
            break
          case 'two':
            result.push(2)
            break
          case 'three':
            result.push(3)
            break
          case 'four':
            result.push(4)
            break
          case 'five':
            result.push(5)
            break
          case 'six':
            result.push(6)
            break
          case 'seven':
            result.push(7)
            break
          case 'eight':
            result.push(8)
            break
          case 'nine':
            result.push(9)
            break
        }
      }
    }
    allRows.push(parseInt(`${result[0]}${result.pop()}`)!)
  }

  return allRows.reduce((acc, curr) => acc + curr)
}

// const testResult = solution(test)
const result = solution(data)
console.log(result)

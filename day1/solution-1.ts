import parseData from 'utils/data-parser'

const data = await parseData(Bun.file('day1/data1.txt'))
const test = await parseData(Bun.file('day1/test1.txt'))

const solution = (data: string[]) => {
  const numbers = data.map((row) => {
    const numbers = row.split('').filter((char) => Number.parseInt(char))
    const first = numbers[0]
    const last = numbers[numbers.length - 1]
    return +(first + last)
  })
  return numbers.reduce((acc, curr) => acc + curr)
}

// const testResult = solution(test)
const result = solution(data)
console.log(result)

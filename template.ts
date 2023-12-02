import parseData from 'utils/data-parser'

const data = await parseData(Bun.file('day/data.txt'))
const test = await parseData(Bun.file('day/test1.txt'))

const solution = (data: string[]) => {
  return 'works'
}

const result = solution(test)
console.log(result)

// const result = solution(data)
// console.log(result)

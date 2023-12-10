import parseData from 'utils/data-parser'

const data = await parseData(Bun.file('day4/data.txt'))
const test = await parseData(Bun.file('day4/test1.txt'))

const solution = (data: string[]) => {
  return 'works'
}

const result = solution(test)
console.log('result', result)

// const result = solution(data)
// console.log(result)

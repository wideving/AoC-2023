import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day6/data.txt'))
const test = await parseData(Bun.file('day6/test1.txt'))

const solution = (data: string[]) => {}

const result = solution(test)
console.log(result)

// const result = solution(data)
// console.log('result', result)

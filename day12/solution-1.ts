import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day12/data.txt'))
const test = await parseData(Bun.file('day12/test1.txt'))

const solution = (data: string[]) => {
  return 'works'
}

const result = solution(data)
console.log(result)

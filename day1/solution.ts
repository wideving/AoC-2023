import parseData from 'utils/data-parser'

const data = await parseData(Bun.file('day1/data.txt'))
const test = await parseData(Bun.file('day1/test.txt'))

const solution = (data: string[]) => {}

solution(test)
// solution(data)

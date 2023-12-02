import parseData from 'utils/data-parser'

const data = await parseData(Bun.file('day/data.txt'))
const test = await parseData(Bun.file('day/test.txt'))

const solution = (data: string[]) => {}

solution(test)
// solution(data)

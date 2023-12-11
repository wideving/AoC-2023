// import parseData from 'utils/data-parser'

import Bun from 'bun'
import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day4/data.txt'))
const test = await parseData(Bun.file('day4/test1.txt'))

type Card = {
  cardNumber: number
  playedNumbers: number[]
  winningNumbers: number[]
}

const solution = (data: string[]) => {
  const cards = getCards(data)
  return cards
}

const getCards = (data: string[]) => {
  return data.reduce((acc, row) => {
    const [card, numbers] = row.split(':')
    const cardNumber = card.split(' ')[1]
    const [winners, playedNumbers] = numbers.split('|')

    const win = Array.from(winners.matchAll(/\d+/g))
    const play = Array.from(playedNumbers.matchAll(/\d+/g))

    acc.push({
      winningNumbers: win.map((w) => +w),
      playedNumbers: play.map((p) => +p),
      cardNumber: Number(cardNumber),
    })
    return acc
  }, new Array<Card>())
}

const result = solution(test)
console.log('result', result)

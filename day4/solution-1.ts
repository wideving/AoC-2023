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

  return cards.reduce((acc, card) => {
    const winners = card.playedNumbers.reduce((acc, playedNumber) => {
      if (card.winningNumbers.includes(playedNumber)) {
        return acc + 1
      }
      return acc
    }, 0)
    return acc + pow(winners)
  }, 0)
}

const pow = (n: number) => {
  if (n === 0) {
    return 0
  }

  if (n === 1) {
    return 1
  }

  return Math.pow(2, n - 1)
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

// const result = solution(test)
// console.log('result', result)

const result = solution(data)
console.log('result', result)

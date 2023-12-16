import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day7/data.txt'))
const test = await parseData(Bun.file('day7/test1.txt'))

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'

const cardStrength: Record<Card, number> = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
} as const

const handStrength: Record<Kind, number> = {
  'five of a kind': 7,
  'four of a kind': 6,
  'full house': 5,
  'three of a kind': 4,
  'two pairs': 3,
  'one pair': 2,
  'high card': 1,
} as const

type Kind =
  | 'five of a kind'
  | 'four of a kind'
  | 'full house'
  | 'three of a kind'
  | 'two pairs'
  | 'one pair'
  | 'high card'

type Hand = {
  cards: string
  type: Kind
  bid: number
}

const getHands = (data: string[]) => {
  return data.reduce<Array<Hand>>((acc, curr) => {
    const [cards, bid] = curr.split(' ')
    const typeOfHand = getTypeOfHand(cards)

    acc.push({ cards, bid: Number(bid), type: typeOfHand })

    return acc
  }, [])
}

const getTypeOfHand = (cards: string): Kind => {
  const amount = cards.split('').reduce<Record<string, number>>((acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = 1
    } else {
      acc[curr] = acc[curr] + 1
    }
    return acc
  }, {})

  let values = Object.values(amount).toSorted((a, b) => b - a)

  const jokers = amount['J']

  if (jokers > 0 && values[0] !== 5) {
    delete amount['J']
    values = Object.values(amount).toSorted((a, b) => b - a)
    values[0] = values[0] + jokers
  }

  if (values[0] === 1) return 'high card'
  if (values[0] === 5) return 'five of a kind'
  if (values[0] === 4) return 'four of a kind'
  if (values[0] === 3 && values[1] === 2) return 'full house'
  if (values[0] === 3 && values[1]) return 'three of a kind'
  if (values[0] === 2 && values[1] === 2) return 'two pairs'
  if (values[0] === 2) return 'one pair'

  throw new Error('No known type of hand')
}

const rankHands = (hands: Hand[]) => {
  return hands.sort((firstHand, secondHand) => {
    const firstHandStrength = handStrength[firstHand.type]
    const secondHandStrength = handStrength[secondHand.type]

    if (firstHandStrength > secondHandStrength) {
      return 1
    }

    if (firstHandStrength < secondHandStrength) {
      return -1
    }

    if (firstHandStrength === secondHandStrength) {
      const firstHandCards = firstHand.cards.split('') as Card[]
      const secondHandCards = secondHand.cards.split('') as Card[]

      for (let i = 0; i < firstHandCards.length; i++) {
        const firstHandCardStrength = cardStrength[firstHandCards[i]]
        const secondHandCardStrength = cardStrength[secondHandCards[i]]

        if (firstHandCardStrength > secondHandCardStrength) {
          return 1
        }

        if (firstHandCardStrength < secondHandCardStrength) {
          return -1
        }
      }
    }

    throw new Error('Error while sorting')
  })
}

const solution = (data: string[]) => {
  const hands = getHands(data)

  return rankHands(hands).reduce((acc, curr, index) => {
    const rank = index + 1
    const winnings = curr.bid * rank
    return acc + winnings
  }, 0)
}

// const result = solution(test)
// console.log(result)

const result = solution(data)
console.log('result', result)
